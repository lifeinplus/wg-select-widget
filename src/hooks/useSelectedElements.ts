import { useContext } from "react";
import { SelectedElementsContext } from "../contexts/SelectedElementsProvider";

const useSelectedElements = () => {
    const context = useContext(SelectedElementsContext);

    if (!context) {
        throw new Error(
            "useSelectedElements must be used within a SelectedElementsProvider"
        );
    }

    return context;
};

export default useSelectedElements;
