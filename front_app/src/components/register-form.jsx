import React from "react";

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            success: false,
            errorMessage: ""
        };

        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.firstNameChange = this.firstNameChange.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    firstNameChange(event) {
        this.setState({ first_name: event.target.value });
    }

    lastNameChange(event) {
        this.setState({ last_name: event.target.value });
    }

    emailChange(event) {
        this.setState({ email: event.target.value });
    }

    passwordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        const url = 'http://localhost:5000'
        //const url = " 107.23.119.30:5000"
        fetch(url + "/auth/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name
            })
        })
            .then((response) => response.json()
            )
            .then((result) => {
                console.log(result);
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="w-full mt-4">
                <form
                    className="bg-white ml-auto mr-auto w-[30%] mt-8 px-8 py-4 rounded-lg"
                    onSubmit={this.handleSubmit}
                >
                    <label className="">
                        First name:
                        <input
                            className="
                            border-2
                            border-grey-100
                            rounded-6
                            px-2
                            focus:outline-none
                            active:border-gray-400
                            focus:border-gray-400
                            w-full
                            "
                            type="text"
                            name="first_name"
                            value={this.state.first_name}
                            onChange={this.firstNameChange}
                        />
                    </label>
                    <label className="">
                        Last name:
                        <input
                            className="
                            border-2
                            border-grey-100
                            rounded-6
                            px-2
                            focus:outline-none
                            active:border-gray-400
                            focus:border-gray-400
                            w-full
                            "
                            type="text"
                            name="last_name"
                            value={this.state.last_name}
                            onChange={this.lastNameChange}
                        />
                    </label>
                    <label className="">
                        Email:
                        <input
                            className="
                            border-2
                            border-grey-100
                            active:border-black-600
                            focus:outline-none
                            rounded-6 px-2
                            active:border-gray-400
                            focus:border-gray-400
                            w-full
                            "
                            type="text"
                            name="username"
                            value={this.state.email}
                            onChange={this.emailChange}
                        />
                    </label>

                    <label className="">
                        Password:
                        <input
                            className="
                            border-2
                            border-grey-100
                            rounded-6
                            px-2
                            focus:outline-none
                            active:border-gray-400
                            focus:border-gray-400
                            w-full
                            "
                            type="text"
                            name="password"
                            value={this.state.password}
                            onChange={this.passwordChange}
                        />
                    </label>
                    <input className="mt-4 border-2 border-gray-200 px-3 py-1 rounded-[20px] w-full" type="submit"
                           value="Register" />
                </form>
            </div>
        );
    }
}
