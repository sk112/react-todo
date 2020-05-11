import React, {Component} from 'react';
import './App.css';
import { Header } from './Header';
import TodoList from './TodoList';
import { TodoCreator } from './TodoCreator';
export default class App extends Component{
    constructor(props){
      super(props);
      this.state = {
         userName: "sam",
         todoItems: [
           {"item": "Todo Item1", "done": false},
           {"item": "Todo Item1", "done": false},
           {"item": "Todo Item1", "done": false},
         ], 
      }
    }

    componentDidMount = () => {
        let data = localStorage.getItem("todos");

        this.setState( data != null 
          ?  JSON.parse(data)
          : {
            userName: "sam",
            todoItems: [
              {"item": "Todo Item1", "done": false},
              {"item": "Todo Item2", "done": false},
              {"item": "Todo Item3", "done": false},
            ], 
         }
        )
    }

    updateTodoItem = (newItem) => {
      if(newItem != '' && this.state.todoItems.filter(item => item.name == newItem).length == 0){
        this.setState({todoItems: [...this.state.todoItems, {"item": newItem, "done": false}]}, () => localStorage.setItem("todos", JSON.stringify(this.state)))
      }
    }

    toggleItem = (toggledItem) => {
      this.setState(
        {
          todoItems: this.state.todoItems.map(item => item.item == toggledItem ? {...item, done: !item.done} : item)
        },() => localStorage.setItem("todos", JSON.stringify(this.state))
      )
    }


    toggleDelete = (deleteItem) => {
      this.setState({
        todoItems: this.state.todoItems.filter(item => item.item != deleteItem)
      }, () => localStorage.setItem("todos", JSON.stringify(this.state)))
    }

    render = () =>
    <div className="container-fluid">
    <Header name={this.state.userName} items={this.state.todoItems} />
    <div className="row">
      <div className="col-6">
      <div className="card">
        <div className="container">
          <TodoCreator callback={this.updateTodoItem} />
          <div className="row p-1">
            <div className="col-1">
              <div class="position-absolute input-group-text w-100 h-100">
              {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
              </div>
            </div>
            <div className="col-10 bg-primary text-white text-center p-1">
                  <b>TODO ITEM</b>
            </div>
            <div className="col-1"  style={{paddingLeft:'0px'}}>
              <div class="position-absolute input-group-text w-100 h-100" >
                {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
              </div>
            </div>
          </div> 
          <TodoList items={this.state.todoItems} callback={this.toggleItem} completed="false" nextaction="done"/>
          
        </div>
      </div>
      </div>
      <div className="col-6 border">
        <div className="card">
          <div className="container">
            <TodoList items={this.state.todoItems} callback={this.toggleDelete} completed="true" nextaction="delete"/>
            
          </div>
        </div>
      </div>
    </div>
    </div>
}

