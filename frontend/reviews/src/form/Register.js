import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify"

export default function Register(props) {

    const [formRegister, setFormRegister] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    const onChangeForm = (label, event) => {
        switch (label) {
            case "name":
                setFormRegister({ ...formRegister, name: event.target.value });
                break;
            case "email":
                const email_validation = /\S+@\S+\.\S+/
                if (email_validation.test(event.target.value)) {
                    setFormRegister({ ...formRegister, email: event.target.value });
                }
                break;
            case "password":
                setFormRegister({ ...formRegister, password: event.target.value });
                break;
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(formRegister);

        await axios.post("http://localhost:8001/reviews/users/user", formRegister).then((response) => {
            navigate("/?signin");

            toast.success(response.data.detail);

            setTimeout(() => {
                window.location.reload()
            }, 1000);

            console.log(response);
        })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.detail);
            });
    }

    return (
        <React.Fragment>
            <div>
                <h1 className='text-3x1 font-bold text-center mb-4 cursor-pointer'>
                    Create account
                </h1>
                <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto'>
                    Welcome!
                </p>
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className='space-y-4'>
                    <input
                        type="text"
                        placeholder="Username"
                        className='block text-sm py-3 px-4 rounded-lg w-full border-outline-none focus:ring focus:outline-none focus:ring-yellow-400'
                        onChange={(event) => {
                            onChangeForm("name", event)
                        }}
                    >
                    </input>
                    <input
                        type="email"
                        placeholder="Email"
                        className='block text-sm py-3 px-4 rounded-lg w-full border-outline-none focus:ring focus:outline-none focus:ring-yellow-400'
                        onChange={(event) => {
                            onChangeForm("email", event)
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
                    <button type="submit" className="py-3 w-64 text-xl text-white bg-yellow-400 rounded-2x1 hover:bg-yellow-300 active:bg-yellow-500 outline-none">
                        Create Account
                    </button>
                    <p className="mt-4 text-sm">
                        Already have an account?{" "}
                        <Link to="/?signin" onClick={() => {
                            props.setPage("login")
                        }}>
                            <span className="underline cursor-pointer">Sign In</span>
                        </Link>
                    </p>
                </div>
            </form>
        </React.Fragment>
    )
}