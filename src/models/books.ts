export interface IListItem {
    id:number;
    title: string;
    description: string;
    author: IPeople[];
    illustrator: IPeople[];
    rating: number;
    noOfRatings: number;
    collects: ICollect[];
    published: string;
    latestRepublished: string;
    imageUrl: string;
    pageCount : number;
    averagePrice?: number;
}

interface IPeople {
    id : number;
    name : string;
}

interface ICollect {
    title : string;
    issues : string;
}

export interface IList {
    list: IListItem[];
}

export interface IEdition {
    type: string;
    list: IListItem[];
}

export interface IRun {
    name: string;
    year: number;
    description : string;
    editions: IEdition[];
}

export interface IRunListItem {
    id: number;
    name: string;
    year: string;
    collects: string;
    period: string;
}

export interface IRunList {
    name: string;
    list: IRunListItem[];
}
