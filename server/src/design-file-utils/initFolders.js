import fs from "fs/promises";
import path from "node:path";

/**
 * Initializes the workspace folder. The workspace folder is where the designs are stored.
 */
async function initWorkspaceFolder() {
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
}

/**
 * Initializes the playground folder.
 * 
 * The playground folder is used to make the implementation files in the engine
 * accessible for executing the code in the design. It will be extended to execute
 * the instrumented code and the generated traces will be stored in the engine.
 */
async function initPlaygroundFolder() {
    // Remove playground folder if it exists
    const playgroundPath = path.join(process.cwd(), "playground");
    try {
        await fs.rm(playgroundPath, { recursive: true, force: true });
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

export { initWorkspaceFolder, initPlaygroundFolder };