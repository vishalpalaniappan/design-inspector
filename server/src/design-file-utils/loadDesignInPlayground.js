import path from 'path';
import { clearPlaygroundFolder } from "./initFolders.js";
import fs from 'fs/promises';

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