import './App.css';
import React, {useEffect, useState} from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Forgot from './form/Forgot';
import Login from './form/Login';
import Register from './form/Register';
import Home from './form/Home';
import UserRecord from './form/components/Record/UserRecord';
import { Container } from 'semantic-ui-react';
import UserListPage from './pages/UserListPage';
import UserListFormPage from './pages/UserListFormPage';



const App = () => {
  return (
    <Container>
      <div className="ui two item menu">
        <NavLink className="item" activeClassName="active" exact to="/">
          Users List
        </NavLink>
        <NavLink
          className="item"
          activeClassName="active"
          exact
          to="/users/new"
        >
          Add User
        </NavLink>
      </div>
      <Routes >
        <Route path='/' element={<UserListPage />}/>;
      </Routes>
      {/* <Routes path="/users/new" component={UserListFormPage} /> */}
      {/* <Routes path="/users/edit/:_id" component={UserListFormPage} /> */}
    </Container>
  );
};

// function App() {
//   return (
//     <UserRecord/>
//   );
// }


//Регистрация Авторизация
// function App() {
//   const[page, setPage] = useState("login");
//   const[token, setToken] = useState();

//   useEffect(()=>{
//     const auth = localStorage.getItem("auth_token")
//     setToken(auth) 
//   }, [token])

//   const choosePage = () => {
//     if(page === "login") {
//       return <Login setPage={setPage}/>
//     }
//     if(page === "forgot") {
//       return <Forgot setPage={setPage}/>
//     }
//     if(page === "register") {
//       return <Register setPage={setPage}/>
//     }
//     if(page === "records") {
//       return <Register setPage={setPage}/>
//     }
//   }

//   const pages = () => {
//     if(token==null) {
//       return (
//       <div className="min-h-screen bg-yellow-400 flex justify-center items-center">
//         <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
//           {choosePage()}
//         </div>
//       </div>
//       );
//     }else{
//       return <Home/>
//     }
//   };

//   return <React.Fragment>{pages()}</React.Fragment>
// }
export default App;
