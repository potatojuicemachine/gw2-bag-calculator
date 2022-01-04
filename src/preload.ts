import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("test", {
    test: ()=>{ipcRenderer.invoke("test","test").then((val:string)=>{console.log(val)})},
    rend: ()=>{return ipcRenderer}
})