import { FC } from "react";
import useSelectedElements from "../hooks/useSelectedElements";
import { Element } from "../types/Element";

interface Props {
    onDelete?: (element: Element) => void;
    selectedElements?: Element[];
}

const SelectedElements: FC<Props> = ({ onDelete, selectedElements }) => {
    const context = useSelectedElements();
    const elements = selectedElements ?? context.selectedElements;
    const deleteElement = onDelete ?? handleDelete;

    function handleDelete(element: Element) {
        context.setSelectedElements((prevState) =>
            prevState.filter((item) => item.id !== element.id)
        );
    }

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
                            deleteElement(element);
                        }}
                    >
                        x
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SelectedElements;
