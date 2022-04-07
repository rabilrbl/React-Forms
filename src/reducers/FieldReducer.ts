import { FieldAction } from "../actions/FieldAction";
import { Field } from "../types/field";

export const FieldReducer = (state: Field, action: FieldAction) => {
    switch (action.type) {
        case "SET_NAME":
            return {
                ...state,
                name: action.name
            };
        case "TOGGLE_ADD":
            return {
                ...state,
                addForm: !state.addForm
            };
        case "SET_TYPE":
            return {
                ...state,
                type: action.fieldType
            };
    }
    };
