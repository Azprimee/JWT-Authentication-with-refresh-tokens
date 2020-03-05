import User from '../models/User';
import jwt from 'jsonwebtoken';
import GenerateToken from '../middlewares/generateToken';
export default {
  async accesTokens(req, res) {
    const userParams = { id: req.user._id };
    const accessToken = await GenerateToken(userParams);
    const refreshToken = jwt.sign(userParams, process.env.REFRESH_SECRET, {
      expiresIn: '1d'
    });
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  },

  async refreshToken(req, res) {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(400);
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, user) => {
      if (err) res.sendStatus(403);
      const newToken = await GenerateToken({ id: user.id });
      res.json({ Newtoken: newToken });
    });
  },

  async register(req, res, next) {
    const user = await new User({
      email: req.body.email,
      password: req.body.password
    }).save();

    return res.status(200).send(`User created ${user}`);
  }
};
