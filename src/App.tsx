import { FC } from "react";

import "./styles/App.css";
import "./styles/Dialog.css";

import ElementSelector from "./components/ElementSelector";

const App: FC = () => {
    return (
        <div className="App">
            <ElementSelector />
        </div>
    );
};

export default App;
