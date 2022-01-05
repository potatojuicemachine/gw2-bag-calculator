import { release } from "./constants";

export class Logger{
    static log(module: string, func: string, ...args:any){
        if(!release){
            console.log(module + " | " + func, ...args);
        }
    }
}