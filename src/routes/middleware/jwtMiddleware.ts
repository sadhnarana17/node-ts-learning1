import * as jwt from 'jsonwebtoken';

const config = process.env;

const authenticate = (req, res, next): Promise<any> => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
    return next();
  }
  return res.status(401).send('Invalid Token');
};

export default authenticate;
