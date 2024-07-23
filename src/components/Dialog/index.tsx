import { FC, memo, useState } from "react";

import useSelectedElements from "../../hooks/useSelectedElements";
import { Element } from "../../types/Element";
import SelectedElements from "../SelectedElements";
import ElementList from "./ElementList";
import FilterGroup from "./FilterGroup";

interface DialogProps {
    onClose: () => void;
}

const Dialog: FC<DialogProps> = ({ onClose }) => {
    const { selectedElements, setSelectedElements } = useSelectedElements();

    const [currentSelectedElements, setCurrentSelectedElements] =
        useState<Element[]>(selectedElements);

    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState(0);

    const handleSave = () => {
        setSelectedElements(currentSelectedElements);
        onClose();
    };

    const handleDelete = (element: Element) => {
        setCurrentSelectedElements((prevState) =>
            prevState.filter((item) => item.id !== element.id)
        );
    };

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
