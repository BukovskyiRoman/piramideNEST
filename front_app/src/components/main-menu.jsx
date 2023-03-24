import React from "react";

function MainMenu() {
        return (
            <div className="border-b-2 border-b-gray-50-50 p-2">
                <ul className="flex justify-items-start w-full px-2">
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase border-r-2 mr-1">
                        <a href="/">Home</a>
                    </li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase border-r-2 mr-1">
                        <a href="/profile">Profile</a>
                    </li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase border-r-2 mr-1">
                        <a href="/about"> About </a>
                    </li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase border-r-2 mr-1">
                        <a href="/chat">Chat</a>
                    </li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase border-r-2 mr-1">
                        <a href="/news">News</a>
                    </li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase border-r-2 mr-1">
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
