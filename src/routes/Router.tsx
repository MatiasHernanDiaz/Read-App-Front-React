
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Root from "./root/Root";
import LoginScreen from "./login/LoginScreen";
import MainFrame from "./app/MainFrame";
import Dashboard from "./app/dashboard/Dashboard";
import Authors from "./app/authors/Authors";
import AuthorEdit from "./app/authors/AuthorEdit";
import BookContainer from "./app/bookContainer/BookContainer";
import BookEdit from "./app/bookContainer/EditBook"


export const Router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={ <Root /> }>
        <Route path='login' element={ <LoginScreen /> } />

        <Route path='app' element={ <MainFrame /> } >
          <Route path='dashboard' element={ <Dashboard /> } />

          <Route path="authors/:id" element={<AuthorEdit />} />
          <Route path="authors/new" element={<AuthorEdit />} />
          <Route path="authors" element={<Authors />} />
          
          <Route path='books' element={<BookContainer/>}/>
          <Route path='books/:id' element={ <BookEdit/>} />
          <Route path="books/new" element={<BookEdit/> } />


        </Route>
      </Route>
  )
) 
