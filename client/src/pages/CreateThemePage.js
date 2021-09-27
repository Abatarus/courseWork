import React, {useContext, useState} from "react"
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

export const CreateThemePage = () => {
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        label: "", text: ""
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }
    const createHandler = async () => {
        try {
            const data = await request("/api/themes/createTheme", "POST", {...form},
                {
                    Authorization: `Bearer ${auth.token}`
                });
            window.location.reload();
        } catch (e) {}
    }

    return (
        <div className="CreateTheme">
            <h1>Create theme</h1>
            <div>
                <div>
                    <input
                        placeholder="Enter theme label"
                        id="email"
                        type="text"
                        name="label"
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Enter text"
                        name="text"
                        cols="40"
                        rows="3"
                        onChange={changeHandler}/>
                </div>
            </div>
            <div>
                <button
                    className="btn"
                    onClick={createHandler}
                    disabled={loading}
                >
                    Create
                </button>
            </div>
        </div>
    );
}