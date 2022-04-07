import { fieldType } from "../types/form";

type SetNameAction = {
    type: "SET_NAME"
    name: string;
}

type SetToggleAdd = {
    type: "TOGGLE_ADD"
}

type SetFieldType = {
    type: "SET_TYPE"
    fieldType: fieldType;
}

export type FieldAction = SetNameAction | SetToggleAdd | SetFieldType;