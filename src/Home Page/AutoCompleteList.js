import React from 'react';

export default function AutoCompleteList(props) {
    return (
        <div className = "auto-list">
            <ul>
                {props.list.map((item, index) => <li key = {index} onClick = {() => props.submitCity(index)}>{item.LocalizedName + ", " + item.Country.LocalizedName}</li>)}
            </ul>
        </div>
    );
}