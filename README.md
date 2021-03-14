### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# SEEDED 
### A plant sitting app 🌱 🌿 🌼

MERN Full Stack Application. 

By [Rachel]( https://github.com/rachel-beale), [Enrico](https://github.com/bacxhus), [Laurence](https://github.com/ProDigresser) and [Rebecca](https://github.com/rebeccaacioadea)

## Overview 
As our third project for General Assembly we were tasked in groups of 4 to create and develop a Full Stack MERN (MongoDB, Express, React and Node) application over the course of 7 days. 

After some deliberation, we settled on creating **Seeded - a community plant-sitting app.**

The app allows users to sign up and communicate with each other to help find other plant parents who can look after their plants while they were away. The concept of our app is feature rich, and allowed us to create our own database, pull from external APIs, create responsive user maps, allow users to search & add plants that they owned to their 'collection', as well as having a social media page with image uploading and message boards. 

Find our completed app here -> [ SEEDED ] (https://rachelbeale-seeded.herokuapp.com)
If you would like to test the app, you can create your account or please feel free to use the following credentials for a demo account: 

Username: CarlLinnaeus
Password: CarlLinnaeus1?

## Brief
- Collaborative development using Git and GitHub
- Develop a Full Stack Application
- Build a database and store information to it using MongoDB
- Navigate the database using Node and an Express API
- Emphasis on RESTful design to serve data programmatically
- Serve the API though a separate Front End using React
- Deliver a complete product outfitted with CRUD functionality
- Design a visually impressive Front End, with mobile responsiveness as a key element
- Deploy the application online

## Technologies Used
- MongoDB & Mongoose
- Node
- Express
- React 
- Git & GitHub
- Heroku (deployment)

## Approach Taken 
### Planning
We spent the first day throughly planning the foundations of our app. Discussing exactly what we wanted to achieve, our user story and formulating the backend structure including the key endpoints and external API's we would need.

<img src = ./README-files/seeded-plan.png >

### Backend 

We coded the core structure of the backend together, starting with the server.js, router.js, the middleware and key models for the database.

This is the router.js, which outlines our API routes and authenicates users through a secure route as nessessary:

```Javascript
// Grabbing from external API
router.route('/plants-external/:query')
  .get(dataController.getExternalData)

// Adding to OUR API
router.route('/plants')
  .post(secureRoute, dataController.addPlants)
  .get(dataController.getPlants)

// Editing OUR API
router.route('/plants/:id')
  .get(dataController.singlePlant)
  .delete(secureRoute, dataController.deletePlants)
  .put(secureRoute, dataController.editPlants)
```

Our Secure Route function is below and is used to authenticate logged in users using JSON Web Token (JWT):

```javascript
function secureRoute(req, res, next){
  const authToken = req.headers.authorization
  if (!authToken || !authToken.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Unauthorized stage 1' })
  }
  const token = authToken.replace('Bearer ', '')
  jwt.verify(token, secret, (err, payload) => {
    if (err) return res.status(401).send({ message: 'Unauthorized stage 2' })
    const userId = payload.sub
    User 
      .findById(userId)
      .then(user => {
        if (!user) return res.status(401).send({ message: 'Unauthorized stage 3' })
        req.currentUser = user
        next()
      })
      .catch(() => res.status(401).send({ message: 'Unauthorized stage 4' }))
  })
}
```

We created numerous controllers in our backend - which is where our CRUD functions are executed.

This is an example of one of those controller  - this allows a user to edit a plant they own:

```Javascript
function editPlants(req, res) {
  const name = req.params.id
  const currentUser = req.currentUser
  const body = req.body
  Data
    .findById(name)
    .then(plant => {
      if (!plant) return res.send({ message: 'No Plant Found' })
      if (!req.currentUser.isAdmin && !plant.user.equals(currentUser._id)) return res.status(401).send({ status: 'Unauthorized' })

      plant.set(body)
      plant.save()
      res.send(plant)
    })
    .catch(err => res.send(err))
}
```



### Front End & React

The key to our app was to be able to pass and store information between our front and backends. We used React hooks and other tools such as Axios to impliment this. 

See below an example of grabbing data from our backend which was later used to render information.

```javascript
 const [query, updateQuery] = useState('')
 
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

  function enterKey(event) {
    if (event.key === 'Enter') {
      updateQuery(typedWord)
    }
  }
```

#### Challenges & Victories:

Rather than bore you and list the entire process of creating our app, I have instead highlighted some of the major challenges that we faced, and how we went about resolving them.



##### <u>Ferngram</u>

##### Challenges 

One of our strech goals was to incorporate a social media page into our app. Que Ferngram - a social dedicated to flora 📸 🌷

We wanted Ferngram to allow users to upload images with captions, and for other users to comment on these posts. 

But in order to do this, we needed a way to upload images to our backend that would work in conjunction with Heroku. 

**Victory & Solution** 

For image uploading, we used Cloudinary  and it's upload widget,  which creates and stores a unique URL for the new image that had been posted. This URL along with the users caption for the photo (see `handleChange` function) were passed in a post request to our backend. Once the post was completed, a new get request is made, rendering the new image & caption onto the page: 

```javascript
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

```

We were able to make use of a ternatory operator to toggle the display of the page, depending on if the user wanted to upload an image or just view images that had already been posted. 

##### <u>Interactive User Map</u> 

##### Challenge 

We wanted to have a map which showed users home locations so you could see if there were any other 'plant parents' in your neighbourhood. 

On registration, all users provided a postcode which we would use to map their coordinates. However, MapBox needs longitude and latidute to pin a location, which meant that we needed to convert our users postcodes into coordinates. 

##### Victory & Solution 

In order to do this, we first made an API request that fetched all our users data. Then using `forEach`, and `promises.all` we looped through each user and compiled the information that we needed, using a proxy API that we had setup in our backend to convert the postcodes:

```javascript
const [userData, updateUserData] = useState([])
const [longLat, updateLongLat] = useState([])
const [popupInfo, updatePopupInfo] = useState(null)  

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


```

### Styling & React 

The user experience, with coherent and thoughtful styling was a vital aspect of the app for us. We spent time carefully planning the colour theme, logo and layout which culminated in very detailed wireframes created with InVision. The CSS and styling of this app was co-completed by myself and my colleague Enrico.

<img src = ./README-files/seeded-wireframes.png >

## The Result

If you haven't used the app yet, take a look at some of the screenshots below for the final product. 

<img src = ./README-files/seeded-screenshot3.png >

<img src = ./README-files/seeded-screenshot1.png >

<img src = ./README-files/seeded-screenshot2.png >

### Lessons Learnt

This was a throughly enjoyable project, and one that I am extremely proud of.  This was the first project that I  coded collaboratively using Git branches, which really helped me understand the complexities of git and the importance of communication within a team. 

This was a throughly enjoyable project, and I loved working as part of team. Being able to troubleshoot and push each other into creating the best possible app in the time we had. It was a massive learning experience and really strengthen my coding knowledge, and confidence. 

#### Future Improvements

There were some featured that we didn't have time to implement. The main one being intergrating nested comments onto our 'ferngram' social media page, which we do have a working endpoint for. 

Some other things on our 'wish list' are:  

- To have instant messaging between users, ideally using websockets. 
- To have incorporated cloudinary into our backend so we did not have to rely on the bulky widget.  
- Email validation and notifications 
- Complete the 'badge' functionality and allowing users to favourite plants to add to a wishlist for future purchases. 

Thanks for taking the time to read this readme 👩‍💻



