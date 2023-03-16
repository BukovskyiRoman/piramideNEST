import React from 'react'
import MainMenu from "../components/main-menu";
import MainHeaderImage from "../components/main-header-image";
import LoginForm from "../components/login-form";

export default function LoginPage(props) {
        return (
            <div>
                <MainHeaderImage />
                <MainMenu />
                <LoginForm />
            </div>
        );
    }
