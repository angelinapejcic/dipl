const bcrypt = require('bcrypt');
const usersModel = require('../models/usersModel')
const mongoUtils = require('../_helpers/mongoUtils')

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    getUserForLogin
};

async function getUserForLogin(data) {

    const user = await usersModel.findOne({ "email": data.email }).lean();

    if (user) {
        const validPass = await bcrypt.compareSync(data.password, user.password);
        if (validPass) {
            return user;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

async function getUsers(options) {
    return mongoUtils(usersModel, {}, options.page, options.perPage);
}

async function createUser(data) {
    const query = await usersModel.find({ $or: [{ username: data.username }, { email: data.email }] });
    if (query && query.length) {
        return { success: false, reason: 'User already exist' };
    }

    let salt = await bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(data.password, salt);

    const newUser =
    {
        ...data,
        password: hash
    }

    return new usersModel(newUser).save();
}

async function deleteUser(id) {
    return usersModel.deleteOne({ _id: id })
}

async function updateUser(id, data) {
    return usersModel.findByIdAndUpdate({ _id: id }, data, {new: true})
}


