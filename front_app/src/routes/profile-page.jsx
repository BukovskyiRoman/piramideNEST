import React, { useEffect, useState } from "react";
import MainHeaderImage from "../components/main-header-image";
import MainMenu from "../components/main-menu";
import { useSelector } from "react-redux";
import FooterComponent from "../components/footer";
import { useCookies } from 'react-cookie';

export default function ProfilePage() {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [balance, setBalance] = useState(0);
    const [email, setEmail] = useState(null);
    const [cookies] = useCookies(['user']);
    const { token } = cookies

    const jwt = useSelector(state => state.auth.token);

    useEffect(() => {
        console.log(token);
        const url = process.env.REACT_APP_BASE_URL;
        if (token) {
            fetch(`${url}/users/profile`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((response) => response.json()
                )
                .then((result) => {
                    setFirstName(result.first_name);
                    setLastName(result.last_name);
                    setBalance(result.balance);
                    setEmail(result.email);
                });
        }
    }, [jwt]);


    return (
        <div>
            <MainHeaderImage />
            <MainMenu />
            <div className="w-4/5 ml-auto mr-auto mt-2 items-center">
                {token && (
                    <div>
                        <h1 className="text-2xl text-blue-600">Profile</h1>
                        <div className="block mt-2">
                            <div>First name: {firstName}</div>
                            <div>Last name: {lastName}</div>
                            <div>Balance: {balance}</div>
                            <div>Email: {email}</div>
                        </div>
                    </div>
                )}
            </div>
            <FooterComponent />
        </div>
    );
}
