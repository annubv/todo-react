import React, { Component } from "react";
import "./App.css";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => this.setState({ todos: res.data }))
      .catch((err) => {
        console.log("An error occured while fetching todos ", err);
      });
  }

  //Toggle Complete Status
  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  //Delete Todo
  delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => {
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        });
      })
      .catch((err) => {
        console.log("An error occured while deleting the todo ", err);
      });
  };

  //Add Todo
  addTodo = (title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        completed: false,
      })
      .then((res) => {
        this.setState({ todos: [...this.state.todos, res.data] });
      })
      .catch((err) => {
        console.log("An error occured while adding the todo ", err);
      });
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route
            exact
            path="/"
            render={(props) => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  todos={this.state.todos}
                  toggleComplete={this.toggleComplete}
                  delTodo={this.delTodo}
                />
              </React.Fragment>
            )}
          ></Route>
          <Route path="/about" component={About}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
