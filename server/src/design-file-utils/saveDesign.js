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
            return (file.name.endsWith(".py") && file.updatedContent !== file.content);
        });

        await Promise.all(
            pythonFiles.map(async (file) => {
                const mapping = await statementMappingRunner(file.updatedContent);
                file.mapping = mapping;
            })
        );

        // This marks the file as not dirty. If the content does not match
        // the update content, then the file is considered dirty and the UI
        // will reflect this.
        engine.getFiles().forEach((file) => {
            file.content = file.updatedContent;
        });

        // Write engine files to playground folder
        await loadDesignInPlayground(engine.getFiles());

        const serializedEngine = engine.serialize();
        await fs.writeFile(filePath, serializedEngine);

        return {
            files: engine.getFiles()
        };
    } catch (err) {
        // TODO: If the write fails, load the design currently on file and write to
        // playground so that it contains the latest files in the engine as stored on
        // the disk (undoing the load design in playground with the unsaved changes).
        // Not implementing it now because its not critical and the user can simply 
        // reload the design to achieve the same effect.
        throw err;
    }
}

export default saveDesign;