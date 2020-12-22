import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapGL, { Marker, Popup } from 'react-map-gl'
import navGram from '../images/nav-ferngram.svg'
import { Link } from 'react-router-dom'

// ! Map Page
// * Centers on Logged in user
// * Map Icons for other users


const UserMap = () => {
  const [userData, updateUserData] = useState([])
  const [longLat, updateLongLat] = useState([])
  const [popupInfo, updatePopupInfo] = useState(null)

  // * GETing user information. Another get request that converts postcodes to longitude and latitude 
  useEffect(() => {
    axios.get('/api/user/users')
      .then(resp => {
        updateUserData(resp.data)
        const promise = []

        resp.data.forEach((user) => {

          promise.push(new Promise((resolve) => {
            setTimeout(() => {
              axios.get(`/api/post-code/${user.postcode}`)
                .then(({ data }) => {
                  const position = {
                    long: data.result.longitude,
                    lat: data.result.latitude,
                    user: user._id,
                    name: user.name,
                    bio: user.bio,
                    sitter: user.sitter
                  }
                  resolve(position)
                })
            }, 300)
          }))
          return Promise.all(promise).then((values) => {
            updateLongLat(values)
          })
        })
      })
  }, [])

  // * Set up for mapbox
  const [viewPort, setViewPort] = useState({
    height: '80vh',
    width: '100%',
    latitude: 51.515,
    longitude: -0.078,
    zoom: 10
  })

  return <main>
    <section className="cover">
      <h1>User Map</h1>
    </section>

    <section className="content">
      <section className="margin">
        <div className="mapIcon">
          <MapGL
            {...viewPort}
            mapboxApiAccessToken={'pk.eyJ1IjoicmFjaGVsYmVhbGUiLCJhIjoiY2tobmIyMGNnMDAxcTJ0cGVodGpxMDdjaCJ9.jIEvNHrY6OQ45Q05K2SO_w'}
            mapStyle="mapbox://styles/rachelbeale/ckhoxbpuf299a19mmtb9arg8a"
            onViewportChange={(viewPort) => setViewPort(viewPort)}

          >

            {longLat.map(user => {
              console.log
              return <Marker
                key={user.user}
                latitude={user.lat}
                longitude={user.long}
              > {
                  user.sitter === true ?
                    <button className="markerSitter"
                      onClick={event => {
                        event.preventDefault()
                        updatePopupInfo(user)
                      }}
                    >
                    </button>
                    :
                    <button className="markerOwner"
                      onClick={event => {
                        event.preventDefault()
                        updatePopupInfo(user)
                      }}
                    >
                    </button>
                }

              </Marker>
            })}
            {popupInfo ? (
              <Popup
                latitude={popupInfo.lat}
                longitude={popupInfo.long}
                onClose={() => {
                  updatePopupInfo(null)
                }}
              >

                <Link to={`/user-page/${popupInfo.user}`}>
                  <h2>{popupInfo.name}</h2>
                  <p>{popupInfo.bio}</p>
                </Link>



              </Popup>
            ) : null}
          </MapGL >
        </div>
      </section>
    </section>
  </main>
}


export default UserMap