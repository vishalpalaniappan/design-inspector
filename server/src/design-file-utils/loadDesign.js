import fs from 'fs/promises';
import { resolveDesignPath } from "./validateDesignName.js";

/**
 * Loads a design from the workspace with the given name.
 * @param {String} designName 
 * @returns {Object} Design data including fileName, path and data.
 */
async function loadDesign(designName) {
    try {
        const filePath = resolveDesignPath(designName);
        const data = await fs.readFile(filePath, "utf-8");
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