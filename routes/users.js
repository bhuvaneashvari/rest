const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req ,res) => {
	try{
		const users =  await User.find() 
		res.json(users)
	} catch(err) {
		res.status(500).json({ message: err.message })
	}

})

router.get('/:id', getUser, (req ,res) => {
	res.send(res.user.name)
})

router.post('/', async (req ,res) => {
	const user = new User({
		name: req.body.name,
		tech: req.body.tech,
	})
	try {
		const newUser = await user.save()
		res.status(201).json(newUser)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})


async function getUser(req, res, next) {
let user
	try{
		user = await User.findById(req.params.id)
		if(user == null)
		{
			return res.status(404).json({ message: 'not available'})
		}
	} catch(err) {
		res.status(500).json({ message: err.message })
	}
	res.user = user
	next()
}

module.exports = router
