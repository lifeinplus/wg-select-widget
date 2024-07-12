import { FC, useState } from "react";

import ElementModel from "../models/ElementModel";
import { Element } from "../types/Element";

const ElementSelector: FC = () => {
    const [elemets, setElemets] = useState<Element[]>([]);
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState(0);

    const filteredData = ElementModel.data;

    function handleChage(element: Element) {
        throw new Error("Function not implemented.");
    }

    return (
        <div>
            <h2>Select items</h2>
            <ul>
                {elemets.map((element) => (
                    <li key={element.id}>
                        {element.value}
                        <button
                            onClick={() => {
                                handleChage(element);
                            }}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
            <button
                className="change-button"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Change my choice
            </button>
            {open && (
                <div className="dialog">
                    <div className="dialog-content">
                        <div className="dialog-header">Select items</div>
                        <div className="dialog-body">
                            <div className="filter-group">
                                <div className="filter-item">
                                    <label htmlFor="search">Search</label>
                                    <input
                                        id="search"
                                        type="text"
                                        placeholder="Search"
                                        value={searchValue}
                                        onChange={(e) => {
                                            setSearchValue(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="filter-item">
                                    <label htmlFor="filter">Filter</label>
                                    <select
                                        id="filter"
                                        value={filterValue}
                                        onChange={(e) => {
                                            setFilterValue(
                                                Number(e.target.value)
                                            );
                                        }}
                                    >
                                        <option value={0}>No Filter</option>
                                        <option value={10}>{"> 10"}</option>
                                        <option value={50}>{"> 50"}</option>
                                        <option value={100}>{"> 100"}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="element-list">
                                {filteredData.map((element) => (
                                    <label
                                        key={element.id}
                                        className="element-item"
                                    >
                                        <input
                                            checked={true}
                                            onChange={() => {}}
                                            type="checkbox"
                                        />
                                        {element.value}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="dialog-footer">
                            <button
                                className="save-button"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                Save
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ElementSelector;
