import React from "react";

export default class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    componentDidMount() {
        fetch("http://107.23.119.30:5000/auth", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({ message: JSON.stringify(result) });
            });
    }

    render() {
        return (
            <div className="border-2 border-b-blue-200 p-2">
                <h1>Home page</h1>
                <p>{this.state.message}</p>
            </div>
        );
    }
}