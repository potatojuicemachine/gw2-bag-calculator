import { app } from "electron";
import * as fs from "fs";
import { Logger } from "../helper/Logger";
import { FilesFile } from "./classes";
import { ItemFileController } from "./itemFileController"; 

/**
 * Class to load and manage files
 */
export class ItemFilesController {

    /** Name of the file, that contains the name of all files */
    private readonly files_file_name: string = "files.json";

    /** Version of the file, that contains all files */
    private readonly files_file_version = 1;

    /** Path in which all files are saved */
    private savePath = app.getPath("userData");
    /** Name of all loaded files */
    private allFileNames: string[] = [];
    /** Object to save the content of all files */
    private allFiles: { name: string, ctrl: ItemFileController }[] = [];

    constructor() {
        this.loadAllFiles();
    }

    /**
     * Returns all file names
     */
    public getAllFileNames(): string[] {
        return this.allFileNames;
    }

    /**
     * Returns a file with the given name
     */
    public getFile(file_name: string): ItemFileController | undefined {
        for (const file of this.allFiles) {
            if (file.name === file_name) {
                return file.ctrl;
            }
        }
        return undefined;
    }

    /**
     * Loads all files
     */
    private loadAllFiles(): void {
        Logger.log("ItemFilesController", "loadAllFiles");
        this.loadFilesFile();

        for (const file_name of this.allFileNames) {
            this.allFiles.push({ name: file_name, ctrl: new ItemFileController(file_name) });
        }
    }

    /**
     * Loads the files files and writes the content into allFileNames
     */
    private loadFilesFile() {
        Logger.log("ItemFilesController", "loadFilesFile");
        let files = this.openFile(this.files_file_name) as FilesFile;
        if (files === undefined) {
            this.allFileNames = ["my_first_file"];
            return;
        }
        this.allFileNames = files.content;
    }

    /**
     * Opens a json file and returns the content as an object
     * @param file_name the name of the file
     */
    private openFile(file_name: string): any {
        Logger.log("ItemFilesController", "openFile", file_name);
        let file_path = this.savePath + "\\" + file_name;

        if (fs.existsSync(file_path) && fs.statSync(file_path).isFile()) {
            try {
                let data = fs.readFileSync(file_path);
                return JSON.parse(data.toString());
            } catch (error) {
                return undefined;
            }
        }

        return undefined;
    }
}