/* eslint-disable import/no-anonymous-default-export */
import db from '../../../lib/firebase-admin';

const MAIN_COLLECTION = 'req_verify';

export default async (req, res) => {
  const { id } = req.query;

  try {
    if (req.method === 'DELETE') {
      await db.collection(MAIN_COLLECTION).doc(id).delete();
    }
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};
