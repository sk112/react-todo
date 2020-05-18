import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

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
            newItem: event.target.value,
            popover: false
        })
    }

    onKeyDownHandler = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();

            if(e.target.value != '' && this.props.items.filter(item => item.item == e.target.value && item.done === true).length == 0){
                this.props.callback(e.target.value);
                this.inputTextRef.current.value = '';
                this.inputTextRef.current.focus();
                this.setState({ 
                    newItem: '',
                    popover: false
                })
            }else{
                this.setState({
                    popover: true
                })
            }
        }

    }

    render(){
       

        return(<div className="row p-1"> 
            <div className="col-0">
                <div className="input-group">
                    {/* <button class="btn btn-outline-secondary bg-primary text-white" type="button" onClick={this.clickHandler}>Add</button> */}
                </div>
            </div>
            <div className="col-12">
                    <input type="text"  id="pop" class="form-control" ref={this.inputTextRef} placeholder="Press Enter to add Your Todo Action" onChange={this.updateTodoItem} onKeyDown={this.onKeyDownHandler}/>
                
                {/* <OverlayTrigger trigger="click" placement="right" overlay={popover}> */}
                    {/* <button id="pop" type="button" onClick={() => this.setState({popover: true}) }>Click me to see</button> */}
                    <Popover placement="left" isOpen={this.state.popover}  target="pop" toggle="true">
                        <PopoverBody>
                            Action Item already Exists.
                        </PopoverBody>
                    </Popover>
                {/* </OverlayTrigger> */}
            </div>
        </div>)
    }
}