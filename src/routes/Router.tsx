
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";
import Root from "./root/Root";
import LoginScreen from "./login/LoginScreen";
import MainFrame from "./app/MainFrame";
import Dashboard from "./app/dashboard/Dashboard";
import Authors from "./app/authors/Authors";
import AuthorEdit from "./app/authors/AuthorEdit";
import BookContainer from "./app/bookContainer/BookContainer";


export const Router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={ <Root /> }>
        <Route path='login' element={ <LoginScreen /> } />

        <Route path='app' element={ <MainFrame /> } >
          <Route path='dashboard' element={ <Dashboard></Dashboard> } />

          <Route path="/app/authors/:id" element={<AuthorEdit />} />
          <Route path="/app/authors" element={<Authors />} />
          
          <Route path='books' element={<BookContainer/>}/>
            <Route path=':bookId' element={ <h2>book X</h2>} />
          
        </Route>
      </Route>
  )
) 
