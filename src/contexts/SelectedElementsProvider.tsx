import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    useState,
} from "react";

import { Element } from "../types/Element";

interface Props {
    selectedElements: Element[];
    setSelectedElements: Dispatch<SetStateAction<Element[]>>;
}

export const SelectedElementsContext = createContext<Props | undefined>(
    undefined
);

const SelectedElementsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [selectedElements, setSelectedElements] = useState<Element[]>([]);

    return (
        <SelectedElementsContext.Provider
            value={{ selectedElements, setSelectedElements }}
        >
            {children}
        </SelectedElementsContext.Provider>
    );
};

export default SelectedElementsProvider;