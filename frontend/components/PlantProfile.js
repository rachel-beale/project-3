import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
import axios from 'axios'
import moment from 'moment'
 
import message from '../images/book.svg'
import edit from '../images/share.svg'
import deerGreen from '../images/deer-green.svg'
import fireplaceGreen from '../images/fireplace-green.svg'
import pineTree from '../images/pine-tree.svg'

const PlantProfile = (props) => {
  // Carrying formData over from addPlant
  // const profilePlant = props.location.state.formData

  // Carrying plant ID over from addPlant
  const plantId = props.match.params.plantId

  const token = localStorage.getItem('token')
  const [plantData, updatePlantData] = useState({})

  useEffect(() => {
    axios.get(`/api/plants/${plantId}`)
      .then((resp) => {
        updatePlantData(resp.data)
      })
  }, [])

  function handleDelete() {
    axios.delete(`/api/plants/${plantId}`, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then(() => {
        props.history.push('/plant-search')
      })
  }
  return <main>
    <section className="cover">
      <h1>Plant Profile</h1>
    </section>

    <section className="content">
      <section className="margin">
        <h4>{plantData.scientificName}</h4>
        <h2 className="plant-title">{plantData.commonName}</h2>
        <div className="header-title extra-space">
          {/* Making left section and right edit icon align center */}
          <div className="header-icon">
            {/* Making 'Messages' and the icon align center */}
            <img src={message} alt="message-icon" />
            <h6>{plantData.library ?
              plantData.library
              :
              'No known bibliography documented'}</h6>
          </div>
          <div>
            <img src={edit} alt="edit-icon" />
          </div>
        </div>

        <hr className="hr-less-space" />

        <div className="bio">
          {/* <h5>SYNONYMS</h5> */}
          <h6>Added {moment(plantData.createdAt).format('MMMM Do YYYY')}</h6>
        </div>


        <div className="bio">
          <h5>SYNONYMS</h5>
          <p>{plantData.synonyms ?
            plantData.synonyms
            :
            'No known synonyms'}</p>
        </div>

        {plantData.outdoor === true ?
          <div className="profile-info">
            <img src={deerGreen} alt="deer" />
            <h4>Outdoor</h4>
          </div>
          :
          <div className="profile-info">
            <img src={fireplaceGreen} alt="fireplace" />
            <h4>Indoor</h4>
          </div>
        }

        <div className="profile-info add-space">
          <img src={pineTree} alt="pine-tree" />
          <h4>{plantData.plantType}</h4>
        </div>

        <div className="care-notes">
          <h4>User Notes</h4>
          <p>{plantData.careNotes}</p>
        </div>
        <div>
          {isCreator(plantData.user) &&
            <Link to={`/edit-plant/${plantId}`}><button className="button-green">Edit plant</button>
            </Link>}
          {isCreator(plantData.user) && <button className="button-green button-red" onClick={handleDelete}
          >Delete Plant </button>}
        </div>

      </section>
    </section>
  </main>


}

export default PlantProfile