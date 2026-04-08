import path from 'path';
import fs from 'fs/promises';
import { clearPlaygroundFolder } from "./initFolders.js";

async function loadDesignInPlayground(files) {
    // Clear playground folder
    await clearPlaygroundFolder();

    // Write engine files to playground folder
    const playgroundPath = path.join(process.cwd(), "playground");
    await Promise.all(files.map(async (file) => {
        // TODO: Replace file.name with the key of the file in the
        // implementaiton class of engine. Using the key, I can specify
        // subdirectors in the playground folder. For now, this is ok
        // because I am simply working with a flat structure of files in the engine.
        const filePath = path.resolve(playgroundPath, file.name);
        if (!filePath.startsWith(playgroundPath + path.sep)) {
            throw new Error(`Invalid file path: ${file.name}`);
        }
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, file.content, { flag: "w" });
    }));
}


export default loadDesignInPlayground;