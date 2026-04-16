import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INSTRUMENTER_PATH = path.resolve(__dirname, "../../tools/instrumenter/design_instrumenter.py");

/**
 * Passes the instrumentation package to the runner and receives a zip file with the instrumented source.
 * @param {String} source Instrumentation package to be processed by the instrumenter.
 * @param {Array} args The arguments to pass to the instrumenter.
 * @returns {Promise<Buffer>} A promise that resolves with the output of the instrumenter.
 */
function instrumentationRunner(source, args = []) {
    return new Promise((resolve, reject) => {
        if (typeof source !== "string") {
            reject(new Error("Instrumentation source must be a string."));
            return;
        }

        const process = spawn("python3", [INSTRUMENTER_PATH, "instrumenter_stream", ...args]);
                let settled = false;

        const stdoutChunks = [];
        let stderr = "";

        process.stdout.on("data", (data) => {
            stdoutChunks.push(data);
        });

        process.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        process.on("error", (err) => {
            if (settled) return;
            settled = true;
            reject(err);
        });

        process.on("close", async (code) => {
            if (settled) return;
            settled = true;
            if (code !== 0) {
                reject(new Error(stderr || `Process exited with code ${code}`));
            } else {
                resolve(Buffer.concat(stdoutChunks));
            }
        });

        process.stdin.write(source);
        process.stdin.end();
    });
}

export default instrumentationRunner;