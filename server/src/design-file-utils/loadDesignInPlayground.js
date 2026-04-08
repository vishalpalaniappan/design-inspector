import path from 'path';
import fs from 'fs/promises';
import { clearPlaygroundFolder } from "./initFolders.js";

async function loadDesignInPlayground(files) {
    // Clear playground folder
    await clearPlaygroundFolder();

    // Write engine files to playground folder
    const playgroundPath = path.join(process.cwd(), "playground");


    // TODO: 
    // Instrument program by calling the relevant runner before writing the 
    // files to the playground. This way, the instrumented code can be executed
    // in the playground and the generated traces can be stored in the engine.


    await Promise.all(files.map(async (file) => {
        // TODO: Replace file name with key to create subfolders For now all files
        // exist on the same level with unique names. This requires changes to
        // the create file functions so it can create directories and not just files.
        const filePath = path.resolve(playgroundPath, file.name);
        if (!filePath.startsWith(playgroundPath + path.sep)) {
            throw new Error(`Invalid file path: ${file.name}`);
        }
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, file.content, { flag: "w" });
    }));
}


export default loadDesignInPlayground;