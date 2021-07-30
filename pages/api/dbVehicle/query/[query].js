/* eslint-disable import/no-anonymous-default-export */
import client from '../../client';

const endpoint = '/car';

export default async (req, res) => {
  const { query } = req.query;

  try {
    const { data } = await client.get(`${endpoint}/query/${query}`);
    if (data.data) res.status(200).json(data.data);
    else res.status(200).json(data);
  } catch (error) {
    res.status(400).end();
  }
};
