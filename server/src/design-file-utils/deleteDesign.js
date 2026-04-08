import fs from 'fs/promises';
import path from "node:path";

/**
 * Deletes the design with the name from the workspace.
 * @param {String} designName 
 */
async function deleteDesign(designName) {
    try {
        if (!designName) {
            throw new Error("Design name is required to delete a design.");
        }
        if (path.basename(designName) !== designName || !designName.endsWith(".dal")) {
            throw new Error("Invalid design name.");
        }
        const filePath = path.resolve(process.cwd(), "workspace", designName);
        await fs.unlink(filePath);
    } catch (err) {
        throw new Error(err);
    }
}
export default deleteDesign;