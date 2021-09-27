import React, {useState, useContext} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";


export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }
    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form});
            console.log("Data", data);
            //message(data.message);
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {

            const data = await request("/api/auth/login", "POST", {...form});
            console.log("Data", data);
            auth.login(data.token, data.userId);
        } catch (e) {

        }
    }
    return (
        <div className="Auth">
            <h1>Our forum</h1>
            <div>
                <span>Authorise your account </span>
                <div>
                    <input
                        placeholder="Enter email"
                        id="email"
                        type="text"
                        name="email"
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        placeholder="Enter password"
                        id="password"
                        type="password"
                        name="password"
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <div>
                <button
                    className="btn"
                    onClick={loginHandler}
                    disabled={loading}
                >
                    Enter
                </button>
                <button
                    className="btn"
                    onClick={registerHandler}
                    disabled={loading}
                >
                    Register
                </button>
            </div>
        </div>
    );
}