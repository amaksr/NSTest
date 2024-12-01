import { useEffect, useState } from "react";
import { Category, HighValueItem } from "./HighValueItem";
import Item from "./Item";
import { formatCurrency } from "./Utils";

const ItemList: React.FC = () => {
    const [items, setItems] = useState<HighValueItem[]>([]);
    const [newItemName, setNewItemName] = useState<string>('');
    const [newItemValue, setNewItemValue] = useState<number>(0);
    const defaultCat = "";

    const [newItemCategory, setNewItemCategory] = useState<string>(defaultCat);

    const addItem = () => {
        if (newItemName.trim()) {
            const newItem: HighValueItem = {
                id: Date.now(),
                name: newItemName,
                value: newItemValue,
                category: newItemCategory as Category
            };
            const newItems = [...items, newItem];
            setItems(newItems);
            localStorage.setItem("items", JSON.stringify(newItems));
            setNewItemName(''); 
            setNewItemValue(0);
            setNewItemCategory(defaultCat);
        }
    };

    const deleteItem = (itemId: number) => {
        const newItems = items.filter(item => item.id !== itemId);
        localStorage.setItem("items", JSON.stringify(newItems));
        setItems(newItems);
    };

    const changeItem = (itemId: number) => {
        console.log("changeItem", itemId, items[itemId]);
    };

    useEffect(() => {
        console.log("loading")

        const value = localStorage.getItem("items");

        if (!value) return;

        setItems(JSON.parse(value));
    }, []);

    return (
        <div className="hwitem-list">
            <h1>High Value Item List</h1>
            <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Add a new item name"
            />
            <input
                type="number"
                value={newItemValue}
                onChange={(e) => setNewItemValue(Number.parseFloat( e.target.value ))}
            />
            <select
                value={newItemCategory}
                onChange={(e) => { setNewItemCategory(e.target.value) }}
            >
                <option key=""></option>
                {Object.keys(Category).map((v, i) => <option key={i} value={v}>{Category[v as keyof typeof Category]}</option>)}
            </select>

            <button onClick={addItem} disabled={(newItemCategory && newItemName) ? false:true } >Add Item</button>

            <div className="hvitem-list">
                {
                    Object.entries(Category).sort((a, b) => a[1].localeCompare(b[1])).map(cat => {
                        const catKey = cat[0];
                        const catVal = cat[1];
                        const subset = items.filter(e => e.category === catKey);
                        return subset.length > 0
                            &&
                            <div key={catKey} >
                                <h2>{catVal}</h2>
                                <table>
                                    <tbody>
                                        {subset.map(item => <Item key={item.id}
                                            hvitem={item}
                                            onDelete={deleteItem}
                                            onChange={changeItem}
                                        ></Item>)}
                                    </tbody>
                                </table>
                                <h2>Total: { formatCurrency(subset.map(i => i.value).reduce((partialSum, a) => partialSum + a, 0)) }</h2>
                            </div>
                    })
                }
                <h1>Total Value: {formatCurrency( items.map(i => i.value).reduce((partialSum, a) => partialSum + a, 0) ) }</h1>
            </div>

        </div>
    );
};

export default ItemList;