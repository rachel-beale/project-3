import React, { useState } from 'react'
import axios from 'axios'

import chairWhite from '../images/book.svg'
import potGreen from '../images/flowerpot-green.svg'
import chairGreen from '../images/chair-green.svg'
import potWhite from '../images/flowerpot-white.svg'


const Register = (props) => {
  const [radioButton, updateRadioButton] = useState()


  const [formData, updateFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    postcode: '',
    sitter: false,
    bio: ''
  })

  const [errors, updateErrors] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    postcode: ''

  })

  function handleRadioButton(event) {
    event.preventDefault()
    updateRadioButton(!radioButton)
    handleChange(event)
  }

  function sameButton(event) {
    event.preventDefault()
  }

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value


    const data = {
      ...formData,
      [name]: value
    }

    const newErrors = {
      ...errors,
      [name]: ''
    }

    updateFormData(data)
    updateErrors(newErrors)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/user/register', formData)
      .then(resp => {
        if (resp.data.errors) {
          updateErrors(resp.data.errors)
        } else {
          props.history.push('/user/login')
        }
      })
  }

  return <main>
    <section className="cover">
      <h1>Register</h1>
    </section>

    <section className="content" id="register">
      <section className="margin">

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label className="label"><h5>Name</h5></label>
            <input className="input"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
              name="name"
            />
            {errors.name && <p className ="errorMessages" style={{ color: 'red' }}>
              {`Enter your ${errors.name.path}`}
            </p>}
          </div>

          <div className="form-section">
            <label className="label"><h5>Username</h5></label>
            <input className="input"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              value={formData.userName}
              name="userName"
            />
            {errors.userName && <p className ="errorMessages" style={{ color: 'red' }}>
              {'Invalid username'}
            </p>}
          </div>


          <div className="form-section">
            <label className="label"><h5>Email</h5></label>
            <input className="input"
              type="text"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              name="email"
            />
            {errors.email && <p className ="errorMessages" style={{ color: 'red' }}>
              {`Invalid ${errors.email.path}`}
            </p>}
          </div>

          <div className="form-section">
            <label className="label"><h5>Password</h5></label>
            <input className="input"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              name="password"
            />
            {errors.password && 
            <div>
              <p className ="errorMessages" style={{ color: 'red' }}>
                {`${errors.password.path} must have at least:`}
              </p>
              <ul> 
                <li>6 characters</li>
                <li>1 uppercase letter </li>
                <li>1 lowercase letter </li>
                <li>1 special character</li>
              </ul>
            </div>
            }
          </div>

          <div className="form-section">
            <label className="label"><h5>Confirm Password</h5></label>
            <input className="input"
              type="password"
              placeholder="Password Confirmation"
              onChange={handleChange}
              value={formData.passwordConfirmation}
              name="passwordConfirmation"
            />
            {errors.passwordConfirmation && <p className ="errorMessages" style={{ color: 'red' }}>
              {'Does not match password'}
            </p>}
          </div>


          <div className="form-section">
            <label className="label"><h5>Postcode</h5></label>
            <input className="input"
              type="text"
              placeholder="Postcode"
              onChange={handleChange}
              value={formData.postcode}
              name="postcode"
            />
            {errors.postcode && <p className ="errorMessages" style={{ color: 'red' }}>
              {`Must enter valid ${errors.postcode.path}`}
            </p>}
          </div>

          <div className="form-section">
            <label className="label"><h5>Status</h5></label>
            {radioButton === true ?
              <div className="radio-buttons top-space">
                <button
                  className="button-radio active"
                  onClick={sameButton}
                  value={true}
                  name="sitter">
                  <img src={chairWhite} alt="chair" />Sitter</button>
                <button
                  className="button-radio "
                  onClick={handleRadioButton}
                  value={false}
                  name="sitter">
                  <img src={potGreen} alt="flowerpot" />
              Owner</button>
              </div>
              :
              <div className="radio-buttons top-space">
                <button
                  className="button-radio"
                  onClick={handleRadioButton}
                  value={true}
                  name="sitter">
                  <img src={chairGreen} alt="chair" />Sitter</button>
                <button
                  className="button-radio active"
                  onClick={sameButton}
                  value={false}
                  name="sitter">
                  <img src={potWhite} alt="flowerpot" />
              Owner</button>
              </div>
            }
          </div>

          <div className="form-section">
            <label className="label"><h5>BIO</h5></label>
            <textarea
              className="input"
              placeholder="Tell us about yourself"
              onChange={handleChange}
              value={formData.bio}
              name="bio"
            ></textarea>
          </div>

          <button className="button-green" id="button-grow">Sign Up</button>


        </form>
      </section>
    </section>
  </main>
}

export default Register


