import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./constants";

export default function reducer(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                { id: action.payload.id, text: action.payload.text },
            ];
        case EDIT_TODO:
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, text: action.payload.text }
                    : todo
            );
        case DELETE_TODO:
            return state.filter((todo) => todo.id !== action.payload.id);
        default:
            return state;
    }
}
