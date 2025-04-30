export interface IBook {
    id: number;
    title: string;
    description?: string;
    pageCount: number;
    published: string;
    latestRepublished?: string;
    authors: IPeople[];
    illustrators: IPeople[];
    rating: number;
    noOfRatings: number;
    collects: string[];
    medianPrice?: number;
    isbn: string;
    coverImage: string;
}

interface IPeople {
    id: number;
    name: string;
}

export interface ICollect {
    title: string;
    issues: string;
}

export interface IEdition {
    type: string;
    covertype: string;
    list: IBook[];
}

export interface IRun {
    name: string;
    year?: number;
    description?: string;
    editions: IEdition[];
    collects: ICollect[];
}

export interface IBookTableItem {
    id: number;
    title: string;
}

export interface IPeopleTableItem {
    id: number;
    name: string;
}
