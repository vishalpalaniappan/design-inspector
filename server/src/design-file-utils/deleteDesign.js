import fs from 'fs/promises';
import path from "node:path";

async function deleteDesign(fileName) {
    try {
        if (!fileName) {
            console.error("File name is required to delete a design.");
            return;
        }
        const filePath = path.join(process.cwd(), "workspace", fileName);
        await fs.unlink(filePath);
    } catch (err) {
        throw new Error(err);
    }
}
export default deleteDesign;