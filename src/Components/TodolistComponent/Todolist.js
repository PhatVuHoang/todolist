import React, { Component } from "react";
import { Container } from "../Container/Container";
import { Dropdown } from "../ComponentsTodo/Dropdown";
import { ThemeProvider } from "styled-components";
import { TodolistDarkTheme } from "../../Themes/TodolistDarkTheme";
import { TodolistLightTheme } from "../../Themes/TodolistLightTheme";
import { TodolistPrimaryTheme } from "../../Themes/TodolistPrimaryTheme";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "../ComponentsTodo/Heading";
import { TextField, Label, Input } from "../ComponentsTodo/Textfield";
import { Button } from "../ComponentsTodo/Button";
import { Table, Thead, Tr, Td, Tbody, Th } from "../ComponentsTodo/Table";
import { connect } from "react-redux";
import {
  addTaskAction,
  changeThemeAction,
  deleteTaskAction,
  doneTaskAction,
  editTaskAction,
  redoTaskAction,
  updateTask,
} from "../../Redux/Actions/ToDoListActions";
import { arrTheme } from "../../Themes/ThemeManage";
import { EDIT_TASK } from "../../Redux/Actions/Types/ToDoListType";

class Todolist extends Component {
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                className="mr-2"
                onClick={() => {
                  this.setState(
                    {
                      disable: false,
                    },
                    () => {
                      this.props.dispatch(editTaskAction(task));
                    }
                  );
                }}
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                className="mr-2"
                onClick={() => {
                  this.props.dispatch(doneTaskAction(task.id));
                }}
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button
                className="mr-2"
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                className="mr-2"
                onClick={() => {
                  this.props.dispatch(redoTaskAction(task.id));
                }}
              >
                <i class="fa fa-redo"></i>
              </Button>
              <Button
                className="mr-2"
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return (
        <option key={index} value={theme.id}>
          {theme.name}
        </option>
      );
    });
  };
  // nh???n v??o props m???i ???????c th???c thi tr?????c render
  // componentWillReceiveProps(newProps) {
  //   console.log('this.props', this.props);
  //   console.log('newProps', newProps);
  //   this.setState({
  //     taskName: newProps.taskEdit.taskName,
  //   })
  // }

  //lifecycle t??nh kh??ng truy xu???t ???????c tr??? this
  // static getDerivedStateFromProps(newProps, currentState){
  //   //newProps: l?? props m???i, props c?? l?? this.props (kh??ng truy xu???t ???????c)
  //   // currentState: ???ng v???i state hi???n t???i this.state
  //   // ho???c tr??? v??? state m???i (this.state)
  //   let newState = {...currentState, taskName: newProps.taskEdit.taskName}
  //   return newState;

  //   //tr??? v??? null th?? state gi??? nguy??n
  //   //return null;
  // }

  state = {
    taskName: "",
    disable: true,
  };

  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              // dispatch value l??n reducer
              this.props.dispatch(changeThemeAction(value));
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading2>Todo list</Heading2>
          <TextField
            value={this.state.taskName}
            onChange={(e) => {
              // console.log(e.target);
              this.setState({
                taskName: e.target.value,
              });
            }}
            label="Task name"
            className="w-50"
          ></TextField>
          <Button
            onClick={() => {
              // l???y th??ng tin ng?????i d??ng nh???p v??o trong input
              let { taskName } = this.state;
              // t???o ra 1 task object
              let newTask = {
                id: Date.now(),
                taskName: taskName,
                done: false,
              };
              // ????a task object l??n redux th??ng qua ph????ng th???c dispatch
              this.props.dispatch(addTaskAction(newTask));
            }}
            className="ml-2"
          >
            <i className="fa fa-plus"></i> Add task
          </Button>
          {this.state.disabled ? (
            <Button
              disabled
              className="ml-2"
              onClick={() => {
                    this.props.dispatch(updateTask(this.state.taskName))
              }}
            >
              <i class="fa fa-upload"></i> Update task
            </Button>
          ) : (
            <Button
              
              className="ml-2"
              onClick={() => {
                let { taskName } = this.state;
                this.setState(
                  {
                    disable: true,
                    taskName: "",
                  },
                  () => {
                    this.props.dispatch(updateTask(taskName));
                  }
                );
              }}
            >
              <i class="fa fa-upload"></i> Update task
            </Button>
          )}

          <hr style={{ border: "1px solid #fff" }}></hr>
          <Heading3>Task todo</Heading3>
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>
          <Heading3>Task completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }

  //????y l?? lifecycle tr??? v??? props c?? v?? state c?? c???a component tr?????c khi render (lifecycle n??y ch???y sau render)
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};

export default connect(mapStateToProps)(Todolist);
