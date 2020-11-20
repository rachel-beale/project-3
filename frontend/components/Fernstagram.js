import React, { useEffect, useState } from 'react'
import axios from 'axios'
import navProfile from '../images/nav-profile.svg'

// ! This is the social feed
// * List of all posts in time order 
// * Image with caption 
// * Button to like
// * Button to comment
// * If you click on their profile image it will take you to their profile


const Fernstagram = () => {

  const [feedData, updateFeedData] = useState([])
  const [text, setText] = useState('')
  const token = localStorage.getItem('token')
  const [button, updateButton] = useState()

  const [postData, updatePostData] = useState({
    caption: '',
    image: ''
  })
  const [inputValue, updateInputValue] = useState('')


  useEffect(() => {
    axios.get('/api/social', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        const data = resp.data
        // console.log(data)
        updateFeedData(data)
      })
  }, [])


  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'seeded',
        uploadPreset: 'ml_default'
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        // console.log(result.info.url)
        updatePostData({
          ...postData,
          image: result.info.url
        })
      }
    ).open()
  }

  function handleChange(e) {
    updateInputValue(e.target.value)
    updatePostData({
      ...postData,
      caption: e.target.value
    })
  }

  function handleSubmit() {
    if (postData.image === '' || postData.caption === '') return
    axios.post('/api/social', postData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        updatePostData({
          ...postData,
          image: '',
          caption: ''
        })
        updateInputValue('')
      })
      .then(() => {
        axios.get('/api/social', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(resp => {
            const data = resp.data
            // console.log(data)
            updateFeedData(data)
          })
      })

  }

  function handleButton(event) {
    event.preventDefault()
    updateButton(!button)
  }

  function handleComment(socialId) {
    if (text === '') return
    // console.log(socialId)
    axios.post(`/api/social/${socialId}/comment`, { directComment: text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        axios.get('/api/social', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(resp => {
            // console.log(resp)
            const data = resp.data
            setText('')
            updateFeedData(data)
          })
      })
  }

  function handleInput(e) {
    // console.log(e.target.value)
    setText(e.target.value)
  }

  return <main>
    <section className='search-cover' id="fernCover">
      <h1>FernGram</h1>
    </section>
    {/* </section> */}

    {button === true ?
      <section className="content">
        <section className="margin">
          <div className="title">
            <button
              className="button-green"
              onClick={handleUpload}
            >
              Click to upload
            </button>
            <textarea
              className="input" id="socialCaption"
              placeholder="Post Caption"
              onChange={handleChange}
              value={inputValue} />
            {postData.image && <img
              src={postData.image}
              style={{ height: '180px', margin: '5px', borderRadius: '5px' }}
            />}
            <button
              className="button-green"
              onClick={handleSubmit}
            >
              Post!
            </button>
            <button
              className="button-green button-brown" id="toGram"
              onClick={handleButton}
            > Return to feed</button>
          </div>
        </section>
      </section>
      :
      <div>
        <button
          className="search-bar addFernGram"
          onClick={handleButton}
        > Add New Post</button>

        {feedData.length === 0 &&
          <section className='content' id="content-search">
            <section className='margin'>
              <h4>
                There Are No Posts To Be Found!
              </h4>
            </section>
          </section>}


        <section className='content' id="content-fern">
          <section className="margin">

            {feedData.length > 0 && feedData.map(post => {
              var timestamp = new Date(post.createdAt)
              var datetime = timestamp.getDate() + '/'
                + (timestamp.getMonth() + 1) + '/'
                + timestamp.getFullYear() + ' at '
                + timestamp.getHours() + ':'
                + timestamp.getMinutes()
              return <div
                key={post._id}
              >

                <div className="nav-item">
                  <img src={navProfile} alt="nav-profile" />
                  <h4>{post.user.name} </h4>
                </div>
                <div className="socialStatus">
                  <div className='list-item' id="fernPhoto"
                    style={{ background: `url(${post.image}) no-repeat center center`, backgroundSize: 'cover' }}
                  >
                  </div>
                  <h4>{post.caption}</h4>
                  <h5>{datetime}</h5>
                </div>
                <textarea
                  className="input" id="socialInput"
                  placeholder="Add a comment"
                  onChange={handleInput}
                  value={text[post._id]}
                />
                <div className="socialComments">
                  <button className="button-green" id="commentButton"
                    onClick={() => handleComment(post._id)}
                  >Post</button>
                </div>
                {post.directComments.map(comment => {
                  // { console.log(comment.user.name) }
                  return <div key={comment._id}>
                    <h5>{comment.user.name}</h5>
                    <p>{comment.directComment}</p>
                  </div>
                })}

              </div>
            })}
          </section>

        </section>

      </div>

    }

  </main>
}

export default Fernstagram