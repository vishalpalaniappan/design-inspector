import fs from 'fs/promises';
import {DALEngine} from "dal-engine-core-js-lib-dev";
import { resolveDesignPath } from "./validateDesignName.js";

/**
 * Creates a design with the name in the workspace (if it doesn't exist).
 * The design is initialized as an engine with the name provided.
 * @param {String} designName 
 */
async function createDesign(designName) {
    try {
        const filePath = resolveDesignPath(designName);
        const engine = new DALEngine({
            name: designName,
            description: "Default engine",
        });
        await fs.writeFile(filePath, engine.serialize(), { flag: "wx" });
    } catch (err) {
        if (err.code === "EEXIST") {
            throw new Error("File already exists.");
        } else {
            throw err;
        }
    }
}
export default createDesign;