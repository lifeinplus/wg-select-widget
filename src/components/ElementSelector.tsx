import { FC, useState } from "react";
import { Element } from "../types/Element";
import Dialog from "./Dialog";
import SelectedElements from "./SelectedElements";

const ElementSelector: FC = () => {
    const [selectedElements, setSelectedElements] = useState<Element[]>([]);
    const [openDialog, setOpenDialog] = useState(false);

    const selectedElementsCount = selectedElements.length;
    const itemsText = selectedElementsCount === 1 ? "item" : "items";

    function handleCancel() {
        setOpenDialog(false);
    }

    function handleDelete(element: Element) {
        setSelectedElements((prevState) =>
            prevState.filter((item) => item.id !== element.id)
        );
    }

    function handleOpen() {
        setOpenDialog(true);
    }

    function handleSave(elements: Element[]) {
        setSelectedElements(elements);
        setOpenDialog(false);
    }

    return (
        <div>
            <h2>Select items</h2>
            <p>
                You currently have {selectedElementsCount} selected {itemsText}.
            </p>
            <SelectedElements
                onDelete={handleDelete}
                selectedElements={selectedElements}
            />
            <div className="row">
                <button className="btn btn-success" onClick={handleOpen}>
                    Change my choice
                </button>
            </div>
            {openDialog && (
                <Dialog
                    onCancel={handleCancel}
                    onSave={handleSave}
                    selectedElements={selectedElements}
                />
            )}
        </div>
    );
};

export default ElementSelector;
