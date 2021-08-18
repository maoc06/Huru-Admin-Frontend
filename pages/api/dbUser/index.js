/* eslint-disable import/no-anonymous-default-export */
import client from '../client';

const endpoint = '/user';

export default async (req, res) => {
  try {
    if (req.method === 'PATCH') {
      const { accessToken, uuid, status } = req.body;

      const { data } = await client.patch(
        `${endpoint}/status`,
        { uuid, status },
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
