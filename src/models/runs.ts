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

export const prepareRunList = (raw:any) => {

    const formatted = raw.map((item:any) => {
        return {
            title :item?.fields?.title,
            creators : item?.fields?.author?.fields?.name, 
            url :item?.fields?.slug
        }
    })

    return formatted
}

export const preparedRun = (run : any) => {
    console.log(run.fields)
    return {
        name : `${run?.fields?.title} by ${run?.fields?.author?.fields?.name}`,
        collects : run?.fields?.collects,
        editions : run?.fields?.editions?.map((edition:any) => {
            return {
                type : edition?.fields?.type,
            covertype : edition?.fields?.coverType,
            list : edition?.fields?.books?.map((book:any,index:any) => { 
                return {
                    id :index + 1,
                    rating : 0,
                    noOfRatings : 0,
                    published : book?.fields?.publicationYear,
                    coverImage : book?.fields?.cover?.fields?.file?.url,
                    title : book?.fields?.title,
                    pageCount : book?.fields?.pageCount,
                    isbn : book?.fields?.isbn,
                    authors : book?.fields?.author?.map((author:any) => {
                        return author?.fields?.name
                    }),
                    illustrators : book?.fields?.artist?.map((author:any) => {
                        return author?.fields?.name
                    }),
                    collects : book?.fields?.issues,
                }
            }),
            }
        })
    }
}
