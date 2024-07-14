import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import SelectedElementsProvider from "./contexts/SelectedElementsProvider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <SelectedElementsProvider>
            <App />
        </SelectedElementsProvider>
    </React.StrictMode>
);
