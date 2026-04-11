import path from 'path';
import fs from 'fs/promises';
import { clearPlaygroundFolder } from "./initFolders.js";

async function loadDesignInPlayground(engine) {
    // Get files from engine.
    const files = engine.getFiles();

    // Clear playground folder
    await clearPlaygroundFolder();

    // Write engine files to playground folder
    const playgroundPath = path.join(process.cwd(), "playground");


    const instrumentationPkg = engine.implementation.exportForInstrumentation();
    
    // TODO:
    // Call runner here and accept the returned instrumented sources.

    await Promise.all(files.map(async (file) => {
        // TODO: Replace file name with key to create subfolders For now all files
        // exist on the same level with unique names. This requires changes to
        // the create file functions so it can create directories and not just files.
        const filePath = path.resolve(playgroundPath, file.getName());
        if (!filePath.startsWith(playgroundPath + path.sep)) {
            throw new Error(`Invalid file path: ${file.getName()}`);
        }
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, file.getContent(), { flag: "w" });
    }));
}


export default loadDesignInPlayground;