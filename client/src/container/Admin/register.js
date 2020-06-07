import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getUsers, registerUser} from '../../actions'

class Register extends Component{

    state = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        error: ''
    }

    UNSAFE_componentWillMount(){
        this.props.dispatch(getUsers())
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.user_reducer.register === false){
            this.setState({
                error: 'Error, Try Again!'
            })
        } else{
                this.setState({
                    name: '',
                    lastname: '',
                    email: '',
                    password: '',
                })
            }
    }
    

    handleInputEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }    
    
    handleInputName = (event) => {
        this.setState({
            name: event.target.value
        })
    }    
    
    handleInputLastname = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }    
    
    handleInputPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        this.setState({error: ''})

        this.props.dispatch(registerUser({
            email: this.state.email,
            name:this.state.name,
            lastname: this.state.lastname,
            password: this.state.password
        }, this.props.user_reducer.users))
    }

    showUsers = (user)=> (
        user.users ? 
            user.users.map( item => (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                </tr>
        ))
        :null
    )

    render(){
        let user = this.props.user_reducer
        console.log(this.props)
        return(
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2> Add User</h2>
                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="Enter Name"
                            value={this.state.name}
                            onChange={this.handleInputName}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="Enter Last Name"
                            value={this.state.lastname}
                            onChange={this.handleInputLastname}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type='email'
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type='password'
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type="submit">Add User</button>
                    <div className="error">
                        {this.state.error}
                    </div>
                </form>
                <div className="current_user">
                    <h4>Current Users:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user_reducer: state.user_reducer
    }
}

export default connect(mapStateToProps)(Register)