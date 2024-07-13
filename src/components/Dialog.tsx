import { ChangeEvent, FC, useState } from "react";

import ElementModel from "../models/ElementModel";
import { DialogProps } from "../types/Dialog";
import { Element } from "../types/Element";

import SelectedElements from "./SelectedElements";

const Dialog: FC<DialogProps> = ({ onCancel, onSave, selectedElements }) => {
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

    function chageSelectedElements(element: Element) {
        setCurrentSelectedElements((prevState) => {
            if (prevState.includes(element)) {
                return prevState.filter((item) => item.id !== element.id);
            }

            if (prevState.length < 3) {
                return [...prevState, element];
            }

            return prevState;
        });
    }

    function handleDelete(element: Element) {
        setCurrentSelectedElements((prevState) =>
            prevState.filter((item) => item.id !== element.id)
        );
    }

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
        setFilterValue(Number(e.target.value));
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
                                        chageSelectedElements(element);
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
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            onSave(currentSelectedElements);
                        }}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            onCancel();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
