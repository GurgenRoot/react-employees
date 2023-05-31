const {prisma} = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

/** 
  @route POST /api/user/login
  @desc login
  @access Public 
*/

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message: 'Please fill required fileds'})
    }

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    const isPasswordValid = user && (await bcrypt.compare(password, user.password));

    const secret = process.env.JWT_SECRET;

    if (user && isPasswordValid && secret) {
        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            token: jwt.sign({id: user.id}, secret, {expiresIn: '1h'})
        })
    } else {
        return res.status(400).json({ message: 'Incorrect password or login'})
    }
}


/** 
  @route POST /api/user/register
  @desc register
  @access Public 
*/

const register = async (req, res) => {
    const {email, password, name} = req.body;

    if(!email || !password || !name) {
        return res.send(400).json({message: 'Please fill valid fields'})
    }

    const registeredUser = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(registeredUser) {
        return res.status(400).json({message: 'user with this email already exists'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    });

    const secret = process.env.JWT_SECRET;

    if(user && secret) {
        res.status(201).json({
            id: user.id,
            email: user.email,
            name,
            token: jwt.sign({id: user.id}, secret, {expiresIn: '1h'})
        }) 
    } else {
        return res.status(400).json({ message: 'cannot create use' })
    }
}

const current = async (req, res) => {
    res.send('current');
}

module.exports = {
    login,
    register,
    current
}
