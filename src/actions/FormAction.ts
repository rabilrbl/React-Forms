import { fieldType, formDataType } from "../types/form";

type SetValueAction = {
    type: "SET_VALUE";
    id: number;
    value: string;
}

export type SetStateAction = {
    type: "SET_STATE";
    payload: formDataType;
}

type SetTitleAction = {
    type: "SET_TITLE";
    title: string;
}

type SetOptionsAction = {
    type: "SET_OPTIONS";
    id: number;
    options: string[];
}

type AddFieldAction = {
    type: "ADD_FIELD";
    label: string;
    formType: fieldType;
    formId: number;
    id: number;
}

type DeleteFieldAction = {
    type: "DELETE_FIELD";
    formId: number;
    id: number;
}

type ClearFieldsAction = {
    type: "CLEAR_FIELDS";
}

export type FormAction = SetValueAction | SetOptionsAction | AddFieldAction | DeleteFieldAction | SetTitleAction | ClearFieldsAction | SetStateAction;
