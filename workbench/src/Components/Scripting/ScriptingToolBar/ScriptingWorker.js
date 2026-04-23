import {DALEngine} from "dal-engine-core-js-lib-dev";

self.onmessage = (event) => {
    const {type, payload} = event.data;


    if (type === "RUN_TRANSFORMATION") {
        const engine = new DALEngine({
            name: "default",
            description: "Default engine",
        });

        console.log(payload);
        console.log(engine);

        // Assign initial world state
        // Assign expected world state
        // Assign primitives

        // Compute transformations

        // Validate output of computation

        // self.postMessage(result);
    }
};
