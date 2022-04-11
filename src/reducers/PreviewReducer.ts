import { PreviewAction } from "../actions/PreviewActions";
import { formDataType } from "../types/form"

export const PreviewReducer = (state: formDataType, action: PreviewAction) => {
    switch (action.type) {
      case "SET_STATE":
        return {
          ...action.payload
      };
        case "SET_VALUE":
            return {
                ...state,
                fields: [
                  ...state.fields.map((field) => {
                    if (field.id === action.id) {
                      return { ...field, value: action.value };
                    }
                    return field;
                  }),
                ],
              }
        default:
            return state;
    }
}