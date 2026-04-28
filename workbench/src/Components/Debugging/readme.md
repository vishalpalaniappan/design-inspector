#### Plans

My plan for this mode is to allow the user to load either an execution trace or
the output of a semantic model execution. Since both are represented through the
behaviors and the conditions, it doesn't matter.

If there is a failure and a root cause can't be identified, I want to allow the
user to make behavioral changes directly in the debug mode. In this sense, the
debugging is enabling the learning because the semantics that are added will be
associated with that trace. 

When I want to check if the implementation or the behavior of the design itself
respects the invariant, I can simply use the environment in this trace.

Obvioulsy there is missing step here, I need to make the semantic model executable
and bring those traces into this mode. I will do that after I finish this visualization.
I intend to make the output of the engine validation much more visually clean, instead of
just a text file.

