
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./root/Root";
import LoginScreen from "./login/LoginScreen";
import MainFrame from "./app/MainFrame";
import Dashboard from "./app/dashboard/Dashboard";
import Authors from "./app/authors/Authors";
import BookContainer from "./bookContainer/BookContainer";


export const Router = () => 
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Root /> }>
        <Route path='login' element={ <LoginScreen /> } />

        <Route path='app' element={ <MainFrame /> } >
          <Route path='dashboard' element={ <Dashboard /> } />

          <Route path='authors' element={ <Authors /> }>
            <Route path=':authorId' element={ <h2>author X</h2>} />
          </Route>

          <Route path='books' element={ <BookContainer /> }>
            <Route path=':bookId' element={ <h2>book X</h2>} />
          </Route>
        </Route>
      
      </Route>
    </Routes>
  </BrowserRouter>
