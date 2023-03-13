import React from 'react'
import MainMenu from "./main-menu";
import MainHeaderImage from "./main-header-image";
import LoginForm from "./login-form";

export default class MainComponent extends React.Component {
    render() {
        return (
            <div className="bg-blue-100 h-screen w-2/3 ml-auto mr-auto">
                <MainHeaderImage />
                <MainMenu />
                <LoginForm />
            </div>
        );
    }
}
