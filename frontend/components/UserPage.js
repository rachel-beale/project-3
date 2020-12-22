import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
import navProfile from '../images/nav-profile.svg'

import messages from '../images/messages.svg'
import edit from '../images/edit.svg'
import badge from '../images/badge.svg'
import verticalline from '../images/vertical-line.svg'
import plantpot from '../images/plantpot.svg'
import compass from '../images/compass.svg'
import flowerWhite from '../images/round-flower-white.svg'
import cameraGreen from '../images/camera-green.svg'
import flowerGreen from '../images/round-flower-green.svg'
import cameraWhite from '../images/camera-white.svg'

const UserPage = (props) => {
  const [user, updateUser] = useState({})
  // const token = localStorage.getItem('token')
  const profileId = props.match.params.userId
  const [userPlants, updateUserPlants] = useState([])
  const [radioButton, updateRadioButton] = useState()
  const [posts, updatePosts] = useState([])
  // * Get request for users plants
  useEffect(() => {
    axios.get(`/api/users-plants/${profileId}`)
      .then(resp => {
        updateUserPlants(resp.data)
      })
    axios.get(`/api/user/${profileId}`)
      .then(resp => {
        updateUser(resp.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/users-social/${profileId}`)
      .then(resp => {
        updatePosts(resp.data)


      })
  }, [])

  function handleRadioButton(event) {
    event.preventDefault()
    updateRadioButton(!radioButton)
  }

  return <main>
    <section className="search-cover">
      <h1>Hello</h1>
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
          <div><Link to={{ pathname: `/user-page/${user._id}/settings`, state: { user } }}><img src={edit} alt="edit-icon" /></Link>
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

        <div>
          {user.bio ?
            <div className="bio">
              <h5>Bio</h5>
              <p>{user.bio}</p>
            </div>
            :
            <div className="bio">
            </div>
          }
        </div>

        <div className="form-Section">
          {radioButton === true ?
            <div>
              <div className="radio-buttons">
                <button
                  id="button-radio-grow"
                  className="button-radio active">
                  <img src={flowerWhite} alt="flower"></img>
                  Plants
                </button>
                <button
                  id="button-radio-grow"
                  className="button-radio"
                  onClick={handleRadioButton}>
                  <img src={cameraGreen} alt="camera"></img>
                  Posts
                </button>
              </div>
              {isCreator(user._id) && <Link to={'/plant-search'}>
                <div className="button-green button-addPlant">Add New plant</div>
              </Link>}
              {userPlants.map((plant, index) => {
                return <Link key={index}
                  to={`/profile-plant/${plant._id}`} >
                  <div style={{ backgroundImage: `linear-gradient(rgba(129, 150, 103, 0.9), rgba(129, 150, 103, 0.9)), url(${plant.image})` }}
                    className="list-item" id="search-profile">
                    <h3>{plant.commonName} </h3>
                    <h4>{plant.scientificName}</h4>
                  </div>
                </Link>
              })}

            </div>
            :
            <div>
              <div className="radio-buttons">
                <button
                  id="button-radio-grow"
                  className="button-radio"
                  onClick={handleRadioButton}>
                  <img src={flowerGreen} alt="flower"></img>
                  Plants
                </button>
                <button
                  id="button-radio-grow"
                  className="button-radio active">
                  <img src={cameraWhite} alt="camera"></img>
                  Posts
                </button>
              </div>
              {isCreator(user._id) && <Link to={'/fernstagram'}>
                <div className="button-green button-addPlant">Fernstagram</div>
              </Link>}
              {posts.map((post, index) => {
                var timestamp = new Date(post.createdAt)
                var datetime = timestamp.getDate() + '/'
                  + (timestamp.getMonth() + 1) + '/'
                  + timestamp.getFullYear() + ' at '
                  + timestamp.getHours() + ':'
                  + timestamp.getMinutes()
                return <div
                  key={index}>
                  <div className="nav-item">
                    <img src={navProfile} alt="nav-profile" />
                    <h4>{user.name} </h4>
                    {/* {console.log(post._id)} */}
                  </div>
                  <div className="socialStatus">
                    <div className='list-item' id="fernPhoto"
                      style={{ background: `url(${post.image}) no-repeat center center`, backgroundSize: 'cover' }}
                    >
                    </div>
                    <h4>{post.caption}</h4>
                    <h5>{datetime}</h5>
                  </div>
                </div>
              })}
            </div>
          }
        </div>
      </section>
    </section>
  </main>
}


export default UserPage