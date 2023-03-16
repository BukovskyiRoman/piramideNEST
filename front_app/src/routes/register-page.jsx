import React from 'react'
import MainMenu from "../components/main-menu";
import MainHeaderImage from "../components/main-header-image";
import RegisterForm from "../components/register-form";

export default class RegisterPage extends React.Component {
    render() {

        return (
            <div>
                <MainHeaderImage />
                <MainMenu />
                <RegisterForm />
            </div>
        );
    }
}
