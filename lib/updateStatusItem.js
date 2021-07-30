import { useState } from 'react';
const { createContext, useContext } = require('react');

const statusItemContext = createContext();

export function StatusItemProvider({ children }) {
  const statusItem = useUpdateStatusItem();
  return (
    <statusItemContext.Provider value={statusItem}>
      {children}
    </statusItemContext.Provider>
  );
}

export const useStatusItem = () => {
  return useContext(statusItemContext);
};

function useUpdateStatusItem() {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);

  const setCarsResults = (results) => {
    setCars(results);
  };

  const setUsersResults = (results) => {
    setUsers(results);
  };

  const updateStatusCar = ({ carId, status }) => {
    const carIndex = cars.findIndex((car) => car.carId === carId);
    let newCars = [...cars];
    newCars[carIndex] = { ...newCars[carIndex], status };
    setCars(newCars);
  };

  const updateStatusUser = ({ uuid, status }) => {
    const userIndex = users.findIndex((user) => user.uuid === uuid);
    let newUsers = [...users];
    newUsers[userIndex] = { ...newUsers[userIndex], status };
    setUsers(newUsers);
  };

  return {
    cars,
    users,
    setCarsResults,
    setUsersResults,
    updateStatusCar,
    updateStatusUser,
  };
}
