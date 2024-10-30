import { Book } from "../../model/Book";
import Card from "@mui/material/Card";
import "./BookComponent.css"

var isEnter: boolean = false
var width = 180
var height = 270
const book: Book = new Book(1200, "el libro de bill", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.ar%2Fel-libro-de-bill-de-alex-hirsch-editorial-planeta-tapa-blanda%2Fp%2FMLA38346131&psig=AOvVaw2dN81UFGXdqRU55jLeH5Ka&ust=1730077753380000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjH54CwrYkDFQAAAAAdAAAAABAE", "alex hirsch", 300, new Date(1,2,2003), "español",30000,1)

function enter(){
    isEnter = true
    width = 100
    height = 140
}

function exit(){
    isEnter = false
    width = 180
    height = 270
}

//function removeBook(): void {
 //   onDeleteBook.emit(this.book)
//}

export default function BookComponent() {    


    return (
        <Card>
            <div className="image-center">
                <img width="{width}" height="{{height}}" src={book.imageURL} alt="Portada de libro"/>
            </div>
            <div className="card-header">
                <h2>{book.title}</h2>
                <span  className="images">
                    <button>
                    </button>
                </span>
            </div>
            <p className="autor">Por {book.autor} </p>
            <ul className="comments">
                <li className="comment"><img src="assets/article.svg" alt="Icono de paginas"/>{book.pages} Paginas</li>
                <li className="comment"><img src="assets/text.svg" alt="Ícono de palabras"/>{book.words} Palabras</li>
                <li className="comment"><img src="assets/calendar.svg" alt="Ícono de fecha"/> {book.date.toDateString()}</li>
                <li className="comment"><img src="assets/globe.svg" alt="Icono de lenguajes"/>{book.lenguages}</li>
                <li className="comment"><img src="assets/money.svg" alt="Ícono de ventas"/>{book.sales} Ventas</li>
            </ul>
        </Card>
    )
}