import { Component } from 'react';
import { authenticate } from '../fetch-utils';

class Auth extends Component {
    
    state = { email: '', password: '' }

    getType = () => {
        return this.props.type === 'signin' ? 'Sign In': 'Sign Up';
    }

    handleChange = (e, key) => {
        this.setState({ [key]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const token = await authenticate(
            {
                email: this.state.email,
                password: this.state.password
            },
            this.props.type
        );
        this.props.setToken(token);
        this.props.history.push('/todos');
    }


    render() {
        return(
            <div className='auth-container'>
                <form className='auth-form' onSubmit={this.handleSubmit}>
                    <legend>{this.getType()}</legend>
                    <label htmlFor='email'>Email:</label>
                    <input 
                        name='email'
                        type='email'
                        onChange={ (e) => this.handleChange(e, 'email')}
                    />
                    <label htmlFor='password'>Password:</label>
                    <input
                        name='password'
                        type='password'
                        onChange={ (e) => this.handleChange(e, 'password')}
                    />
                    <button className='user-info-submit-button'>{this.getType()}</button>
                </form>
            </div>
        )
    }
}

export default Auth;