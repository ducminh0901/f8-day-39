import { useDispatch, useSelector } from "@/libs/react-redux";
import { useState } from "react";
import { ADD_TODO, EDIT_TODO, DELETE_TODO } from "../../store/constants";

export default function TodoApp() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state);

    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = input.trim();

        if (!value) {
            setError("Please enter a todo item");
            return;
        }

        dispatch({
            type: ADD_TODO,
            payload: {
                id: Date.now(),
                text: value,
            },
        });

        setInput("");
        setError("");
    };

    const handleEdit = (id, oldText) => {
        const updated = prompt("Edit todo", oldText);
        if (updated === null) return;
        dispatch({ type: EDIT_TODO, payload: { id, text: updated } });
    };

    const handleDelete = (id) => {
        const ok = confirm("Are you sure you want to delete this todo?");
        if (!ok) return;
        dispatch({ type: DELETE_TODO, payload: { id } });
    };

    return (
        <div style={{ padding: 20, maxWidth: 400 }}>
            <h1>Todo App</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    placeholder="Enter your todo..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ width: "100%", padding: 8 }}
                />
                {error && <p style={{ color: "red", marginTop: 6 }}>{error}</p>}
                <button style={{ marginTop: 10 }}>Add Todo</button>
            </form>

            {todos.length === 0 ? (
                <p>The todo list is empty.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            style={{
                                marginBottom: 10,
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>{todo.text}</span>
                            <span>
                                <button
                                    onClick={() =>
                                        handleEdit(todo.id, todo.text)
                                    }
                                    style={{ marginRight: 6 }}
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(todo.id)}>
                                    Delete
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
