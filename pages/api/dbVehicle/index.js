/* eslint-disable import/no-anonymous-default-export */
import client from '../client';

const endpoint = '/car';

export default async (req, res) => {
  try {
    if (req.method === 'PUT') {
      const { accessToken, carId, status } = req.body;

      const { data } = await client.put(
        endpoint,
        { carId, status },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      res.status(200).json(data);
    }
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};
