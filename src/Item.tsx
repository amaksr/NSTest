import React from 'react'
import './App.css'
import { HighValueItem } from './HighValueItem';
import { formatCurrency } from './Utils';

interface HighValueItemProps {
    hvitem: HighValueItem;
    onDelete: (itemId: number) => void;
    onChange: (itemId: number) => void;
}
const Item: React.FC<HighValueItemProps> = ({ hvitem, onDelete, onChange }) => {

    return (
        <tr className="hv-item">
            <td className="hv-item-col">{hvitem.name}</td>
            <td className="hv-item-col">{formatCurrency(hvitem.value)}</td>
            <td className="hv-item-col"><button onClick={() => onDelete(hvitem.id)}>Delete</button></td>
        </tr>
    );
}
export default Item;