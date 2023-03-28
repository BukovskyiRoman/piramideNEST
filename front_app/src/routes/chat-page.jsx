import React from "react";
import MainHeaderImage from "../components/main-header-image";
import MainMenu from "../components/main-menu";
import FooterComponent from "../components/footer";

function ChatPage(props) {
    return (
        <div>
            <MainHeaderImage />
            <MainMenu />
            <div>
                <h1>Chat page</h1>
            </div>
            <FooterComponent />
        </div>
    );
}

export default ChatPage
