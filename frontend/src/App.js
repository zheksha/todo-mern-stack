import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "./App.scss";
import About from "./components/About/About";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import HomePage from "./components/Homepage/HomePage";
import Login from "./components/Login/Login";

import TodoItem from "./components/TodoItem/TodoItem";
import TodosList from "./components/TodosList/TodosList";
import { NavigationBar } from "./components/Utilities/NavigationBar";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <NavigationBar />
      <div className="container p-5">
        <Route exact path="/">
          {!token ? <Redirect to="/login" /> : <HomePage />}
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/todos" component={TodosList} />
        <Route path="/edit/:id" component={TodoItem} />
        <Route path="/create" component={CreateTodo} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

export default App;
