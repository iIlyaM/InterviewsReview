import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"

export default function Login(props) {
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    });

    const onChangeForm = (label, event) => {
        switch (label) {
            case "username":
                setLoginForm({ ...loginForm, username: event.target.value });
                break;
            case "password":
                setLoginForm({ ...loginForm, password: event.target.value });
                break;
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        console.log(loginForm)
        await axios
        .post("http://localhost:8001/reviews/login", loginForm)
        .then((response) => {
            console.log(response)
            console.log(response.data.access_token)
            localStorage.setItem("auth_token", response.data.access_token)
            localStorage.setItem("auth_token_type", response.data.token_type)

            // toast.success.data(response.data.detail);

            setTimeout(()=>{
                window.location.reload()
            },1000)
        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data.detail);
        })
    };


    return (
        <React.Fragment>
            <div>
                <h1 className='text-3x1 font-bold text-center mb-4 cursor-pointer'>
                    Welcome!
                </h1>
                <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto'>
                    Please login your account!
                </p>
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className='space-y-4'>
                    <input
                        type="email"
                        placeholder="Email"
                        className='block text-sm py-3 px-4 rounded-lg w-full border-outline-none focus:ring focus:outline-none focus:ring-yellow-400'
                        onChange={(event) => {
                            onChangeForm("username", event)
                        }}
                    >
                    </input>
                    <input
                        type="password"
                        placeholder="Password"
                        className='block text-sm py-3 px-4 rounded-lg w-full border-outline-none focus:ring focus:outline-none focus:ring-yellow-400'
                        onChange={(event) => {
                            onChangeForm("password", event)
                        }}
                    >
                    </input>
                </div>
                <div className="text-center mt-6">
                    <button type="submit" className="py-3 w-64 text-xl text-white bg-yellow-400 rounded-2x1 hover:bg-yellow-300 active:bg-yellow-500 outline-none">Sign In</button>
                    <p className="mt-4 text-sm">
                        You dont have an account?{" "}
                        <Link
                            to="/?register"
                            onClick={() => {
                                props.setPage("register")
                            }}
                        >
                            <span className="underline cursor-pointer">Register</span>
                        </Link>
                        {" "}
                        or {" "}
                        <Link to="/?forgot"
                            onClick={() => {
                                props.setPage("forgot")
                            }}
                        >
                            <span className="underline cursor-pointer">Forgot password?</span>
                        </Link>
                    </p>
                </div>
            </form>
        </React.Fragment>
    )
}