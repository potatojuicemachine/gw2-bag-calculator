import * as fs from "fs";
import { FileItem, ItemFile } from "./classes";

export class ItemFileController {

    /** Version of the item files */
    private static readonly item_file_version = 1;

    private content: FileItem[] = [];

    constructor(private file_path: string) {
        const file = this.loadFile();
        this.loadContent(file);
    }

    private loadFile(): ItemFile | undefined {
        if (fs.existsSync(this.file_path) && fs.statSync(this.file_path).isFile()) {
            try {
                let data = fs.readFileSync(this.file_path);
                return JSON.parse(data.toString());
            } catch (error) {
                return undefined;
            }
        }

        return undefined;
    }

    private loadContent(content: ItemFile): void {
        this.content = content.content;
    }
}