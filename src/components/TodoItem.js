import { Component } from 'react';

class TodoItem extends Component {

    render() {
        return (
            <div className='todo-item-container'>
                <input 
                    type='checkbox' 
                    onChange={() => this.props.handleCheck(this.props.todo, this.props.completed, this.props.id, this.props.user_id)} 
                    checked={this.props.completed}/>
                <label>{this.props.todo}</label>
                <button onClick={() => {
                    this.props.deleteTodo(this.props.id, this.props.token);
                    }
                }>
                    Delete
                </button>
            </div>
        )
    }
}

export default TodoItem;