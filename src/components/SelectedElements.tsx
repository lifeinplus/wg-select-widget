import { FC, memo } from "react";
import useSelectedElements from "../hooks/useSelectedElements";
import { Element } from "../types/Element";

interface SelectedElementsProps {
    onDelete?: (element: Element) => void;
    selectedElements?: Element[];
}

const SelectedElements: FC<SelectedElementsProps> = ({
    onDelete,
    selectedElements,
}) => {
    const context = useSelectedElements();
    const elements = selectedElements ?? context.selectedElements;

    const deleteElement = (element: Element) => {
        context.setSelectedElements((prevState) =>
            prevState.filter((item) => item.id !== element.id)
        );
    };

    const handleDelete = onDelete ?? deleteElement;

    return (
        <div className="selected-elements-container">
            {elements.map((element) => (
                <div key={element.id} className="selected-element">
                    <span className="selected-element-value">
                        {element.value}
                    </span>
                    <button
                        className="selected-element-delete"
                        onClick={() => {
                            handleDelete(element);
                        }}
                    >
                        x
                    </button>
                </div>
            ))}
        </div>
    );
};

export default memo(SelectedElements);
