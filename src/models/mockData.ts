import type { IBook, IRun } from "./books";
import type { IHomeListItem, IRunList } from "./runs";

export const listSample: IBook[] = [
    {
        title: "ABC",
        description:
            "In this gripping collection, you will find a series of thrilling adventures that will keep you on the edge of your seat. Each story is crafted with care and attention to detail, ensuring that you are fully immersed in the world of the characters. From heart-pounding action scenes to emotional moments that will tug at your heartstrings, this collection has it all. Whether you are a fan of mystery, romance, or fantasy, there is something here for everyone. So sit back, relax, and get ready to be transported to a world of excitement and wonder.",
        authors: [{
            id: 1,
            name: "John Doe",
        }, {
            id: 2,
            name: "John2 Doe2",
        }],
        illustrators: [{
            id: 1,
            name: "John Doe",
        }, {
            id: 2,
            name: "John2 Doe2",
        }],
        rating: 3.5,
        noOfRatings: 1002,
        collects: [{ title: "Hitman", issues: "1-3" }, {
            title: "Demon Annual",
            issues: "2",
        }],
        published: "2020-01-01",
        latestRepublished: "2020-01-01",
        pageCount: 200,
        id: 1,
        image:
            "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1476883970i/31224156._SY180_.jpg",
    },
    {
        title: "XYZ",
        description:
            "A captivating collection of stories that will take you on a journey through different worlds and experiences. Each tale is unique and offers a fresh perspective on life, love, and adventure. With a mix of genres and styles, this collection is perfect for readers who enjoy variety and excitement.",
        authors: [{
            id: 1,
            name: "John Doe",
        }, {
            id: 2,
            name: "John2 Doe2",
        }],
        illustrators: [{
            id: 1,
            name: "John Doe",
        }, {
            id: 2,
            name: "John2 Doe2",
        }],

        rating: 4.2,
        noOfRatings: 850,
        collects: [{ title: "Adventure", issues: "1-5" }, {
            title: "Mystery Annual",
            issues: "1",
        }],
        published: "2019-05-15",
        latestRepublished: "2019-05-15",
        image:
            "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1476883970i/31224156._SY180_.jpg",
        pageCount: 240,
        id: 2,
    },
    {
        title: "LMN",
        description:
            "Dive into a world of imagination with this collection of stories that will leave you spellbound. Each story is a masterpiece, crafted with precision and creativity. From fantastical realms to real-life scenarios, this collection has something for everyone. Get ready to be amazed and inspired.",
        authors: [{
            id: 1,
            name: "John Doe",
        }, {
            id: 2,
            name: "John2 Doe2",
        }],
        illustrators: [{
            id: 1,
            name: "John Doe",
        }, {
            id: 2,
            name: "John2 Doe2",
        }],
        rating: 4.8,
        noOfRatings: 1200,
        collects: [{ title: "Fantasy", issues: "1-4" }, {
            title: "Sci-Fi Annual",
            issues: "3",
        }],
        published: "2021-07-20",
        latestRepublished: "2021-07-20",
        image:
            "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1476883970i/31224156._SY180_.jpg",
        pageCount: 200,
        id: 3,
        medianPrice: 1100,
    },
];

export const sampleRun: IRun = {
    name: "Nightwing",
    year: 2016,
    description:
        "Nightwing is a fictional superhero appearing in American comic books published by DC Comics. The character has appeared in various incarnations, with the Nightwing identity most prominently",
    editions: [{
        type: "Omnibus",
        coverType: "Hardcover",
        list: listSample,
    }, {
        type: "Paperback",
        coverType: "Paperback",
        list: listSample,
    }],
};

export const sampleRunList: IRunList = {
    name: "Nightwing",
    list: [
        {
            id: 1,
            name: "Nightwing",
            year: "2016 - 2018",
            collects: "1-3",
            period: "Post Crisis",
        },
        {
            id: 2,
            name: "Nightwing",
            year: "2016 - 2018",
            collects: "1-3",
            period: "New 52",
        },
    ],
};

export const comicRuns: IHomeListItem[] = [
    {
        rank: 1,
        title: "Fantastic Four",
        creators: "Jack Kirby and Stan Lee",
        runId: "1",
    },
    { rank: 2, title: "Sandman", creators: "Neil Gaiman", runId: "2" },
    {
        rank: 3,
        title: "Daredevil",
        creators: "Frank Miller and Klaus Janson",
        runId: "3",
    },
    { rank: 4, title: "Batman", creators: "Grant Morrison", runId: "4" },
    {
        rank: 5,
        title: "X-Men",
        creators: "John Byrne, Chris Claremont, and Terry Austin",
        runId: "5",
    },
    {
        rank: 6,
        title: "Watchmen",
        creators: "Alan Moore and Dave Gibbons",
        runId: "6",
    },
    {
        rank: 7,
        title: "X-Men",
        creators: "Chris Claremont and John Byrne",
        runId: "7",
    },
    { rank: 8, title: "Thor", creators: "Walt Simonson", runId: "8" },

    {
        rank: 9,
        title: "Batman: The Dark Knight Returns",
        creators: "Frank Miller",
        runId: "9",
    },
    { rank: 10, title: "Swamp Thing", creators: "Alan Moore", runId: "10" },
];
