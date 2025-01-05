import React from 'react'
import { Link } from 'react-router-dom'
import SignUpInnputField from './SignUpInnputField'

const SignUp = () => {
  return (
    <div className="login-container1">
      <h2 className="form-title1">SignUp Community <span className="highlight">HUB</span></h2>

      <form action="#" className="login-form">
        <SignUpInnputField type="email" placeholder="Email" icon="mail"/>
        <SignUpInnputField type="userid" placeholder="Username" icon="person"/>
        <SignUpInnputField type="password" placeholder=" Password" icon="visibility"/>
        <SignUpInnputField type="password" placeholder="Confirm Password" icon="visibility"/>
        <button className="login-button">Signup</button>
      </form>
      <p className="sigunup-text">
        Already have an account?<Link to="/"> Role</Link>
      </p>
    </div>

  )
}

export default SignUp