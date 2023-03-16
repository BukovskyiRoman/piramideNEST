import React from "react";

function MainMenu() {
        return (
            <div className="border-2 border-b-blue-200 p-2">
                <ul className="flex justify-items-start border-2 w-full px-2">
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">
                        <a href="/">Home</a>
                    </li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">
                        <a href="/profile">Profile</a>
                    </li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">
                        <a href="/about"> About </a>
                    </li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">
                        <a href="/chat">Chat</a>
                    </li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">
                        <a href="/news">News</a>
                    </li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">
                        <a href="/register">Register</a>
                    </li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">
                        <a href="/login">Login</a>
                    </li>
                </ul>
            </div>
        );
}

export default MainMenu
