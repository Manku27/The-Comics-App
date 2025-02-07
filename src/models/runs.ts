export interface IHomeListItem {
    rank: number;
    title: string;
    creators: string;
    runId: string;
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
