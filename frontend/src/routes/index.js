import React from "react";
import { Routes as Switch, Route } from "react-router";

import { Home } from "../pages";

const Routes = () => (
  <Switch>
    <Route
      path="/docs"
      component={(() => {
        window.location.replace(
          "https://documenter.getpostman.com/view/17016737/UzJFxJup"
        );
        return null;
      })()}
    />
    <Route path="/" exact element={<Home />} />
  </Switch>
);

export default Routes;
