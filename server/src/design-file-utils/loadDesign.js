import fs from 'fs/promises';
import { resolveDesignPath } from "./validateDesignName.js";
import {DALEngine} from "dal-engine-core-js-lib-dev";
import loadDesignInPlayground from './loadDesignInPlayground.js';

/**
 * Loads a design from the workspace with the given name.
 * @param {String} designName 
 * @returns {Object} Design data including fileName, path and data.
 */
async function loadDesign(designName) {
    try {
        const filePath = resolveDesignPath(designName);
        const data = await fs.readFile(filePath, "utf-8");

        // Create engine and deserialize data from file
        const engine = new DALEngine({
            name: designName,
            description: "Default engine",
        });
        engine.deserialize(data);

        // Write engine files to playground folder
        await loadDesignInPlayground(engine);

        return {
            fileName: designName,
            path: filePath,
            data: data
        };
    } catch (err) {
        console.error(err);
    }
}
export default loadDesign;