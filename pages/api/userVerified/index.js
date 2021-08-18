/* eslint-disable import/no-anonymous-default-export */
import jwt_decode from 'jwt-decode';
import db from '../../../lib/firebase-admin';

const COLLECTION_USER_VERIFIED = 'user_verified';

export default async (req, res) => {
  const { accessToken, uid } = req.body;

  try {
    const {
      data: { uid: verified_by },
    } = jwt_decode(accessToken);

    await db
      .collection(COLLECTION_USER_VERIFIED)
      .doc(uid)
      .set({ uid, verified_at: new Date(), verified_by });

    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};
