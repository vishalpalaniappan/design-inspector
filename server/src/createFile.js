import fs from 'fs/promises';
import path from "node:path";
import {DALEngine} from "dal-engine-core-js-lib-dev";

async function createDesign(fileName) {
    try {
        if (!fileName) {
            console.error("File name is required to create a design.");
            return;
        }
        const engine = new DALEngine({
            name: "default",
            description: "Default engine",
        });
        const workspacePath = path.join(process.cwd(), "workspace");
        const name = path.join(workspacePath, fileName);

        try {
            await fs.access(name);
            console.error("File already exists:", name);
            return;
        } catch {
            // File does not exist, safe to create
            await fs.writeFile(name, engine.serialize());
        }
    } catch (err) {
        console.error(err);
    }
}
export default createDesign;