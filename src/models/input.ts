export interface IBookInput {
    title: string;
    description: string;
    pageCount: number;
    published: string;
    latestRepublished: string;
    isbn: string;
    authors: number[];
    illustrators: number[];
    collects: ICollectInput[];
}

export interface ICollectInput {
    title: string;
    issues: string;
}
