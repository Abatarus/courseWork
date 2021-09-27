import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {ThemesList} from "../components/ThemesList";
import {AuthContext} from "../context/AuthContext";

export const UserPage = () => {
    const [themes, setThemes] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchThemes = useCallback(async ()=> {
        try {
            const fetched = await request("/api/themes", "GET", null, {
               Authorization: `Bearer ${token}`
            });
            setThemes(fetched);
        }catch (e) {}
    }, [token, request]);

    useEffect( () => {
        fetchThemes();
    },[fetchThemes]);
    return (
        <>
            <h1>User page</h1>
            <button onClick={fetchThemes}>Update</button>
            {!loading && <ThemesList themes={themes} canBeDeleted={true}/>}
        </>
    );
}