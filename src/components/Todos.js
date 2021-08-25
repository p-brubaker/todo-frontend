import { Component } from 'react';
import { getTodos, updateTodo, addTodo, deleteTodo } from '../fetch-utils';
import TodoItem from './TodoItem';

class Todos extends Component {
    state = { todos: [], token: '', newTodo: '' }

    async componentDidMount() {
        const token = localStorage.getItem('TOKEN');
        this.setState({ token })
        const todos = await getTodos(token);
        this.setState({ todos })
    }

    checkTodo = async (todo, completed, id, user_id) => {
        const updatedTodo = await updateTodo(
            {id, user_id, todo, completed}, this.state.token
        );
        const unchangedTodos = this.state.todos.filter(item => {
            return item.id !== id
        });
        this.setState({ todos: [...unchangedTodos, ...updatedTodo] });
    }

    handleDeleteTodo = async (id, token) => {
        const unchangedTodos = this.state.todos.filter(item => {
            return item.id !== id
        });
        deleteTodo(id, token);
        this.setState({ todos: unchangedTodos });
    }

    handleChange = (e) => {
        this.setState({ newTodo: e.target.value })
    }

    handleSubmitNewTodo = async () => {
        const newTodo = await addTodo(this.state.newTodo, this.state.token);
        this.setState({ todos: [...this.state.todos, ...newTodo], newTodo: '' });
    }

    render() {
        const todos = this.state.todos.sort((a, b) => a.id - b.id);
        return (
            <div className='todos-container'>
                <h1>Todos</h1>
                <label htmlFor='add-a-todo'>Add a todo</label>
                <input 
                    type='text' 
                    name='add-a-todo' 
                    value={this.state.newTodo}
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={this.handleSubmitNewTodo}>Add new todo</button>
                {
                    todos.map(todo => {
                        return (
                            <TodoItem
                                key={todo.id}
                                deleteTodo={this.handleDeleteTodo}
                                handleCheck={this.checkTodo}
                                todo={todo.todo}
                                completed={todo.completed}
                                user_id={todo.user_id}
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