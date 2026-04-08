import fs from 'fs/promises';
import path from "node:path";

/**
 * Deletes the design with the name from the workspace.
 * @param {String} designName 
 */
async function deleteDesign(designName) {
    try {
        if (!designName) {
            console.error("Design name is required to delete a design.");
            return;
        }
        const filePath = path.join(process.cwd(), "workspace", designName);
        await fs.unlink(filePath);
    } catch (err) {
        throw new Error(err);
    }
}
export default deleteDesign;