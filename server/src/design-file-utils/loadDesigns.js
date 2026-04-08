import path from "node:path";
import fs from 'fs/promises';
import { initWorkspaceFolder } from "./initFolders";

/**
 * Returns the list of designs in the workspace.
 * @returns {Object} List of designs in workspace.
 */
async function loadDesigns() {
    try {
        await initWorkspaceFolder();
        const workspacePath = path.join(process.cwd(), "workspace");
        const entries = await fs.readdir(workspacePath, { withFileTypes: true });
        const designs = entries.map((entry) => {
            if (!entry.isDirectory() && entry.name.endsWith(".dal")) {
                return {
                    name: entry.name,
                    type: 'file',
                    uid: entry.name
                };
            }
        }).filter(Boolean);
        return designs;
    } catch (err) {
        throw new Error(err);
    }
};


export default loadDesigns;
