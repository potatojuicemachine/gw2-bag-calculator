import { contextBridge } from "electron";
import { APIBridge } from "./frontend/apiBridge";

const bridge:APIBridge = {
    getFileNames: async () => {
        return ["TestFile", "TestFile2"];
    }
}

contextBridge.exposeInMainWorld("bridge", bridge);