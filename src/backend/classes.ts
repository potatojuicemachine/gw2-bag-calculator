/**
 * File in which all files are saved
 */
export interface FilesFile{
    /**
     * Version of the files files
     */
    version: number;
    /**
     * All Files that should be loaded
     */
    content: string[]
}

/**
 * File that contains items
 */
export interface ItemFile{
    version: number;
    content: FileItem[];
}

/**
 * Item in a file
 */
export interface FileItem{
    id: string;
    opened: number;
    results: ResultItem[];
}

/**
 * Result of opening an item
 */
export interface ResultItem{
    id: string;
    result: number;
}