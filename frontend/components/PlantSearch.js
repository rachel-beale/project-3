import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



const PlantSearch = () => {
  const [results, updateResults] = useState([])
  const [query, updateQuery] = useState('')
  const [typedWord, updateTypedWord] = useState('')

  // * GETting data from API. 
  const searchFunction = (query) => {
    if (query) {
      axios.get(`api/plants-external/${query}`)
        .then(resp => {
          updateResults(resp.data.data)
        })
    }
  }

  useEffect(() => {
    return searchFunction(query)
  }, [query])

  // * Function to search results when enter button pressed
  function enterKey(event) {
    if (event.key === 'Enter') {
      updateQuery(typedWord)
    }
  }

  return <main className="main">
    <section className="search-cover">
      <h1>Plant <br /> Library</h1>
      <input className="search-bar"
        placeholder="Search..."
        onChange={(event) => updateTypedWord(event.target.value)}
        value={typedWord}
        onKeyPress={enterKey}
      />
    </section>

    {query ?
      <section className="content fade-in" id="content-search">
        <div className="fade"></div>
        <section className="margin">
          {results.map((plant, index) => {
            return <Link key={index}
              to={{ pathname: `/add-plant/${plant.id}`, state: { plant } }} >
              <div style={{ backgroundImage: `linear-gradient(rgba(129, 150, 103, 0.9), rgba(129, 150, 103, 0.9)), url(${plant.image_url})` }}
                className="list-item" id="search-profile">
                <h3>{plant.common_name} </h3>
                <h4>{plant.scientific_name}</h4>
              </div>
            </Link>
          })}
        </section>
      </section>

      :

      <div></div>

    }


  </main>
}



export default PlantSearch
