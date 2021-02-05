import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./todoList.scss";

const TodosList = (props) => {
  const [todoList, setTodoList] = useState([]);

  let mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      const fetchData = async () => {
        const result = await axios("http://localhost:4000/todos/");
        setTodoList([...result.data.data].reverse());
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const result = await axios("http://localhost:4000/todos/");
        setTodoList([...result.data.data].reverse());
      };
      fetchData();
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mounted = false;
    };
  }, []);

  return (
    <div>
      {todoList.reverse().map((todo, index) => (
        <div
          key={todo._id}
          className={`row  py-2 my-1 d-flex align-items-center  ${
            todo.todo_completed
              ? "completed"
              : index % 2 > 0
              ? "bg-light"
              : "bg-secondary"
          }`}
        >
          <div className="col-md-8 lead d-flex align-items-center  ">
            <p className="mr-2 text-muted badge m-0">{index + 1}.</p>
            {todo.todo_description}
          </div>
          <div className="col-md-2">
            {" "}
            <span className={`badge mr-2 ${todo.todo_priority.toLowerCase()} `}>
              {todo.todo_priority}
            </span>
            {todo.todo_completed ? (
              <span className={`badge bg-success`}>Completed</span>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-2">
            <Link className="nav-link my-0 py-0" to={`/edit/${todo._id}`}>
              <i className="fas fa-edit mr-2"></i>Edit
            </Link>
          </div>
        </div>
      ))}

      {
        //
        //
      }
    </div>
  );
};

export default TodosList;
