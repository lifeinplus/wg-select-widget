import { Element } from "../types/Element";

const elements: Element[] = Array.from({ length: 300 }, (_, index) => ({
    id: index + 1,
    value: `Element ${index + 1}`,
}));

export default { elements };
