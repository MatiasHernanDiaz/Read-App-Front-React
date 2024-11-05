import { List, Stack } from "@mui/material"
import { Book } from "../../model/Book"
import BookComponent from "../book/BookComponent"
import './BookContainer.css'

const books: Book[] = [
    new Book(1200, "el libro de bill", "https://http2.mlstatic.com/D_NQ_NP_729185-MLU77759079789_072024-O.webp", "alex hirsch", 300, new Date(1,2,2003), "español",30000,1),
    new Book(1200, "el libro de bill", "https://marketplace.canva.com/EAFjNCKkDPI/1/0/1003w/canva-portada-de-libro-de-fantas%C3%ADa-dram%C3%A1tico-verde-Ct1fLal3ekY.jpg", "alex hirsch", 300, new Date(1,2,2003), "español",30000,1),
    new Book(1200, "el libro de bill", "https://http2.mlstatic.com/D_NQ_NP_729185-MLU77759079789_072024-O.webp", "alex hirsch", 300, new Date(1,2,2003), "español",30000,1),
    new Book(1200, "el libro de bill", "https://marketplace.canva.com/EAFjNCKkDPI/1/0/1003w/canva-portada-de-libro-de-fantas%C3%ADa-dram%C3%A1tico-verde-Ct1fLal3ekY.jpg", "alex hirsch", 300, new Date(1,2,2003), "español",30000,1),
    new Book(1200, "el libro de bill", "https://marketplace.canva.com/EAFjNCKkDPI/1/0/1003w/canva-portada-de-libro-de-fantas%C3%ADa-dram%C3%A1tico-verde-Ct1fLal3ekY.jpg", "alex hirsch", 300, new Date(1,2,2003), "español",30000,1)
]

export default function BookContainer() { 
    return(
        <Stack sx={{gap:"1rem", alignItems:"center"}}>
            {books.map((book) => (
                <BookComponent book={book}/>
            ))}
        </Stack>
    )
}