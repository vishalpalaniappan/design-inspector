import fs from 'fs/promises';
import path from "node:path";

async function loadFile(fileName) {
    try {
        if (!fileName) {
            console.error("File name is required to load a design.");
            return;
        }
        const workspacePath = path.join(process.cwd(), "workspace");
        const filePath = path.join(workspacePath, fileName);
        const data = await fs.readFile(filePath, "utf-8");
        return {
            fileName: fileName,
            path: filePath,
            data: data
        };
    } catch (err) {
        console.error(err);
    }
}
export default loadFile;