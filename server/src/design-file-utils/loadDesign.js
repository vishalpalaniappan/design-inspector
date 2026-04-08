import fs from 'fs/promises';
import path from "node:path";

/**
 * Loads a design from the workspace with the given name.
 * @param {String} designName 
 * @returns {Object} Design data including fileName, path and data.
 */
async function loadDesign(designName) {
    try {
        if (!designName) {
            console.error("Design name is required to load a design.");
            return;
        }
        const workspacePath = path.join(process.cwd(), "workspace");
        const filePath = path.join(workspacePath, designName);
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