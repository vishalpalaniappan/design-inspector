import fs from 'fs/promises';
import { resolveDesignPath } from "./validateDesignName.js";
import {DALEngine} from "dal-engine-core-js-lib-dev";
import { initPlaygroundFolder } from './initFolders.js';
import path from 'path';

/**
 * Loads a design from the workspace with the given name.
 * @param {String} designName 
 * @returns {Object} Design data including fileName, path and data.
 */
async function loadDesign(designName) {
    try {
        const filePath = resolveDesignPath(designName);
        const data = await fs.readFile(filePath, "utf-8");

        // Create engine and deserialize data from file
        const engine = new DALEngine({
            name: designName,
            description: "Default engine",
        });
        engine.deserialize(data);

        // Create playground folder if it doesn't exist
        await initPlaygroundFolder();

        // Write engine files to playground folder
        const playgroundPath = path.join(process.cwd(), "playground");
        engine.getFiles().forEach(async (file) => {
            const filePath = path.resolve(playgroundPath, file.name);
            await fs.writeFile(filePath, file.content, { flag: "w" });
        });

        return {
            fileName: designName,
            path: filePath,
            data: data
        };
    } catch (err) {
        console.error(err);
    }
}
export default loadDesign;