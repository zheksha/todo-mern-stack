import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import jwt_decode from "jwt-decode";
import "./todoList.scss";
import TaskBlock from "./TaskBlock";

const TodosList = (props) => {
  const [todoList, setTodoList] = useState([]);

  const { user } = jwt_decode(localStorage.getItem("token"));

  const config = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
      "content-type": "application/json",
    },
  };

  let mounted = useRef();

  useEffect(() => {
    // console.log(config);
    if (!mounted.current) {
      const fetchData = async () => {
        const result = await axios.post(
          "/todos/",
          JSON.stringify({ todo_user: user.id }),
          config
        );
        setTodoList([...result.data.data]);
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
      <p className="badge bg-warning">
        <i className="fas fa-close mr-1"></i>Uncompleted Tasks
      </p>

      {todoList.reverse().map((todo, index) => (
        <div key={index}>
          {!todo.todo_completed ? <TaskBlock todo={todo} /> : ""}
        </div>
      ))}
      <hr />
      <p className="badge bg-success">
        <i className="fas fa-check mr-1"></i>Completed Tasks
      </p>
      {todoList.reverse().map((todo, index) => (
        <div key={index}>
          {todo.todo_completed ? <TaskBlock todo={todo} /> : ""}
        </div>
      ))}
    </div>
  );
};

export default TodosList;
