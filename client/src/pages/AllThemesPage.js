import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {ThemesList} from "../components/ThemesList";
import {AuthContext} from "../context/AuthContext";

export const AllThemesPage = () => {
    const [themes, setThemes] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchThemes = useCallback(async ()=> {
        try {
            const fetched = await request("/api/themes/allThemes", "GET", null, {
                Authorization: `Bearer ${token}`
            });
            setThemes(fetched);
        }catch (e) {

        }
    }, [token, request]);

    useEffect( () => {
        fetchThemes();
    },[fetchThemes]);
    return (
        <>
            <h1>All themes</h1>
            {!loading && <ThemesList themes={themes} canBeDeleted={false}/>}
            <button onClick={fetchThemes}>Update</button>
        </>
    );
}