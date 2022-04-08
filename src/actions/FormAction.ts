import { fieldType } from "../types/form";

type SetValueAction = {
    type: "SET_VALUE";
    id: number;
    value: string;
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
    name: string;
    label: string;
    formType: fieldType;
}

type DeleteFieldAction = {
    type: "DELETE_FIELD";
    id: number;
}

type ClearFieldsAction = {
    type: "CLEAR_FIELDS";
}

export type FormAction = SetValueAction | SetOptionsAction | AddFieldAction | DeleteFieldAction | SetTitleAction | ClearFieldsAction;
