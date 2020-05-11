import React, { Component } from 'react';

export class TodoCreator extends Component{

    constructor(props){
        super(props);
        this.state = {
            newItem: ''
        }
        this.inputTextRef = React.createRef();
    }

    updateTodoItem = (event) => {
        this.setState({
            newItem: event.target.value
        })
    }

    onKeyDownHandler = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            this.props.callback(e.target.value);
            this.inputTextRef.current.value = '';
            this.inputTextRef.current.focus();
        }

    }


    render = () =>
        <div className="row p-1"> 
            <div className="col-1">
                <div class="input-group">
                    <button class="btn btn-outline-secondary bg-primary text-white" type="button" onClick={this.clickHandler}>Add</button>
                </div>
            </div>
            <div className="col-11">
                <input type="text" class="form-control" ref={this.inputTextRef} placeholder="Todo Item Description" onChange={this.updateTodoItem} onKeyDown={this.onKeyDownHandler}/>
            </div>
        </div>
}