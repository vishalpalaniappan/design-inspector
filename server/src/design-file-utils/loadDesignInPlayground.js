import path from 'path';
import fs from 'fs/promises';
import { clearPlaygroundFolder } from "./initFolders.js";

async function loadDesignInPlayground(files) {
    // Clear playground folder
    await clearPlaygroundFolder();

    // Write engine files to playground folder
    const playgroundPath = path.join(process.cwd(), "playground");
    await Promise.all(files.map(async (file) => {
        const filePath = path.resolve(playgroundPath, file.name);
        if (!filePath.startsWith(playgroundPath + path.sep)) {
            throw new Error(`Invalid file path: ${file.name}`);
        }
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, file.content, { flag: "w" });
    }));
}


export default loadDesignInPlayground;