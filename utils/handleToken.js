import jwt from 'jsonwebtoken';

const handleToken = (data) => {
  const privateKey = process.env.PRIVATE_KEY;
  const KEY = 'accessToken';

  const accessToken = jwt.sign({ data }, privateKey, {
    expiresIn: '10 days',
  });

  localStorage.setItem(KEY, accessToken);
};

export default handleToken;
