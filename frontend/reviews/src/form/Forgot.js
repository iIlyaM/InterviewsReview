import React from "react";
import { Link } from "react-router-dom"

export default function Forgot(props) {
    return (
        <React.Fragment>
            <div>
                <h1 className='text-3x1 font-bold text-center mb-4 cursor-pointer'>
                    Forgot your password ?
                </h1>
                <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto'>
                    Now update your password account!
                </p>
            </div>
            <form>
                <div className='space-y-4'>
                    <input
                        type="email"
                        placeholder="Email"
                        className='block text-sm py-3 px-4 rounded-lg w-full border-outline-none focus:ring focus:outline-none focus:ring-yellow-400'>
                    </input>
                    <input
                        type="password"
                        placeholder="New Password"
                        className='block text-sm py-3 px-4 rounded-lg w-full border-outline-none focus:ring focus:outline-none focus:ring-yellow-400'>
                    </input>
                </div>
                <div className="text-center mt-6">
                    <button type="submit" className="py-3 w-64 text-xl text-white bg-yellow-400 rounded-2x1 hover:bg-yellow-300 active:bg-yellow-500 outline-none">
                        Update Password
                    </button>
                    <p className="mt-4 text-sm">
                        Already have an account?{" "}
                        <Link to="/?signin"
                         onClick={() => {
                            props.setPage("login")
                        }}>
                            <span className="underline cursor-pointer">Sign In</span>
                        </Link>
                    </p>
                </div>
            </form>
        </React.Fragment>
    )
};