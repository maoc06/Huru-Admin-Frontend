/* eslint-disable import/no-anonymous-default-export */
import db from '../../../lib/firebase-admin';

const COLLECTION_CAR_VERIFIED = 'car_verified';
const COLLECTION_USERS = 'users';

export default async (req, res) => {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const doc = await db.collection(COLLECTION_CAR_VERIFIED).doc(id).get();

      const data = doc.data();
      const { verified_by } = data;

      const userDoc = await db
        .collection(COLLECTION_USERS)
        .doc(verified_by)
        .get();
      const user = userDoc.data();

      if (!doc.exists) res.status(404).end();
      else
        res.status(200).json({
          verifiedAt: data.verified_at,
          verifiedBy: {
            firstName: user.name,
            lastName: user.last_name,
            uid: verified_by,
          },
        });
    }
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};
