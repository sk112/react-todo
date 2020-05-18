import React, { Component } from 'react';
import styled from 'styled-components';

/**
 * 
 */

export default class TodoList extends Component{
    Button = styled.button`
        display: block;
        box-sizing: border-box;
        width: 100%;
        border-radius: 0% 10% 10% 0%;
        font-size: .8rem;
        white-space: wrap;
        $:hover{
            background-color: white;
        }` ;

        contStyle = {
            display: 'flex',
            flexDirection: 'row',
        }

        render = () =>
            this.props.items.filter(i => i.done.toString() == this.props.completed).map(i => 
                <div key={i.item} className="row p-1">
                    <div class="container" style={this.contStyle}>
                    
                        <div className="bg-light border" style={{flex:'8'}}>
                                <b className="ml-3">{i.item}</b>
                        </div>
                        <div className="" style={{flex: '1', paddingLeft: '0px', paddingRight:'0px'} }>
                            <this.Button className="btn border" style={{flex: '1', whiteSpace:'normal'}} onClick={() => this.props.callback(i.item)}><span>{this.props.nextaction.toUpperCase()}</span></this.Button>
                        </div>
                    </div>
                </div> 
            );
}
