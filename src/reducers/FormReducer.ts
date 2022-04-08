import { FormAction } from "../actions/FormAction";
import { formDataType, formFieldsType } from "../types/form";

export const FormReducer = (state: formDataType, action: FormAction): formDataType => {
    switch (action.type) {
        case "SET_TITLE":
            return {
                ...state,
                title: action.title
            }
        case "SET_VALUE":
            return {
                ...state,
                fields: state.fields.map((field) =>
                    field.id === action.id ? { ...field, label: action.value } : field
                ),
            };
        case "SET_OPTIONS":
            return {
                ...state,
                fields: state.fields.map((field) =>
                    field.id === action.id ? { ...field, options: action.options } : field
                ),
            };
        case "ADD_FIELD":
            if (action.formType === "select" || action.formType === "radio" || action.formType === "multi-select") {
                return {
                    ...state,
                    fields: [
                        ...state.fields,
                        {
                            kind: "dropdown",
                            id: Math.floor(Math.random() * 1000),
                            name: action.name,
                            label: action.label,
                            type: action.formType,
                            value: "",
                            options: [],
                        },
                    ],
                };
            } else {
                return {
                    ...state,
                    fields: [
                        ...state.fields,
                        {
                            kind: "text",
                            id: Math.floor(Math.random() * 1000),
                            name: action.name,
                            label: action.label,
                            type: action.formType,
                            value: "",
                        },
                    ],
                };
            }
        case "DELETE_FIELD":
            return {
                ...state,
                fields: state.fields.filter((field) => field.id !== action.id),
            };
        case "CLEAR_FIELDS":
            return {
                ...state,
                fields: state.fields.map((field: formFieldsType) => ({
                  ...field,
                  label: "",
                }))
            }
        default:
            return state;
    }
}