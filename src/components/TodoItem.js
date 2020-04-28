import React, { Component } from "react";
import PropTypes from "prop-types";

export class TodoItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      borderBottom: "1px dotted #ccc ",
      padding: "1rem",
      textDecoration: this.props.todo.completed ? "Line-through" : "none",
    };
  };

  render() {
    const { id, title } = this.props.todo;

    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            onChange={this.props.toggleComplete.bind(this, id)}
          />{" "}
          {title}
          <button onClick={this.props.delTodo.bind(this, id)} style={delBtn}>
            x
          </button>
        </p>
      </div>
    );
  }
}

const delBtn = {
  background: "#ff0000",
  border: "none",
  borderRadius: "50%",
  padding: "5px 9px",
  cursor: "pointer",
  color: "white",
  float: "right",
};

//PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};


export default TodoItem;
