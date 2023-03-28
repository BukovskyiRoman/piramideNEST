import React from 'react'
import MainMenu from "../components/main-menu";
import MainHeaderImage from "../components/main-header-image";
import LoginForm from "../components/login-form";
import FooterComponent from "../components/footer";

const LoginPage = (props) => {
        return (
            <div>
                <MainHeaderImage />
                <MainMenu />
                <LoginForm />
                <FooterComponent />
            </div>
        );
    }
 export default LoginPage
