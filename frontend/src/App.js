/**
 * FIXME:
 * 
 * Handle Duplicate data.
 */


import React, {Component} from 'react';
import './App.css';
import { Header } from './Header';
import TodoList from './TodoList';
import { TodoCreator } from './TodoCreator';
export default class App extends Component{
    constructor(props){
      super(props);
       this.state = {
         userName: 'sam',
         todoItems: []

       }

       let that = this;
       fetch("http://localhost:8000/api/task-list/").then(response => response.json()).then(data => {
       that.state = {
         userName: 'sam',
         todoItems: [...data]
       }
      })

    }

    componentDidMount = () => {
        
        let that = this;
        fetch("http://localhost:8000/api/task-list/").then(response => response.json()).then(data => {
        console.log(data)
          that.setState({
            todoItems: [...data] 
          }) 
        })
    }

    updateTodoItem = (newItem) => {
      if(newItem != '' && this.state.todoItems.filter(item => item.item == newItem).length == 0){

        let that = this;
        fetch("http://localhost:8000/api/task-create/", {
          method: "POST",
           body: JSON.stringify({
            "item": newItem,
            "done": false
           }),
           headers: { 
             "Content-Type": "application/json" 
           }
      }).then(res => res.json())
        .then(data => {
          console.log(data)
          that.setState({
            todoItems: [...this.state.todoItems, data]
          })
        })
      }
    }

    toggleItem = (toggledItem) => {

      this.setState(
        {
          todoItems: this.state.todoItems.map(item => item.item == toggledItem ? {...item, done: !item.done} : item)
        },() => {
          fetch("http://localhost:8000/api/task-update/", {
            method: "POST",
            body: JSON.stringify({
              "item": toggledItem,
              "done": true
            }),
            headers: { 
             "Content-Type": "application/json" 
           }
          }).then(res => res.json()).then(data => console.log(data)) 
        })
      
    }


    toggleDelete = (deleteItem) => {
      this.setState({
        todoItems: this.state.todoItems.filter(item => item.item != deleteItem)
      }, () => {
        fetch("http://localhost:8000/api/task-delete/", {
          method: "DELETE",
          body: JSON.stringify({
            "item": deleteItem,
          }),
          headers: { 
            "Content-Type": "application/json" 
          }
        }).then(res => res.json()).then(data => console.log(data)) 
      })
    }

    render = () =>
    <div className="container-fluid">
    <Header name={this.state.userName} items={this.state.todoItems} />
    <div className="row">
      <div className="col-6">
      <div className="card">
        <div className="container">
          <TodoCreator callback={this.updateTodoItem} items={this.state.todoItems}/>
          <div className="p-1" style={{display:'flex', flexDirection:'row'}}>
            <div style={{flex:'1'}}>
                <div class="input-group-text h-100">
                  {/* <input type="checkbox" aria-label="Checkbox for following text input" />  */}
                </div>
              </div>
              <div className="bg-primary text-center text-white" style={{flex:'8'}}>
                    <b>TODO ITEM</b>
              </div>
              <div className=""  style={{flex:'1',paddingLeft:'0px'}}>
                <div class="input-group-text h-100" >
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
           <div className="p-1" style={{display:'flex', flexDirection:'row'}}>
             <div style={{flex:'1'}}>
                 <div class="input-group-text h-100">
                   {/* <input type="checkbox" aria-label="Checkbox for following text input" />  */}
                </div>
              </div>
              <div className="bg-primary text-center text-white" style={{flex:'8'}}>
                    <b>COMPLETED ITEM</b>
              </div>
              <div className=""  style={{flex:'1',paddingLeft:'0px'}}>
                <div class="input-group-text h-100" >
                  {/* <input type="checkbox" aria-label="Checkbox for following text input" /> */}
                </div>
              </div>
            </div>
            <TodoList items={this.state.todoItems} callback={this.toggleDelete} completed="true" nextaction="delete"/>
            
          </div>
        </div>
      </div>
    </div>
    </div>
}

