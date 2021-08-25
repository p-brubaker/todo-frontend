import { Component } from 'react';

class TodoItem extends Component {

    render() {
        const { handleCheck, deleteTodo, todo, id, completed, token } = this.props;
        return (
            <div className='todo-item-container'>
                <div className='todo-item'>
                    <input 
                        type='checkbox' 
                        onChange={() => handleCheck(todo, completed, id)} 
                        checked={completed}/>
                    <label>{todo}</label>
                </div>
                <button onClick={() => {
                    deleteTodo(id, token);
                    }
                }>
                    Delete
                </button>
            </div>
        )
    }
}

export default TodoItem;