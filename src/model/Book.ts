import { Author } from "./Author"

export class Book {

    pages: number = 0
    title: string = ""
    imageURL: string = ""
    autor: Author
    words: number = 0
    date: Date = new Date(0,0,0)
    complex: boolean
    lenguages: string[]
    editions: number
    sales: number = 0
    id: number = -1

    constructor(
        pages: number,
        title: string,
        imageURL: string,
        autor: Author,
        words: number,
        date: Date,
        complex: boolean,
        lenguages: string[],
        editions: number,
        sales: number,
        id: number
    ) {
        this.pages = pages
        this.title = title
        this.imageURL = imageURL
        this.autor = autor
        this.words = words
        this.date = date
        this.complex = complex
        this.lenguages = lenguages
        this.editions = editions
        this.sales = sales
        this.id = id
    }

    get displayName(){
        return this.title + ' ' + this.autor
    }

    static fromBookJSON(bookToJSON: BookToJSON) : Book{
        return new Book(
        bookToJSON.pages,
        bookToJSON.title,
        bookToJSON.imageURL,
        bookToJSON.autor,
        bookToJSON.words,
        bookToJSON.date,
        bookToJSON.complex,
        bookToJSON.lenguages,
        bookToJSON.editions,
        bookToJSON.sales,
        bookToJSON.id)
}

bookToJSON(): BookToJSON {
return {
    pages: this.pages,
    title: this.title,
    imageURL: this.imageURL,
    autor: this.autor,
    words: this.words,
    date: this.date,
    complex: this.complex,
    lenguages: this.lenguages,
    editions: this.editions,
    sales: this.sales,
    id: this.id
}
}


    static largeBookPages = 300
    
    isBestSeller() {
        return this.sales > 10000 || this.lenguages.length > 5
    }
}

export type  BookToJSON = {
    pages: number
    title: string
    imageURL: string
    autor: Author
    words: number
    date: Date
    complex: boolean
    lenguages: string
    editions: number
    sales: number
    id: number
}
