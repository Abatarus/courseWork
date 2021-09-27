import React, {useCallback, useContext} from "react";
import {useHttp}  from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CommentsList = ({comments, deleteList}, getTheme) => {
    const {request} = useHttp();
    const {token} = useContext(AuthContext);
    if (!comments.length) {
        return <p>No comments</p>
    }


    return (
        <ul className="Comment">
            { comments.map((comment, index) => {
                return (
                    <li id={comment._id} className="comment">{`user name: ${comment.userName}`}
                            {(deleteList[index] && <div className="delete_text" onClick={async () => {
                                try {
                                const data = await request(`/api/themes/deleteComment/${comment._id}`, "POST", null,{
                                    Authorization: `Bearer ${token}`
                                });
                                window.location.reload();
                                } catch (e) {}}}>delete</div>)}
                            <p>{comment.text}</p>
                    </li>
                )
            })}
        </ul>
    );
}