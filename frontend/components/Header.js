import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'
import axios from 'axios'
import navHome from '../images/nav-home.svg'
import navProfile from '../images/nav-profile.svg'
import navSearch from '../images/nav-search.svg'
import navMap from '../images/nav-map.svg'
import navPin from '../images/nav-pinboard.svg'
import navGram from '../images/nav-ferngram.svg'
import navSetting from '../images/nav-settings.svg'
import navWhite from '../images/NAV-WHITE.svg'
import logo from '../images/logo.svg'

const Header = () => {

  const [user, updateUser] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`/api/user/${getUserId()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUser(resp.data)
      })
  }, [])

  /* Set the width of the side navigation to 250px */
  function openNav() {
    document.getElementById('mySidenav').style.width = '300px'
  }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById('mySidenav').style.width = '0'
  }

  function logout() {
    localStorage.clear()
    // location.reload()
    // return false
  }

  if (token) return <nav>
    <div id="mySidenav" className="sidenav">
      <a className="closebtn"
        onClick={closeNav}>&times;</a>

      <img className="logo" src={logo} alt={'seeded-logo'} />

      <Link to={'/'}>
        <div className="nav-item">
          <img src={navHome} alt="nav-home" />
          Home
        </div>
      </Link>

      <Link to={`/user-page/${user._id}`}>
        <div className="nav-item">
          <img src={navProfile} alt="nav-profile" />
          Profile
        </div>
      </Link>

      <Link to={'/plant-search'}>
        <div className="nav-item">
          <img src={navSearch} alt="nav-search" />
          Plant Search
        </div>
      </Link>

      <Link to={'/user-map'}>
        <div className="nav-item">
          <img src={navMap} alt="nav-map" />
          User Map
        </div>
      </Link>

      <Link to={'/plant-sitters'}>
        <div className="nav-item">
          <img src={navPin} alt="nav-pinboard" />
          Pin Board
        </div>
      </Link>

      <Link to={'/fernstagram'}>
        <div className="nav-item">
          <img src={navGram} alt="nav-ferngram" />
          FernGram
        </div>
      </Link>

      <Link to={{ pathname: `/user-page/${user._id}/settings`, state: { user } }} >
        <div className="nav-item">
          <img src={navSetting} alt="nav-settings" />
          Settings
        </div>
      </Link>



      <div className="nav-div-buttons">
        <a href="/" onClick={logout}><button className="button-green button-nav button-brown">Logout</button>

        </a>
      </div>


    </div>
    <span className="nav-button" onClick={openNav}><img src={navWhite} alt="icon" /></span>
  </nav>

  return <nav>
    <div id="mySidenav" className="sidenav">
      <a className="closebtn"
        onClick={closeNav}>&times;</a>

      <div className="nav-div-buttons">
        <Link to={'/user/login'}>
          <button className="button-green button-nav">
            LOGIN
          </button>
        </Link>

        <Link to={'/user/register'}>
          <button className="button-green button-nav button-brown" >
            REGISTER
          </button>
        </Link>
      </div>


    </div>
    <span className="nav-button" onClick={openNav}><img src={navWhite} alt="icon" /></span>
  </nav>





}

export default Header