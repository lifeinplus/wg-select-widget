import { Element } from "./Element";

export interface SelectedElementsProps {
    onDelete: (element: Element) => void;
    selectedElements: Element[];
}
