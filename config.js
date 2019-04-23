'use strict'

module.exports = {
	mailer: {
		service: 'Gmail',
		auth: {
			user: process.env.GMAIL_USERNAME,
			pass: process.env.GMAIL_PASS,
		},
	},
	mongoURI:
		'mongodb://erictsocode:eric@cluster0-shard-00-00-wr4fu.mongodb.net:27017,cluster0-shard-00-01-wr4fu.mongodb.net:27017,cluster0-shard-00-02-wr4fu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
	sessionKey: 'mySecretKey24'
};