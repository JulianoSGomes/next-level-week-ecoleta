import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import { Home, CreatePoint } from "./pages";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} exact path="/" />
      <Route component={CreatePoint} path="/create-point" />
    </BrowserRouter>
  );
};

export default Routes;
