const URL = 'https://lab-12-user-auth.herokuapp.com'

export async function authenticate(userInfo, type) {
    const url = `${URL}/auth/${type}`;
    const resp = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    });
    const data = await resp.json();
    localStorage.setItem('TOKEN', data.token);
    return data.token;
}

export async function getTodos(token) {
    const url = `${URL}/api/todos`;
    const resp = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    const data = await resp.json();
    return data;
}

export async function updateTodo(todoInfo, token) {
    console.log(todoInfo, token);
    const url = `${URL}/api/todos/${todoInfo.id}`;
    const resp = await fetch(url, {
        method: 'put',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todo: todoInfo.todo,
            completed: !todoInfo.completed
        })
    });
    const data = await resp.json();
    return data;
}

export async function addTodo(todo, token) {
    const url = `${URL}/api/todos`;
    const resp = await fetch(url, {
        method: 'post',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todo: todo,
            completed: false
        })    
    });
    const data = await resp.json();
    return data;
}

export async function deleteTodo(id, token) {
    const url = `${URL}/api/todos/${id}`;
    const resp = await fetch(url, {
        method: 'delete',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    return resp.json();
}