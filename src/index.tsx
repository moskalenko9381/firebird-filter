import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStoreAsync } from "./redux/config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

configureStoreAsync().then((result) => {
    const store = result;
    return root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
});
