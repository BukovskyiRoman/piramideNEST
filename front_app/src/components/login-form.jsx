import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set } from "../app/features/jwt/jwtSlice";

export default function LoginForm() {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

    function emailChange(event) {
        setEmail(event.target.value);
    }

    function passwordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        const url = "http://localhost:5000"
        //const url = "http://107.23.119.30:5000"
        //const url = "nest-app:5000"
        fetch(`${url}/auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    setSuccess(true);
                }
                return response.json();
            })
            .then((result) => {
                if (!result.access_token) {
                    setError(result.message);
                } else {
                    dispatch(set(result.access_token));
                }
            });
        event.preventDefault();
    }

    if (success) {
        return <Navigate replace to="/profile" />;
    }

    return (
        <div className="w-full mt-4">
            {error && (
                <div className="bg-white ml-auto mr-auto w-[40%] p-2 text-red-600 flex items-center rounded">
                    <span className="mr-auto ml-auto"> {error} </span>
                </div>
            )}
            <form
                className="bg-white ml-auto mr-auto w-[40%] mt-6 px-8 py-4 rounded-lg"
                onSubmit={handleSubmit}
            >
                <label className="">
                    Email:
                    <input
                        className="
                            border-2
                            border-grey-100
                            active:border-black-600
                            focus:outline-none
                            rounded-6 px-2
                            active:border-gray-400
                            focus:border-gray-400
                            w-full
                            "
                        type="text"
                        name="username"
                        value={email}
                        onChange={emailChange}
                    />
                </label>

                <label className="">
                    Password:
                    <input
                        className="
                            border-2
                            border-grey-100
                            rounded-6
                            px-2
                            focus:outline-none
                            active:border-gray-400
                            focus:border-gray-400
                            w-full
                            "
                        type="password"
                        name="password"
                        value={password}
                        onChange={passwordChange}
                    />
                </label>
                <input className="mt-4 border-2 border-gray-200 px-3 py-1 rounded-[20px] w-full" type="submit"
                       value="Login" />
            </form>
        </div>
    );
}

