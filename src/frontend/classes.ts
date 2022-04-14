/**
 * Ein Item im Frontend
 */
export interface FrontendItem{
    name: string;
    id: string;
    item_link: string;
    opened: number;
    results: FrontendResultItem[];
}

/**
 * Ein Resultat eines Items im Frontend
 */
export interface FrontendResultItem{
    name: string;
    id: string;
    item_link: string;
    result: number;
}