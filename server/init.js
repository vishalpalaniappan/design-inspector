import { createRequiredFolders } from "./src/design-file-utils/initFolders.js";

/**
 * Currently, initializes the required folders for the server. 
 * 
 */
async function init() {
    await createRequiredFolders();
}

export default init;