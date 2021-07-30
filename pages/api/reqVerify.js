/* eslint-disable import/no-anonymous-default-export */
import db from '../../lib/firebase-admin';

const MAIN_COLLECTION = 'req_verify';
const REQ_DATE = 'req_date';
const IMAGES_COLLECTION = 'images';

export default async (req, res) => {
  try {
    let data = [];

    const requestUser = await db
      .collection(MAIN_COLLECTION)
      .orderBy(REQ_DATE)
      .get();

    await Promise.all(
      requestUser.docs.map(async (entry) => {
        let row = {};
        const raw = entry.data();

        if (raw.type === 'verify-account') {
          row = {
            id: raw.uid,
            type: raw.type,
            reqDate: raw.req_date,
            data: {
              user: {
                uid: raw.uid,
                name: raw.name,
                lastName: raw.last_name,
                email: raw.email,
                cc: raw.cc,
                phone: raw.phone,
                birthDay: raw.birthday,
                pictureUrl: raw.picture,
              },
            },
          };
        } else {
          let images = [];

          const resImages = await db
            .collection(MAIN_COLLECTION)
            .doc(raw.id.toString())
            .collection(IMAGES_COLLECTION)
            .get();

          resImages.docs.map((image) => {
            const { url } = image.data();
            images.push(url);
          });

          row = {
            id: raw.id,
            type: raw.type,
            reqDate: raw.req_date,
            data: {
              user: {
                uid: raw.uid,
                name: raw.name,
                lastName: raw.last_name,
                email: raw.email,
                cc: raw.cc,
                phone: raw.phone,
                birthDay: raw.birthday,
                pictureUrl: raw.picture,
              },
              car: {
                id: raw.id,
                maker: raw.maker,
                model: raw.model,
                year: raw.year,
                odometer: raw.odometer,
                plate: raw.plate,
                plateCity: raw.plate_city,
                vin: raw.vin,
                images,
              },
            },
          };
        }

        data.push(row);
        return;
      })
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(400).end();
  }
};
