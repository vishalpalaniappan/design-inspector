import fs from 'fs/promises';
import { resolveDesignPath } from "./validateDesignName.js";

/**
 * Deletes the design with the name from the workspace.
 * @param {String} designName 
 */
async function deleteDesign(designName) {
    try {
        const filePath = resolveDesignPath(designName);
        await fs.unlink(filePath);
    } catch (err) {
        throw new Error(err);
    }
}
export default deleteDesign;