export interface APIBridge{
    getFileNames():Promise<string[]>;
}