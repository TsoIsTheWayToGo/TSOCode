'use strict'

module.exports = {
  mailer: {
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASS
    }
  },
  mongoURI: process.env.MONGO_URI,
  sessionKey: process.env.SESSION_KEY
}