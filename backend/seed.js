const mongoose = require('mongoose')
const Data = require('./models/data')
const User = require('./models/user')
const Message = require('./models/message')
const Social = require('./models/social')
const { dbURI } = require('./config/environment')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err)

    console.log('Mongoose connected')
    mongoose.connection.db.dropDatabase()
      .then(() => {
        return User.create([
          {
            name: 'admin',
            userName: 'admin',
            email: 'admin@admin.com',
            password: 'Admin1!',
            passwordConfirmation: 'Admin1!',
            postcode: 'SE108GE',
            badges: [],
            isAdmin: true,
            bio: 'Say aloe to my little friend',
            sitter: true
          },
          {
            email: 'hello@hello.com',
            name: 'Dave',
            userName: 'Dave',
            password: 'Hello1!',
            passwordConfirmation: 'Hello1!',
            postcode: 'CT146DL',
            badges: [],
            bio: 'Just your usual plant obsessed software engineer.',
            sitter: false
          },
          {
            email: 'huckleberry@finn.com',
            name: 'Huckleberry Finn',
            userName: 'huckleberry',
            password: 'Huckleberry1?',
            passwordConfirmation: 'Huckleberry1?',
            postcode: 'E14 9EP',
            badges: [],
            bio: 'How do succulents confess their feelings - Aloe you so much!',
            sitter: false
          },
          {
            email: 'jay@gatsby.com',
            name: 'Jay Gatsby',
            userName: 'Gatsby',
            password: 'Gatsby1?',
            passwordConfirmation: 'Gatsby1?',
            postcode: 'SW20 2FE',
            badges: [],
            bio: 'What do you call a cheerleading herb - An encourage mint!',
            sitter: true
          },
          {
            email: 'sherlock@holmes.com',
            name: 'Sherlock Holmes',
            userName: 'Sherlock',
            password: 'Sherlock1?',
            passwordConfirmation: 'Sherlock1?',
            postcode: 'W1U 6SG',
            badges: [],
            bio: 'I like to solve mysteries and look after plants',
            sitter: true
          },
          {
            email: 'holly@golightly.com',
            name: 'Holly Golightly',
            userName: 'Golightly',
            password: 'Golightly1?',
            passwordConfirmation: 'Golightly1?',
            postcode: 'SE3 7BH',
            badges: [],
            bio: 'What did the big flower say to the little flower - Whats up bud',
            sitter: false
          },
          {
            email: 'elizabeth@windsor.com',
            name: 'Elizabeth Windsor',
            userName: 'Queenie',
            password: 'Queenie1?',
            passwordConfirmation: 'Queenie1?',
            postcode: 'SW1A 1AA',
            badges: [],
            bio: 'Gardening and royal duties',
            sitter: true
          }
        ])
      })

      .then(users => {
        console.log(`${users.length} users have been created`)
        return users
      })

      .then(users => {
        return Social.create([
          {
            image: 'https://i.imgur.com/TvUzQKk.jpg',
            caption: 'Made a planter for my Cactus!',
            user: users[0]
          },
          {
            image: 'https://i.imgur.com/PDYIpMg.jpg',
            caption: 'The Jasmine is looking lovely today.',
            user: users[1]
          },
          {
            image: 'https://i.imgur.com/iY9XEtj.jpg',
            caption: 'Growing so fast!!',
            user: users[3]
          },
          {
            image: 'https://i.imgur.com/xnUtYOd.jpg',
            caption: 'Fav spot',
            user: users[4]
          },
          {
            image: 'https://i.imgur.com/gI2ixW8.jpg',
            caption: 'Time to re-organise!',
            user: users[4]
          },
          {
            image: 'https://i.imgur.com/mTcuM2e.jpg',
            caption: 'Best birthday present!',
            user: users[5]
          }
        ]), users
      })

      .then(users => {
        return Message.create([
          {
            commentBody: 'Looking for someone to do a daily check-in on my trees and give them a hug.',
            dateStart: '20/12/2020',
            dateEnd: '01/01/2021',
            user: users[0]
          },
          {
            commentBody: 'My orchids need a twice daily water and a bedtime story.',
            dateStart: '26/12/2020',
            dateEnd: '02/01/2021',
            user: users[1]
          }
        ]), users
      })

      .then((users) => {
        return Data.create([
          {
            image: 'https://bs.floristic.org/image/o/1abc01027d5c9b6fb586da94752149d468c88554',
            commonName: 'Barrel cactus',
            scientificName: 'Kroenleinia grusonii',
            careNotes: 'Water once a month. Keep in sunlight',
            outdoor: false,
            user: users[0]
          },
          {
            image: 'https://bs.floristic.org/image/o/0f3f31fd38dbf8668fc19dd0ca60aab1793bf925',
            commonName: 'Garden Tomato',
            scientificName: 'Solanum lycopersicum',
            careNotes: 'Somewhere sunny',
            outdoor: true,
            user: users[0]
          },
          {
            commonName: 'French hydrangea',
            scientificName: 'Hydrangea macrophylla',
            image: 'https://bs.floristic.org/image/o/91f52328edb009bb771ff1e1d865fae14d80ec3b',
            careNotes: 'Water often, keep out of sunlight.',
            outdoor: false,
            user: users[1]
          }
        ])
      })
      .then(Data => {
        console.log(`${Data.length} plants have been created`)
      })
      .catch(err => console.log(err))
      .finally(() => {
        mongoose.connection.close()
      })
  }
)