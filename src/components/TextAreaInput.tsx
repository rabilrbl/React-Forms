import React from 'react';

export default function TextAreaInput(props:{
    fieldId: number;
    fieldName: string;
    fieldValue: string;
    fieldLabel: string;
    setValueCB: (id: number, value: string) => void;
}) {
    return (
        <div>
            <label className="text-lg font-semibold" htmlFor={props.fieldName}>
                {props.fieldLabel}
            </label>
            <br />
            <textarea
                className="w-full min-w-fit border border-blue-500 px-2 py-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                id={props.fieldId.toString()}
                name={props.fieldName}
                value={props.fieldValue}
                onChange={(e) => {
                    props.setValueCB(props.fieldId, e.target.value);
                }}
            />
        </div>
    );
}