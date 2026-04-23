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

        // Create behavior
        const behavior = engine.createBehavior({
            name: "Test Behavior",
            description: "A behavior for testing transformations"
        });

        console.log(behavior);

        // Assign initial world state
        behavior.setPreWorldState(payload.initialWorldState);
        // Assign expected world state
        behavior.setPostWorldState(payload.expectedPostWorldState);
        // Assign primitives
        behavior.addPrimitives(payload.primitives);
        // Assign initial arguments
        behavior.setPrimitiveArgs(payload.initialArgs);
        // Compute transformations
        const [updatedWorldState, isValid] =behavior.computeTransformations();
        // Validate output of computation

        console.log(updatedWorldState, isValid);
        console.log(behavior);

        self.postMessage({updatedWorldState, isValid});
    }
};
