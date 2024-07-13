import { FC } from "react";
import { SelectedElementsProps } from "../types/SelectedElements";

const SelectedElements: FC<SelectedElementsProps> = ({
    onDelete,
    selectedElements,
}) => {
    return (
        <div className="selected-elements-container">
            {selectedElements.map((element) => (
                <div key={element.id} className="selected-element">
                    <span className="selected-element-value">
                        {element.value}
                    </span>
                    <button
                        className="selected-element-delete"
                        onClick={() => {
                            onDelete(element);
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
