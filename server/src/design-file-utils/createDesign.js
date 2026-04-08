import fs from 'fs/promises';
import path from "node:path";
import {DALEngine} from "dal-engine-core-js-lib-dev";

/**
 * Creates a design with the name in the workspace (if it doesn't exist).
 * The design is initialized as an engine with the name provided.
 * @param {String} designName 
 */
async function createDesign(designName) {
    try {
        if (!designName) {
            throw new Error("Design name is required to create a design.");
        }
        const engine = new DALEngine({
            name: designName,
            description: "Default engine",
        });
        const workspacePath = path.join(process.cwd(), "workspace");
        const name = path.join(workspacePath, designName);

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