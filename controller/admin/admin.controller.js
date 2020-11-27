
const User = require('../.././model/User');

module.exports = {
    profile : async (req, res, next) => {

        res.status(200).json({ user: req.user})
    }
}