import { fieldType } from "./form";

export interface Field{
    name: string;
    addForm: boolean;
    type: fieldType;
}