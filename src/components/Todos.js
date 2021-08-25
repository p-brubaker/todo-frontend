import { Component } from 'react';
import { getTodos, updateTodo, addTodo, deleteTodo } from '../fetch-utils';
import { removeById, replaceById } from '../helpers';
import TodoItem from './TodoItem';

class Todos extends Component {
    state = { todos: [], token: '', newTodoInput: '' }

    async componentDidMount() {
        const token = localStorage.getItem('TOKEN');
        this.setState({ token })
        const todos = await getTodos(token);
        this.setState({ todos })
    }

    checkTodo = async (todo, completed, id) => {
        const updatedTodo = await updateTodo(
            {id, todo, completed}, this.state.token
        );
        this.setState((prevState) => (
           { todos: replaceById(prevState.todos, updatedTodo[0]) }
        ));
    }

    handleDeleteTodo = async (id, token) => {
        deleteTodo(id, token);
        this.setState((prevState) => (
             { todos: removeById(prevState.todos, id) }
        ));
    }

    handleChange = (e) => {
        this.setState({ newTodoInput: e.target.value })
    }

    handleSubmitNewTodo = async () => {
        const { newTodoInput, token} = this.state;
        const newTodo = await addTodo(newTodoInput, token);
        this.setState((prevState) => (
            { todos: [...prevState.todos, newTodo[0]], newTodoInput: '' }
        ));
    }

    render() {
        const todos = this.state.todos.sort((a, b) => a.id - b.id);
        return (
            <div className='todos-container'>
                <h1>Todos</h1>
                <div className='todo-input-container'>
                    <input 
                        type='text' 
                        name='add-a-todo' 
                        value={this.state.newTodoInput}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={this.handleSubmitNewTodo}>Add new todo</button>
                </div>
                {
                    todos.map(todo => {
                        return (
                            <TodoItem
                                key={todo.id}
                                deleteTodo={this.handleDeleteTodo}
                                handleCheck={this.checkTodo}
                                todo={todo.todo}
                                completed={todo.completed}
                                id={todo.id}
                                token={this.state.token}
                            />
                        )
                    })
                }
            </div>
            
        )
    }
}

export default Todos;