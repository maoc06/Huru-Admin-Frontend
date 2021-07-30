import { useNav } from '../../../lib/nav';
import { Cars, Inbox, Users } from '../';

export default function CentralPanel({ setMessageSelected = () => {} }) {
  const nav = useNav();

  const renderCentralPanel = () => {
    const activeNav = nav.active.route;

    if (activeNav === 'inbox') {
      return <Inbox onClickMessage={setMessageSelected} />;
    } else if (activeNav === 'users') {
      return <Users onClickUser={setMessageSelected} />;
    } else if (activeNav === 'cars') {
      return <Cars onClickCar={setMessageSelected} />;
    }
  };

  return <>{renderCentralPanel()}</>;
}
