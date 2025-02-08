export interface IBook {
    id: number;
    title: string;
    description: string;
    pageCount: number;
    published: string;
    latestRepublished?: string;
    authors: IPeople[];
    illustrators: IPeople[];
    rating: number;
    noOfRatings: number;
    collects: ICollect[];
    medianPrice?: number;
    isbn: string;
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
    coverType: string;
    list: IBook[];
}

export interface IRun {
    name: string;
    year?: number;
    description?: string;
    editions: IEdition[];
    collects: ICollect[];
}
