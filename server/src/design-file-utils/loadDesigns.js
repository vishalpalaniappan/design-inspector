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
        const designs = entries.map((entry) => {
            if (!entry.isDirectory() && entry.name.endsWith(".dal")) {
                return {
                    name: entry.name,
                    type: 'file',
                    uid: "file-" + randomUUID()
                };
            }
        }).filter(Boolean);
        return designs;
    } catch (err) {
        throw new Error(err);
    }
};


export default loadDesigns;
