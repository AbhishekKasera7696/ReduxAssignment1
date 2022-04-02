import { useCallback, useEffect, useState } from "react";
// import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { updateTodos } from "../Redux/action";
import { Link } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const getTodos = () => {
    fetch(`http://localhost:3002/todos`)
      .then((res) => res.json())
      .then((res) => dispatch(updateTodos(res)));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleAdd = () => {
    const payload = {
      title,
      status: false,
    };

    fetch(`http://localhost:3002/todos`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    }).then(() => getTodos());
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "DELETE",
    }).then((res) => getTodos());
  };

  const handleToggle = (id, title) => {

    const fix = {
        title: title,
        id: id,
        status: true
    }

    fetch(`http://localhost:3002/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(fix),
      headers: {"content-type" : "application/json"}
  }).then((res) => getTodos());


}

  return (
   
      <div className="App">
        <input
          type="text"
          placeholder="Add task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAdd}>ADD</button>
        <hr />

        {todos.map((item) => (
          <div
            key={item.id}
            style={{ display: "flex", width: "50%", margin: "auto" }}
          >
            {item.title} - {item.status ? "Completed" : "Not Completed"}
            <button onClick={() => handleToggle(item.id, item.title)}>Toggle</button>
            {<Link to={`/todos/${item.id}`}>More Details</Link>}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
  
  );
};

export { Home };
