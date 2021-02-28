import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import About from "./components/About/About";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import HomePage from "./components/Homepage/HomePage";
import Login from "./components/Login/Login";
import TodoItem from "./components/TodoItem/TodoItem";
import TodosList from "./components/TodosList/TodosList";
import { NavigationBar } from "./components/Utilities/NavigationBar";

import "./App.scss";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <NavigationBar />
      <div className="row p-md-5">
        <div className="mx-auto col-md-10 col-sm-12">
          <Route exact path="/">
            {!token ? <Redirect to="/login" /> : <TodosList />}
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/todos" component={TodosList} />
          <Route path="/edit/:id" component={TodoItem} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
  );
}

export default App;
