import path from 'path';
import fs from 'fs/promises';
import { clearPlaygroundFolder } from "./initFolders.js";

async function loadDesignInPlayground(files) {
    // Clear playground folder
    await clearPlaygroundFolder();

    // Write engine files to playground folder
    const playgroundPath = path.join(process.cwd(), "playground");
    files.forEach(async (file) => {
        const filePath = path.resolve(playgroundPath, file.name);
        await fs.writeFile(filePath, file.content, { flag: "w" });
    });
}


export default loadDesignInPlayground;