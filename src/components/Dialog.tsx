import { ChangeEvent, FC, useState } from "react";

import useSelectedElements from "../hooks/useSelectedElements";
import ElementModel from "../models/ElementModel";
import { Element } from "../types/Element";

import SelectedElements from "./SelectedElements";

interface Props {
    onClose: () => void;
}

const Dialog: FC<Props> = ({ onClose }) => {
    const { selectedElements, setSelectedElements } = useSelectedElements();

    const [currentSelectedElements, setCurrentSelectedElements] =
        useState<Element[]>(selectedElements);

    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState(0);

    const filteredElements = ElementModel.elements.filter(({ id, value }) => {
        const matchesSearch = value
            .toUpperCase()
            .includes(searchValue.toUpperCase());
        return matchesSearch && id > filterValue;
    });

    function handleChange(element: Element) {
        if (currentSelectedElements.includes(element)) {
            handleDelete(element);
        } else if (currentSelectedElements.length < 3) {
            setCurrentSelectedElements((prevState) => [...prevState, element]);
        }
    }

    function handleDelete(element: Element) {
        setCurrentSelectedElements((prevState) =>
            prevState.filter((item) => item.id !== element.id)
        );
    }

    function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
        setFilterValue(Number(e.target.value));
    }

    function handleSave() {
        setSelectedElements(currentSelectedElements);
        onClose();
    }

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    return (
        <div className="dialog">
            <div className="dialog-content">
                <div className="dialog-header">Select items</div>
                <div className="dialog-body">
                    <div className="filter-group">
                        <div className="filter-item">
                            <label htmlFor="search">Search</label>
                            <input
                                id="search"
                                className="input-search"
                                onChange={handleSearch}
                                placeholder="Search"
                                type="text"
                                value={searchValue}
                            />
                        </div>
                        <div className="filter-item">
                            <label htmlFor="filter">Filter</label>
                            <select
                                id="filter"
                                className="select-filter"
                                onChange={handleFilter}
                                value={filterValue}
                            >
                                <option value={0}>No Filter</option>
                                <option value={10}>{"> 10"}</option>
                                <option value={50}>{"> 50"}</option>
                                <option value={100}>{"> 100"}</option>
                                <option value={200}>{"> 200"}</option>
                            </select>
                        </div>
                    </div>
                    <div className="element-list">
                        {filteredElements.map((element) => (
                            <label key={element.id} className="element-item">
                                <input
                                    checked={currentSelectedElements.includes(
                                        element
                                    )}
                                    disabled={
                                        currentSelectedElements.length >= 3 &&
                                        !currentSelectedElements.includes(
                                            element
                                        )
                                    }
                                    className="element-input"
                                    onChange={() => {
                                        handleChange(element);
                                    }}
                                    type="checkbox"
                                />
                                {element.value}
                            </label>
                        ))}
                    </div>
                </div>
                <p>Current selected items:</p>
                <SelectedElements
                    onDelete={handleDelete}
                    selectedElements={currentSelectedElements}
                />
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

export default Dialog;
