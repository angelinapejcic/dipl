const usersService = require('../service/usersService')
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    try {
    } catch (e) {
        return next(e)
    }
    const data = {
        password: req.body.password,
        email: req.body.email
    }
    const user = await usersService.getUserForLogin(data);
    if (user) {
        const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
        res.json({ token: token });
    }
    else {
        res.status(401).json();
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            const newToken = jwt.sign({ user: payload.user }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

            return res.status(200).json({ token: newToken });
        });
    } catch (e) {
        return next(e)
    }
}


exports.getUsers = async (req, res, next) => {
    try {
        let options;
        if (req.query && req.query.page && req.query.perPage) {
            options =
            {
                page: req.query.page,
                perPage: req.query.perPage
            }
        }
        else {
            options =
            {
                page: 1,
                perPage: 10
            }
        }

        const users = await usersService.getUsers(options);
        res.status(200).json(users);
    } catch (e) {
        return next(e)
    }
}


exports.createUser = async (req, res, next) => {
    try {
        const data =
        {
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role,
        }

        const user = await usersService.createUser(data);
        if (user && user.success === false) {
            return res.status(400).json(user.reason);
        }
        res.status(200).json(user);
    } catch (e) {
        return next(e)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await usersService.deleteUser(req.params.id);
        res.status(200).json(deletedUser);
    } catch (e) {
        return next(e)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data =
        {
            ...req.body,
            updateDate: new Date()
        }

        const updatedUser = await usersService.updateUser(id, data);
        res.status(200).json(updatedUser);
    } catch (e) {
        return next(e)
    }
}

exports.registerGuest = async (req, res, next) => {
    try {
        const data =
        {
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: 'guest',
        }

        const user = await usersService.createUser(data);
        if (user && user.success === false) {
            return res.status(400).json(user.reason);
        }
        res.status(200).json(user);
    } catch (e) {
        return next(e)
    }
}
