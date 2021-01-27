import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import About from "./components/About/About";
import CreateTodo from "./components/CreateTodo/CreateTodo";

import TodoItem from "./components/TodoItem/TodoItem";
import TodosList from "./components/TodosList/TodosList";
import { NavigationBar } from "./components/Utilities/NavigationBar";

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container p-5">
        <Route path="/" exact component={() => <TodosList />} />
        <Route path="/edit/:id" component={TodoItem} />
        <Route path="/create" component={() => <CreateTodo />} />
        <Route path="/about" component={() => <About />} />
      </div>
    </Router>
  );
}

export default App;
