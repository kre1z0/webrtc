import React from "react";
/** https://reacttraining.com/react-router/web/guides/quick-start **/
import { BrowserRouter, Route } from "react-router-dom";

export default (
  <BrowserRouter>
    <App>
      <Route exact path="/" render={() => <div>Hello world!!!!</div>} />
    </App>
  </BrowserRouter>
);
