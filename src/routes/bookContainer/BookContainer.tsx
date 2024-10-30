import BookComponent from "../book/BookComponent"
import './BookContainer.css'

export default function BookContainer() { 
    return(
        <div className="card-container">
            <BookComponent/>
            <BookComponent/>
            <BookComponent/>
            <BookComponent/>
        </div>
    )
}