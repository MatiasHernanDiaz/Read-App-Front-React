export class Book {

    pages: number = 0
    title: string = ""
    imageURL: string = ""
    autor: string = ""
    words: number = 0
    date: Date = new Date(0,0,0)
    lenguages: string = ""
    sales: number = 0
    id: number = -1

    constructor(
        pages: number,
        title: string,
        imageURL: string,
        autor: string,
        words: number,
        date: Date,
        lenguages: string,
        sales: number,
        id: number
    ) {
        this.pages = pages
        this.title = title
        this.imageURL = imageURL
        this.autor = autor
        this.words = words
        this.date = date
        this.lenguages = lenguages
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
        bookToJSON.lenguages,
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
    lenguages: this.lenguages,
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
    autor: string
    words: number
    date: Date
    lenguages: string
    sales: number
    id: number
}
