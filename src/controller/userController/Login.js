import auth from "../../common/auth.js";
import userModel from "../../model/UserDetails.js";

const login = async (req, res) => {
  // console.log("hi");
  // console.log(req.body);
  try {
    const user = await userModel.findOne({ email: req.body.mail })
    if (user) {
      const hashCompare = await auth.hashCompare(req.body.password, user.password);
      if (hashCompare) {
        const token = await auth.creatToken({
          id: user._id,
          username: user.username,
          email: user.email
        })
        res.status(200).send({ message: 'login successfully', token: token })
      } else {
        res.status(400).send({ message: 'password incorrect' })
      }
    } else {
      res.status(400).send({ message: `${req.body.mail} is not exist` })
    }
  } catch (error) {
    res.status(500).send({ message: 'internal server error', error: error.message })
  }
}



export default { login }