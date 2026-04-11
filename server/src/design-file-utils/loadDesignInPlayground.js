import path from 'path';
import { clearPlaygroundFolder } from "./initFolders.js";
import instrumentationRunner from '../runners/instrumentationRunner.js';
import unzipper from "unzipper";

async function loadDesignInPlayground(engine) {
    // Get files from engine.
    const files = engine.getFiles();

    // Clear playground folder
    await clearPlaygroundFolder();

    // Write engine files to playground folder
    const playgroundPath = path.join(process.cwd(), "playground");


    const instrumentationPkg = engine.implementation.exportForInstrumentation();

    // Temporarily write to temp folder for accesing instrumentation package
    // await fs.writeFile(path.join("temp",engine._name + ".json"), instrumentationPkg);

    try {
        const zip = await instrumentationRunner(instrumentationPkg);
        const directory = await unzipper.Open.buffer(zip);
        await directory.extract({ path: playgroundPath });
    } catch (error) {
        throw error;
    }
    // await Promise.all(files.map(async (file) => {
    //     // TODO: Replace file name with key to create subfolders For now all files
    //     // exist on the same level with unique names. This requires changes to
    //     // the create file functions so it can create directories and not just files.
    //     const filePath = path.resolve(playgroundPath, file.getName());
    //     if (!filePath.startsWith(playgroundPath + path.sep)) {
    //         throw new Error(`Invalid file path: ${file.getName()}`);
    //     }
    //     await fs.mkdir(path.dirname(filePath), { recursive: true });
    //     await fs.writeFile(filePath, file.getContent(), { flag: "w" });
    // }));
}


export default loadDesignInPlayground;