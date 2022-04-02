import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import ReactQuery from "./route/ReactQuery";
import ReduxQuery from "./route/ReduxQuery";
import "tachyons";
import App from "./container/App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";

// import Test from "./Test";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route index path="/" element={<App />} />
            <Route path="/react-query" element={<ReactQuery />} />
            <Route path="/redux-query" element={<ReduxQuery />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
