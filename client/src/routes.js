import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {UserPage} from "./pages/UserPage";
import {AuthPage} from "./pages/AuthPage";
import {CreateThemePage} from "./pages/CreateThemePage";
import {ThemePage} from "./pages/ThemePage";
import {AllThemesPage} from "./pages/AllThemesPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/user" exact>
                    <UserPage />
                </Route>
                <Route path="/create" exact>
                    <CreateThemePage />
                </Route>
                <Route path="/theme/:id" exact>
                    <ThemePage />
                </Route>
                <Route path="/all" exact>
                    <AllThemesPage />
                </Route>
                <Redirect to="/user" />
            </Switch>
        );
    }

    return (
      <Switch>
          <Route path="/" exact>
              <AuthPage />
          </Route>
          <Redirect to="/" />
      </Switch>
    );
}