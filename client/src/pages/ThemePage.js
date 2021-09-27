import React, {useState, useContext, useCallback, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {CommentsList} from "../components/CommentsList";

export const ThemePage = () => {
    const [theme, setThemes] = useState({Label: "", Text: ""});
    const [themeCanBeDeleted, setThemeCanBeDeleted] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsCanBeDeleted, setCommentsCanBeDeleted] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const themeId = useParams().id;
    const [form, setForm] = useState({
        userName: "", text: ""
    });
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const clearHendler = async () => {
        try {
            document.getElementById("userName").value = ""
            document.getElementById("text").value = ""
        } catch (e) {

        }
    }

    const createCommentHandler = async () => {
        try {
            const data = await request(`/api/themes/createComment/${themeId}`, "POST", {...form},{
                Authorization: `Bearer ${token}`
            });
            getTheme();
        } catch (e) {}
    }

    const getTheme = useCallback(async () => {
        try {
            const fetched = await request(`/api/themes/${themeId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setThemes(fetched.theme);
            setComments(fetched.comments);
            setThemeCanBeDeleted(fetched.thisIsThemeCreator);
            setCommentsCanBeDeleted(fetched.thisIsCommentsCreatorArray);
        } catch (e) {}
    }, [token, themeId, request])

    useEffect(() => {
        getTheme();
    }, [getTheme])

    if (loading) {
        return <h1>loading...</h1>
    }//
    return (

        <div>
            <div className="Theme"><h1>{theme.label}</h1>
            <p className="ThemeText">{theme.text}</p></div>

            <p className="EnterComment"><h3>Enter comment</h3>
            <input name="userName"
                   placeholder="user name"
                   id="userName"
                   type="text"
                   onChange={changeHandler}
            /></p>

            <p>
                <textarea
                    name="text"
                    cols="40" rows="3"
                    placeholder="comment"
                    id="text"
                    type="text"
                    onChange={changeHandler}/></p>
            <p><input type="submit"
                      value="Send"
                onClick={createCommentHandler}/>
                <input type="reset" value="Clear"
                onClick={clearHendler}/> </p>
            <div>{!loading && <CommentsList comments={comments} deleteList={commentsCanBeDeleted} getTheme={getTheme}/>}</div>
        </div>
    );
}