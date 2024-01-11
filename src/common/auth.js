import bcrypt from 'bcryptjs';
import Jwt  from 'jsonwebtoken';
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    return hash
}
const creatToken = async (payload) => {
    const d = new Date();
    const token = await Jwt.sign(payload, process.env.SECRET_STRING, {
        expiresIn: '60m'
    });
    return token;
}
const hashCompare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

const validate = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
        const decodeToken = await Jwt.decode(token);
        const curTime = (+ new Date()) / 1000;
        // console.log(curTime);
        // console.log(decodeToken.exp);
        if (curTime < decodeToken.exp) {
            next()
        } else {
            res.status(400).send({ message: 'token expired' })
        }
    } else {

        res.status(400).send({ message: 'No token found' })
    }
}

export default { hashPassword, creatToken, hashCompare, validate }