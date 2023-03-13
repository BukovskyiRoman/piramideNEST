import React from 'react'
export default class MainMenu extends React.Component {
    render() {
        return (
            <div className="border-2 border-b-blue-200 p-2">
                <ul className="flex justify-items-start border-2 border-amber-200 w-full px-2">
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">Home</li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">Profile</li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">About</li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">Chat</li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">Register</li>
                    <li className="text-2xl inline pr-2 text-blue-500 uppercase">Login</li>
                </ul>
            </div>
        );
    }
}
