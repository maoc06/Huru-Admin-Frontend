/* eslint-disable import/no-anonymous-default-export */
import db from '../../../lib/firebase-admin';

const COLLECTION_USER_VERIFIED = 'user_verified';
const COLLECTION_USERS = 'users';

export default async (req, res) => {
  const { uid } = req.query;

  try {
    if (req.method === 'GET') {
      const doc = await db.collection(COLLECTION_USER_VERIFIED).doc(uid).get();

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
