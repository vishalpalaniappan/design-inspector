import { TerminalSession } from "./terminal/terminal.js";
import createDesign from "./design-file-utils/createDesign.js";
import deleteDesign from "./design-file-utils/deleteDesign.js";
import loadDesigns from "./design-file-utils/loadDesigns.js"
import loadDesign from "./design-file-utils/loadDesign.js";
import saveDesign from "./design-file-utils/saveDesign.js";
import {saveTraceInEngine} from "./design-file-utils/saveTraceInEngine.js";
import {clearTraceFilesInPlayground} from "./design-file-utils/saveTraceInEngine.js";
import { unpack, pack } from 'msgpackr';

export class  WSMessageHandler {
    constructor(ws) {
        this.ws = ws;

        // TODO: Add support for multiple terminals (identified using UID)
        this.startTerminalAndAddListeners();

        this.ws.on("close", () => {
            this.stopTerminalAndRemoveListeners();
        });

        this.handlers = {
            workspaces: this.workspaces.bind(this),
            save_engine: this.saveEngine.bind(this),
            terminal_input: this.onTerminalInput.bind(this),
            terminal_resize: this.onTerminalResize.bind(this),
            create_design: this.createDesign.bind(this),
            delete_design: this.deleteDesign.bind(this),
            load_design: this.loadDesign.bind(this),
            terminal_run_entry_point: this.onTerminalRunEntryPoint.bind(this),
            entry_point_finished: this.onEntryPointFinished.bind(this),
        };
    }

    sendMessage(msg) {
        if (this.ws.readyState === this.ws.OPEN) {
            this.ws.send(Buffer.from(pack(msg)));
        }
    }

    handleMessage(message) {
        try {
            message = unpack(message.binaryData);

            const handler = this.handlers[message.type];

            if (!handler) {
                console.warn('Unknown message type:', message.type);
                return;
            }

            handler(message);
        } catch (err) {
            console.error('Failed to process message:', err);
        }
    }

    stopTerminalAndRemoveListeners() {
        this.terminal.stop();
        this.terminal.off("data", this.onTerminalData);
        this.terminal.off("exit", this.onTerminalExit);
        this.terminal.off("start", this.onTerminalStart);
        this.terminal.off("stop", this.onTerminalStop);
    }

    startTerminalAndAddListeners(args) {
        this.terminal = new TerminalSession(args);
        this.terminal.on("data", this.onTerminalData);
        this.terminal.on("exit", this.onTerminalExit);
        this.terminal.on("start", this.onTerminalStart);
        this.terminal.on("stop", this.onTerminalStop);
        this.terminal.start();
    }

    createDesign = async (msg) => {
        try {
            await createDesign(msg.payload.fileName)
        } catch (err) {
            console.error("Failed to create design:", err.message);
            this.sendMessage({ type: "error", data: err.message });
            return;
        }

        try {
            const folders = await loadDesigns();
            msg.type = "workspaces";
            msg.data = folders;
            this.sendMessage(msg);
        } catch (err) {
            this.sendMessage({ type: "error", data: err.message });
        }
    }

    deleteDesign = async (msg) => {
        try {
            await deleteDesign(msg.payload.fileName);
            const folders = await loadDesigns();
            msg.type = "workspaces";
            msg.data = folders;
            this.sendMessage(msg);
        } catch (err) {
            this.sendMessage({ type: "error", data: err.message });
        }
    }

    loadDesign = async (msg) => {
        try {
            const file = await loadDesign(msg.payload.fileName)
            msg.type = "load_design";
            msg.data = file;
            this.sendMessage(msg);
        } catch (err) {
            this.sendMessage({ type: "error", data: err.message });
        }
    }

    workspaces = async (msg) => {
        try {
            const folders = await loadDesigns();
            msg.type = "workspaces";
            msg.data = folders;
            this.sendMessage(msg);
        } catch (err) {
            this.sendMessage({ type: "error", data: err.message });
        }
    }

    saveEngine = async (msg) => {
        try {
            const serializedEngine = await saveDesign(msg.payload.fileName, msg.payload.data);
            this.sendMessage({ type: "design_save_successful", data: serializedEngine });
        } catch (err) {
            this.sendMessage({ type: "design_save_failed" });
            this.sendMessage({ type: "error", data: err.message });
        }
    }

    onTerminalData = (data) => {
        if (this.ws.readyState === this.ws.OPEN) {
            this.sendMessage({ type: "terminal_output", data });
        }
    }

    onTerminalExit = (exit) => {
        if (this.ws.readyState === this.ws.OPEN) {
            this.sendMessage({ type: "terminal_exit", data: exit });
        }
    }

    onTerminalStart = () => {
        this.sendMessage({ type: "terminal_started" });
    }

    onTerminalStop = () => {
        this.sendMessage({ type: "terminal_stopped" });
    }

    onTerminalResize = (msg) => {
        this.terminal.resize(msg.cols, msg.rows);
    }

    onTerminalInput = (msg) => {
        this.terminal.write(msg.data);
    }

    onEntryPointFinished = async (msg) => { 
        const traceEntry = await saveTraceInEngine();
        if (traceEntry) {
            this.sendMessage({ type: "add_trace", data: traceEntry });
        } else {
            console.warn("No trace entry to send to front end.");
        }
        this.terminal = new TerminalSession();
        this.terminal.on("data", this.onTerminalData);
        this.terminal.on("exit", this.onTerminalExit);
        this.terminal.on("start", this.onTerminalStart);
        this.terminal.on("stop", this.onTerminalStop);
        this.terminal.start();
    }   

    onTerminalRunEntryPoint = async (msg) => {        
        // Since both stop and exit run, we use a flag ensure only
        // one entry_point_finished message is sent.
        let entryPointFinishedSent = false;
        const handleFinished = () => {
            if (!entryPointFinishedSent) {
                entryPointFinishedSent = true;
                this.sendMessage({ type: "entry_point_finished" });
            }
        }

        await clearTraceFilesInPlayground();
        this.stopTerminalAndRemoveListeners();
        this.terminal = new TerminalSession({ command: msg.data });
        this.terminal.on("data", this.onTerminalData);
        this.terminal.on("exit", handleFinished);
        this.terminal.on("start", this.onTerminalStart);
        this.terminal.on("stop", handleFinished);
        this.terminal.start();
    }
}