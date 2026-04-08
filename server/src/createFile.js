import fs from 'fs/promises';
import path from "node:path";
import {DALEngine} from "dal-engine-core-js-lib-dev";

async function createDesign(fileName) {
    try {
        if (!fileName) {
            throw new Error("File name is required to create a design.");
        }
        const engine = new DALEngine({
            name: "default",
            description: "Default engine",
        });
        const workspacePath = path.join(process.cwd(), "workspace");
        const name = path.join(workspacePath, fileName);

        await fs.writeFile(name, engine.serialize(), { flag: "wx" });
    } catch (err) {
        if (err.code === "EEXIST") {
            throw new Error("File already exists.");
        } else {
            throw err;
        }
    }
}
export default createDesign;