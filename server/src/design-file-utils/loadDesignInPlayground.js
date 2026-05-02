import path from 'path';
import { clearPlaygroundFolder } from "./initFolders.js";
import fs from 'fs/promises';

/**
 * TODO:
 * If I want to implement live debugging, I  have to implement the debugger as a state machine
 * where the inputs are each log statement. This means that as the logs stream in, the state machine
 * will transition. I don't wait for the entire trace to debug, I do it live as the state machine 
 * transitions. Its actually a very simple implementation if the setup is done right, so I'm not
 * bothering with it yet, it needs changes to the UI, the engine and adding infrastructure to stream
 * the logs as they are generated. I will do it later since it isn't priority. I'm not sure if this
 * is the right place to leave this note, but I will just leave it here. I should probably open an
 * issue with this information, that seems like the best way to track it, so I will migrate all these
 * kinds of todos to git later.
 */

async function loadDesignInPlayground(engine) {

    /**
     * The workbench will execute the design with the following steps:
     * - Clear the playground folder.
     * - Save the design to the playground folder with generic name.
     * - Save the design runtime in the playground folder along with its supporting files. 
     * - Run script node designRuntime.js is executed in the termianal to execute the design.
     * - When the user is done, the generate trace file is saved in the engine.
     * - Trace file is debugged when it is ingested.
     * - Trace file is stored in front end and can be accessed in debug view.
     */
    
}


export default loadDesignInPlayground;