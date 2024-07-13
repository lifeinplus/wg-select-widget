import { Element } from "./Element";

export interface DialogProps {
    onCancel: () => void;
    onSave: (selectedElements: Element[]) => void;
    selectedElements: Element[];
}
