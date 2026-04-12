import fs from 'fs/promises';
import {DALEngine} from "dal-engine-core-js-lib-dev";
import statementMappingRunner from '../runners/statementMappingRunner.js';
import { resolveDesignPath } from "./validateDesignName.js";
import loadDesignInPlayground from './loadDesignInPlayground.js';

/**
 * Saves the design to the workspace. However, it first checks
 * for any python files in the design and updates their mapping
 * before saving the design. This updated mapping is used by the
 * client to map the implementation to the design.
 * 
 * @param {String} designName Name of the design.
 * @param {String} data Serialized engine instance.
 * @returns {Object} Object containing the files in the design.
 */
async function saveDesign(designName,  data) {
    try {
        const filePath = resolveDesignPath(designName);

        const engine = new DALEngine({
            name: designName,
            description: "Default engine",
        });

        engine.deserialize(data);

        const pythonFiles = engine.getFiles().filter((file) => {
            return (file._name.endsWith(".py") && file.getUpdatedContent() !== file.getContent());
        });

        await Promise.all(
            pythonFiles.map(async (file) => {
                const mapping = await statementMappingRunner(file.getUpdatedContent());
                file.setStatementIndex(mapping);
            })
        );

        // This marks the file as not dirty. If the content does not match
        // the update content, then the file is considered dirty and the UI
        // will reflect this.
        engine.getFiles().forEach((file) => {
            file.setContent(file.getUpdatedContent());
        });

        // Write engine files to playground folder
        await loadDesignInPlayground(engine);

        const serializedEngine = engine.serialize();
        await fs.writeFile(filePath, serializedEngine);

        return {
            files: engine.getFiles()
        };
    } catch (writeErr) {
        throw writeErr; 
    }
}

export default saveDesign;