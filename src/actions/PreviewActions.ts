import { SetStateAction } from "./FormAction";

type SetValueAction = {
    type: "SET_VALUE";
    id: number;
    value: string;
}

export type PreviewAction = SetValueAction | SetStateAction;