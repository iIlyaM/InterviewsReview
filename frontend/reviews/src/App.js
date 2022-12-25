import './App.css';
import React , {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminHeader from "./components/headers/AdminHeader";
import HrHeader from "./components/headers/HrHeader";
import UserHeader from "./components/headers/UserHeader";
import Login from './form/Login';
import Register from './form/Register';
import Home from './components/headers/Home';
import { Container } from 'semantic-ui-react';
import { NavLink, Router, Route, Navigate } from 'react-router-dom';


// function App() {

//     let a = "admin";

//     if (a === "admin") {
//         return (
//             <div>
//                 {<AdminHeader/>}
//                 {/*{<HrHeader/>}*/}
//                 {/*{<UserHeader/>}*/}
//             </div>
//         )
//     }
// }

// export default App;


function App() {
  const[page, setPage] = useState("login");
  const[token, setToken] = useState();

  useEffect(()=>{
    const auth = localStorage.getItem("auth_token")
    setToken(auth) 
  }, [token])

  const choosePage = () => {
    if(page === "login") {
      return <Login setPage={setPage}/>
    }
    if(page === "register") {
      return <Register setPage={setPage}/>
    }
  }

  const pages = () => {
    if(token==null) {
      return (
      <div className="min-h-screen bg-yellow-400 flex justify-center items-center">
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          {choosePage()}
        </div>
      </div>
      );
    }else{
      return (
            <div>
                {<AdminHeader/>}
                {/*{<HrHeader/>}*/}
                {/*{<UserHeader/>}*/}
            </div>
      );
    }
  };

  return <React.Fragment>{pages()}</React.Fragment>
}
export default App;