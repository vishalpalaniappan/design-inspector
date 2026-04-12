import path from 'path';
import fs from 'fs/promises';
import {DALEngine} from "dal-engine-core-js-lib-dev";

/**
 * Find all .clp.zst files in a directory. These are the trace files
 * generated from program execution in the playground.
 * @param {String} dir 
 * @returns {Promise<Array<{path: String, name: String}>>}
 */
async function findClpZstFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
        .filter(entry => entry.isFile() && entry.name.endsWith(".clp.zst"))
        .map(entry => ({ path: path.join(dir, entry.name), name: entry.name }));
}


/**
 * Clears any trace files in the playground folder. This is used to
 * ensure that only the trace from the recent exectiuon is present
 * after the entry point script has been executed, so the trace file
 * can be saved in the engine.
 */
async function clearTraceFilesInPlayground() {
    const playgroundPath = path.join(process.cwd(), "playground");
    const files = await findClpZstFiles(playgroundPath);
    await Promise.all(files.map(file => fs.rm(file.path)));
}


/**
 * Saves the generated traces in the engine. It uses the meta file in the
 * playground to find the design file, then reads the trace file and
 * saves it in the engine.
 * @returns {Promise<void>}
 */
async function saveTraceInEngine() {
    // Save the generated trace from the playground to the engine.
    const playgroundPath = path.join(process.cwd(), "playground");
    const workspacePath = path.join(process.cwd(), "workspace");

    const metaPath = path.join(playgroundPath, "meta.json");
    const metaData = await fs.readFile(metaPath);
    const { designName } = JSON.parse(metaData);

    const designPath = path.join(workspacePath, designName);

    const clpZstFiles = await findClpZstFiles(playgroundPath);

    if (clpZstFiles.length === 0) {
        console.warn("No .clp.zst files found in playground. Trace will not be saved.");
        return;
    }

    if (clpZstFiles.length > 1) {
        console.warn("Multiple .clp.zst files found in playground. Expected only one trace file. Trace will not be saved.");
        return;
    }

    const traceFilePath = clpZstFiles[0].path;
    const traceData = await fs.readFile(traceFilePath);
    const traceEntry = {
        uid: clpZstFiles[0].name,
        trace: traceData
    }

    try {
        const engine = new DALEngine({
            name: designName,
            description: "Default engine",
        });

        const engineData = await fs.readFile(designPath);
        engine.deserialize(engineData);
        engine.implementation.addTrace(traceEntry);
        await fs.writeFile(designPath, engine.serialize());
        
        console.log("Trace saved successfully in engine.");
    } catch (err) {
        console.error("Error saving trace in engine:", err);
    }

    return traceEntry;
}



export {saveTraceInEngine, clearTraceFilesInPlayground};