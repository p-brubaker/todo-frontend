import { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import Todos from './components/Todos';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';

class App extends Component {

  state = {
    token: localStorage.getItem('TOKEN')
  }

  setToken = (val) => {
    this.setState({ token: val })
  }

  render() {
    return (
    <div className='app-container'>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            exact path='/signup'
            render={ (routerProps) => (
              <Auth
                setToken={this.setToken}
                type='signup'
                {...routerProps}
              />
            )}
          />
          <Route
            exact path='/signin'
            render={ (routerProps) => (
              <Auth
                setToken={this.setToken}
                type='signin'
                {...routerProps}
              />
            )}
          />
          <Route
            path='/todos'
            render={ (routerProps) => (
              this.state.token ? 
                ( <Todos {...routerProps} />)
                : ( <Redirect to='/signin' />)
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
    );
  }
  
}

export default App;
