import React from "react";
import { Routes as Switch, Route } from "react-router";

import { Home } from "../pages";

const Redirect = () =>
  (window.location.href =
    "https://documenter.getpostman.com/view/17016737/UzJFxJup");

const Routes = () => (
  <Switch>
    <Route path="/" exact element={<Home />} />

    <Route path="/docs" exact element={<Redirect />} />
  </Switch>
);

export default Routes;
