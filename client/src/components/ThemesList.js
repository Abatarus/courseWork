import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const ThemesList = ({themes, canBeDeleted}) => {
    const {request} = useHttp();
    const {token} = useContext(AuthContext);
    if (!themes.length) {
        return <p>No themes</p>
    }

    return (
      <table className="ThemeTable">
          <tr><th>Theme</th></tr>
          { themes.map((theme, index) => {
              return (
                  <tr>
                      <th><Link to={`/theme/${theme._id}`}>{theme.label}</Link></th>
                      {canBeDeleted && <th><div className="delete_text" onClick={async () => {
                      try {
                          const data = await request(`/api/themes/deleteTheme/${theme._id}`, "POST", null,{
                              Authorization: `Bearer ${token}`
                          });
                          window.location.reload();
                      } catch (e) {}}}>delete</div></th>}
                  </tr>
              )
          })}
      </table>
    );
}