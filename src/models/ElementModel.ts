import { Element } from "../types/Element";

interface ElementModelProps {
    elements: Element[];
}

const ElementModel: ElementModelProps = {
    elements: Array.from({ length: 300 }, (_, index) => ({
        id: index + 1,
        value: `Element ${index + 1}`,
    })),
};

export default ElementModel;
