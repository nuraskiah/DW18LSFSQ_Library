import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ListTodo from '../components/ListTodo';

export default class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };

    this.todoInput = '';
  }

  addToDo() {
    let newTodo = this.todoInput.value;

    this.setState({
      todos: [...this.state.todos, newTodo],
    });

    this.todoInput.value = '';
    this.todoInput.focus();
  }

  removeTodo(id) {
    let todos = this.state.todos.filter((todo, index) => id !== index);
    this.setState({
      todos,
    });
  }

  render() {
    return (
      <div className="todo">
        <h1>Todo App</h1>
        <h2>List</h2>
        <input
          type="text"
          placeholder="Add task..."
          ref={(input) => (this.todoInput = input)}
        />
        <Button variant="primary" onClick={this.addToDo.bind(this)}>
          Add
        </Button>
        <Button variant="secondary">Secondary</Button>{' '}
        <p>Task to do: {this.state.todos.length}</p>
        <ul>
          {this.state.todos.map((todo, index) => {
            return (
              <ListTodo
                id={index}
                key={index}
                todo={todo}
                onRemove={() => this.removeTodo(index)}
              />
            );
          })}
        </ul>
        <Button variant="warning">Warning</Button>{' '}
      </div>
    );
  }
}
