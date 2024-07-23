import { ChangeEvent, Dispatch, FC, memo, SetStateAction } from "react";

interface FilterGroupProps {
    filterValue: number;
    setFilterValue: Dispatch<SetStateAction<number>>;
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

const FilterGroup: FC<FilterGroupProps> = ({
    filterValue,
    setFilterValue,
    searchValue,
    setSearchValue,
}) => {
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(Number(e.target.value));
    };

    return (
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
    );
};

export default memo(FilterGroup);
