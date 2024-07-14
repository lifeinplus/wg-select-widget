import { FC, memo, useCallback, useState } from "react";

import useSelectedElements from "../../hooks/useSelectedElements";
import { Element } from "../../types/Element";
import SelectedElements from "../SelectedElements";
import ElementList from "./ElementList";
import FilterGroup from "./FilterGroup";

interface Props {
    onClose: () => void;
}

const Dialog: FC<Props> = ({ onClose }) => {
    const { selectedElements, setSelectedElements } = useSelectedElements();

    const [currentSelectedElements, setCurrentSelectedElements] =
        useState<Element[]>(selectedElements);

    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState(0);

    const handleSave = useCallback(() => {
        setSelectedElements(currentSelectedElements);
        onClose();
    }, [currentSelectedElements, onClose, setSelectedElements]);

    const handleDelete = useCallback((element: Element) => {
        setCurrentSelectedElements((prevState) =>
            prevState.filter((item) => item.id !== element.id)
        );
    }, []);

    return (
        <div className="dialog">
            <div className="dialog-content">
                <div className="dialog-header">Select items</div>
                <div className="dialog-body">
                    <FilterGroup
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
                    <ElementList
                        currentSelectedElements={currentSelectedElements}
                        setCurrentSelectedElements={setCurrentSelectedElements}
                        filterValue={filterValue}
                        searchValue={searchValue}
                    />
                    <p>Current selected items:</p>
                    <SelectedElements
                        onDelete={handleDelete}
                        selectedElements={currentSelectedElements}
                    />
                </div>
                <div className="dialog-footer">
                    <button className="btn btn-success" onClick={handleSave}>
                        Save
                    </button>
                    <button className="btn btn-danger" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(Dialog);
