import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoApp from "./pages/TodoApp";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoApp />}></Route>
            </Routes>
        </Router>
    );
}
