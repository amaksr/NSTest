enum Category {
    Cat1 = "Electronics",
    Cat2 = "Clothes",
    Cat3 = "Furniture",
    Cat4 = "Other",
}

interface HighValueItem {
    id: number;
    name: string;
    value: number;
    category?: Category;

}

export { Category };
export type { HighValueItem };
