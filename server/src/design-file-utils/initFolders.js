import fs from "fs/promises";
import path from "node:path";

/**
 * Clears the playground folder.
 */
async function clearPlaygroundFolder() {
    // Remove contents of playground folder if it exists
    const playgroundPath = path.join(process.cwd(), "playground");
    const entries = await fs.readdir(playgroundPath);

    await Promise.all(
        entries.map((entry) =>
            fs.rm(path.join(playgroundPath, entry), {
                recursive: true,
                force: true
            })
        )
    );
}

/**
 * Initializes the workspace folder. The workspace folder is where the designs are stored.
 * 
 * The playground folder is used to make the implementation files in the engine
 * accessible for executing the code in the design. It will be extended to execute
 * the instrumented code and the generated traces will be stored in the engine.
 */
async function createRequiredFolders() {
    // Create workspace folder if it doesn't exist
    const workspacePath = path.join(process.cwd(), "workspace");
    try {
        await fs.mkdir(workspacePath, { recursive: true });
    } catch (err) {
        if (err.code === "EEXIST") {
            // Directory already exists.
        } else {
            throw err;
        }
    }
    // Create playground folder if it doesn't exist
    const playgroundPath = path.join(process.cwd(), "playground");
    try {
        await fs.mkdir(playgroundPath, { recursive: true });
    } catch (err) {
        if (err.code === "EEXIST") {
            // Already exists, clear the folder
            await clearPlaygroundFolder();
        } else {
            throw err;
        }
    }
}

export { clearPlaygroundFolder, createRequiredFolders };