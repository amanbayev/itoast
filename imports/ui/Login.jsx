import React, {Component } from 'react'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username:'',
      password: ''
    }
  }

  submitHandler(e){
    e.preventDefault()
    // console.log(this.props)
    let {username, password} = this.state;
    Meteor.loginWithPassword(username, password, (err)=>{
      if (err) { 
        console.log('error! ' + err.reason)
      } else { 
        this.props.history.push('/admin')
      }
    })
  }

  render() {
    return (
      <div className="login-body">
        <form className="form-signin" onSubmit={this.submitHandler.bind(this)}>
          <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" width={72} height={72} />
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input 
            type="text"
            className="form-control"
            onChange={(e)=>{
              this.setState({username: e.target.value})
            }} 
            value={this.state.username}
            placeholder="Email address" 
            autoFocus ></input>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={this.state.password}
            onChange={(e)=>{
              this.setState({password: e.target.value})
            }}
            placeholder="Password"  ></input>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
        </form>
      </div>  
    )
  }
} 

export default Login