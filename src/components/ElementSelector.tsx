import { FC, memo, useCallback, useState } from "react";
import useSelectedElements from "../hooks/useSelectedElements";
import Dialog from "./Dialog";
import SelectedElements from "./SelectedElements";

const ElementSelector: FC = () => {
    const { selectedElements } = useSelectedElements();
    const [openDialog, setOpenDialog] = useState(false);

    const selectedElementsCount = selectedElements.length;
    const itemsText = selectedElementsCount === 1 ? "item" : "items";

    const handleClose = useCallback(() => {
        setOpenDialog(false);
    }, []);

    const handleOpen = useCallback(() => {
        setOpenDialog(true);
    }, []);

    return (
        <div>
            <h2>Select items</h2>
            <p>
                You currently have {selectedElementsCount} selected {itemsText}.
            </p>
            <SelectedElements />
            <div className="row">
                <button className="btn btn-success" onClick={handleOpen}>
                    Change my choice
                </button>
            </div>
            {openDialog && <Dialog onClose={handleClose} />}
        </div>
    );
};

export default memo(ElementSelector);
