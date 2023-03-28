import React from "react";
import MainHeaderImage from "../components/main-header-image";
import MainMenu from "../components/main-menu";
import MainComponent from "../components/main-component";
import FooterComponent from "../components/footer";

const HomePage  = () => {
        return (
            <div>
                <MainHeaderImage />
                <MainMenu />
                <MainComponent />
                <FooterComponent />
            </div>
        );
}

export default HomePage;
