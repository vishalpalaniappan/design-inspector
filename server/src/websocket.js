import {WSMessageHandler} from "./websocketHandlers.js";

const handleWSConnection = async function (request) {
    // TODO: can rewrite this to accept only the requests from allowed origin
    const ws = request.accept(null, request.origin);
   
    const handler = new WSMessageHandler(ws);

    ws.on('message', (data) => {
        if (data.type !== 'binary' || !data.binaryData) {
            console.warn('Ignoring non-binary message. Received type:', data.type);
            return;
        }
        handler.handleMessage(data);
    });
};

export default handleWSConnection;
