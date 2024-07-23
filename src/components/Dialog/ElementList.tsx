import { Dispatch, FC, memo, SetStateAction, useMemo } from "react";
import { FixedSizeList } from "react-window";

import ElementModel from "../../models/ElementModel";
import { Element } from "../../types/Element";

interface ElementListProps {
    currentSelectedElements: Element[];
    setCurrentSelectedElements: Dispatch<SetStateAction<Element[]>>;
    filterValue: number;
    searchValue: string;
}

const ElementList: FC<ElementListProps> = ({
    currentSelectedElements,
    setCurrentSelectedElements,
    filterValue,
    searchValue,
}) => {
    const filteredElements = useMemo(() => {
        return ElementModel.elements.filter(({ id, value }) => {
            const matchesSearch = value
                .toUpperCase()
                .includes(searchValue.toUpperCase());
            return matchesSearch && id > filterValue;
        });
    }, [searchValue, filterValue]);

    const handleChange = (element: Element) => {
        if (currentSelectedElements.includes(element)) {
            setCurrentSelectedElements((prevState) =>
                prevState.filter((item) => item.id !== element.id)
            );
        } else if (currentSelectedElements.length < 3) {
            setCurrentSelectedElements((prevState) => [...prevState, element]);
        }
    };

    return (
        <FixedSizeList
            className="element-list"
            height={270}
            itemCount={filteredElements.length}
            itemSize={30}
            width={"100%"}
        >
            {({ index, style }) => {
                const element = filteredElements[index];

                return (
                    <label
                        key={element.id}
                        className="element-item"
                        style={style}
                    >
                        <input
                            id={String(element.id)}
                            checked={currentSelectedElements.includes(element)}
                            disabled={
                                currentSelectedElements.length >= 3 &&
                                !currentSelectedElements.includes(element)
                            }
                            className="element-input"
                            onChange={() => {
                                handleChange(element);
                            }}
                            type="checkbox"
                        />
                        {element.value}
                    </label>
                );
            }}
        </FixedSizeList>
    );
};

export default memo(ElementList);
