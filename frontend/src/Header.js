import React, {Component} from 'react';

export class Header extends Component{
    render = () => 
        <h4 className=" position-sticky bg-primary text-center text-white p-2">
            {this.props.name.toUpperCase()}'s Todo List
            ({this.props.items.filter(item => item.done === false).length} items left)
        </h4>
    
}

