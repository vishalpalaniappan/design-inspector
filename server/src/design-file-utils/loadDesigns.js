import path from "node:path";
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

/**
 * Returns the list of designs in the workspace.
 * @returns {Object} List of designs in workspace.
 */
async function loadDesigns() {
    try {
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

        const entries = await fs.readdir(workspacePath, { withFileTypes: true });

        // Note: The reason I am saying path is simply the name is that the designs
        // are stored in a flat structure in the workspace and not in any subfolders.
        // So the path to access the design is simply the name of the design file.
        // When this changes, this mapping will need to be updated.
        const designs = entries.map((entry) => {
            if (!entry.isDirectory() && entry.name.endsWith(".dal")) {
                return {
                    name: entry.name,
                    type: 'file',
                    uid: "file-" + randomUUID(),
                    path: entry.name
                };
            }
        }).filter(Boolean);
        return designs;
    } catch (err) {
        throw new Error(err);
    }
};


export default loadDesigns;
