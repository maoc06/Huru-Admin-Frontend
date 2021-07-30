import axios from 'axios';
// import { useState } from 'react';

import { useStatusItem } from '../../../lib/updateStatusItem';
import { CardCar, SearchBar } from '../../modules';
import styles from './Cars.module.css';

export default function Cars({ onClickCar = () => {} }) {
  const statusItem = useStatusItem();
  // const [cars, setCars] = useState([]);

  const handleQuery = async (event) => {
    const query = event.target.value;
    if (query.length > 0) {
      const res = await axios.get(`/api/dbVehicle/query/${query}`);
      // if (res.data) setCars(res.data);
      if (res.data) statusItem.setCarsResults(res.data);
    } else {
      // setCars([]);
      statusItem.setCarsResults([]);
    }
  };

  return (
    <main className={styles.container}>
      <SearchBar placeholder="Buscar vehículo..." onChange={handleQuery} />

      {statusItem.cars.map((car) => (
        <CardCar key={car.id} data={{ ...car }} onClickCard={onClickCar} />
      ))}
    </main>
  );
}
