import React from 'react'
import MainHeaderImage from "../components/main-header-image";
import MainMenu from "../components/main-menu";
import FooterComponent from "../components/footer";
export default class AboutPage extends React.Component {
    render() {
        return (
            <div>
                <MainHeaderImage />
                <MainMenu />
                <div>
                    <h1>About page</h1>
                </div>
                <FooterComponent />
            </div>
        );
    }
}
