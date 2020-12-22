import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import { Link } from 'react-router-dom'
import illustrationone from '../images/illustration-1.svg'
import illustrationtwo from '../images/illustration-2.svg'
import illustrationthree from '../images/illustration-3.svg'
import logowhite from '../images/logo-white.svg'
import messages from '../images/messages.svg'
import badge from '../images/badge.svg'
import verticalline from '../images/vertical-line.svg'
import plantpot from '../images/plantpot.svg'
import compass from '../images/compass.svg'
import profile from '../images/profile.svg'
import search from '../images/magnifying.svg'
import map from '../images/map.svg'
import gram from '../images/leaves.svg'
import board from '../images/pinboard.svg'
import edit from '../images/edit.svg'

// ? Limited functionality if you're not logged in

const Home = () => {

  const [user, updateUser] = useState({})

  const [userPlants, updateUserPlants] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {

    axios.get(`api/user/${getUserId()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUser(resp.data)
      })
      .then(() => {
        getPlantList()
      })
      .catch(err => console.log(err))
  }, [])

  if (!token) return <main>
    <section className="cover">
      <img src={logowhite} alt="illustration" />
    </section>
    <section className="content">
      <section className="margin">

        <div className="home-one">
          <h2>
            Plants Jonesing?
          </h2>
          <img src={illustrationone} alt="illustration" />
          <p>Welcome to Seeded! An online platform here to help you get your plant fix. We know how hard it can be, that sweet sweet tempteation for a sweet sweet succulent. But tight on a budget? Can&#39;t commit long term? We&#39;ve got the thing for you! </p>
        </div>

        <hr />

        <div className="home-two">
          <h2>
            Asta la vista baby
          </h2>
          <img src={illustrationtwo} alt="illustration" />
          <p>We understand that keeping your horticultural friends alive can be challenging at the best of times, especially when on the move, thats why with seeded, sit back and relax. It&#39;s never been easier to get away. </p>
        </div>

        <hr />

        <div className="home-two">
          <h2>
            Aloe aloe aloe
          </h2>
          <img src={illustrationthree} alt="illustration" />
          <p> Take a break, enjoy your time off. Find someone near you who&#39;s willing to look after your plants or offer their plants up for a temporarily delicious set of time. No hasstle, no charge, all love! We&#39;re rooting for you!</p>
        </div>

      </section>
    </section>
  </main>

  // * If user is signed in: the below will be true. Getting user information and displaying homepage. 

  function gettingUserInfo() {
    axios.get(`api/user/${getUserId()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUser(resp.data)
      })
      .catch(err => console.log(err))
  }

  function getPlantList() {
    axios.get(`api/users-plants/${getUserId()}`)
      .then(resp => {
        updateUserPlants(resp.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    gettingUserInfo()
    getPlantList()
  }, [])

  return <main>
    <section className="cover">
      <h1>Welcome</h1>
    </section>

    <section className="content">
      <section className="margin">
        <h2>{user.name}</h2>
        <div className="header-title">
          {/* Making left section and right edit icon align center */}
          <div className="header-icon">
            {/* Making 'Messages' and the icon align center */}
            <img src={messages} alt="message-icon" />
            <h6>Messages</h6>
          </div>
          <div><Link to={{ pathname: `/user-page/${user._id}/settings`, state: { user } }}>
            <img src={edit} alt="edit-icon" />
          </Link>
          </div>
        </div>

        <section className="status">
          <div>
            <img src={badge} alt="badge-icon" />
            <h5>Support<br />Badge</h5>
          </div>
          <img src={verticalline} alt="vertical-line" />
          {user.sitter ?
            <div>
              <img src={plantpot} alt="flower-in-pot" />
              <h5>PLANT<br />SITTER</h5>
            </div>
            :
            <div>
              <img src={compass} alt="compass" />
              <h5>PLANT<br />OWNER</h5>
            </div>
          }
          <img src={verticalline} alt="vertical-line" />
          <div>
            <h1>{userPlants.length}</h1>
            <h5>Plant<br />Count</h5>
          </div>
        </section>

        <hr />
        <section className="list">
          <Link to={`/user-page/${user._id}`}>
            <div className="list-item" id="home-profile">
              <img src={profile} alt="profile" />
              <h3>Profile</h3>
            </div>
          </Link>
          <Link to={'/plant-search'}>
            <div className="list-item" id="home-search">
              <img src={search} alt="magnifying" />
              <h3>Plant Search</h3>
            </div>
          </Link>
          <Link to={'/user-map'}>
            <div className="list-item" id="home-map">
              <img src={map} alt="map" />
              <h3>User Map</h3>
            </div>
          </Link>
          <Link to={'/fernstagram'}>
            <div className="list-item" id="home-ferngram">
              <img src={gram} alt="leaves" />
              <h3>FernGram</h3>
            </div>
          </Link>
          <Link to={'/plant-sitters'}>
            <div className="list-item" id="home-pinboard">
              <img src={board} alt="pinboard" />
              <h3>Pin Board</h3>
            </div>
          </Link>
        </section>

      </section>
    </section>
  </main>
}

export default Home