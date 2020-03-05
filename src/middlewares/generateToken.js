import jwt from 'jsonwebtoken';

export default async function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 15000 });
}
