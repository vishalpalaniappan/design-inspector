import fs from "fs/promises";

/**
 * Initializes the workspace and playground folders. 
 * 
 * - The workspace folder is where the designs are stored
 * - The playground folder is used to make the implementation files in the engine
 *   accessible for executing the code in the design. It will be extended to execute
 *   the instrumented code and the generated traces will be stored in the engine.
 */
async function initFolders() {
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

    // Remove playground folder if it exists
    const playgroundPath = path.join(process.cwd(), "playground");
    try {
        await fs.rmdir(playgroundPath, { recursive: true, force: true });
    } catch (err) {
        throw err;
    }

    // Create playground folder
    try {
        await fs.mkdir(playgroundPath, { recursive: true });
    } catch (err) {
        throw err;
    }
}

export default initFolders;