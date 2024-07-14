import { Element } from "../types/Element";

interface Props {
    elements: Element[];
}

const ElementModel: Props = {
    elements: Array.from({ length: 300 }, (_, index) => ({
        id: index + 1,
        value: `Element ${index + 1}`,
    })),
};

export default ElementModel;
