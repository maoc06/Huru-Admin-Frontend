/* eslint-disable import/no-anonymous-default-export */
import db from '../../../lib/firebase-admin';

export default async (req, res) => {
  const { uid } = req.query;

  try {
    if (req.method === 'GET') {
      const doc = await db.collection('users').doc(uid).get();
      if (!doc.exists) res.status(404).end();
      else res.status(200).json(doc.data());
    }
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};
