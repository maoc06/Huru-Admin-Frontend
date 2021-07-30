import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from 'react-pro-sidebar';
import { Inbox, PeopleAlt, DriveEta, ExitToApp } from '@material-ui/icons';
import 'react-pro-sidebar/dist/css/styles.css';

import { useAuth } from '../../../lib/auth';
import { useNav } from '../../../lib/nav';
import { UserHeader } from '../../modules';
import styles from './LateralPanel.module.css';

export default function LateralPanel() {
  const auth = useAuth();
  const nav = useNav();

  return (
    <ProSidebar width={'100%'} className={styles.sidebar}>
      <SidebarHeader className={styles.inner}>
        <UserHeader />
      </SidebarHeader>

      <SidebarContent className={styles.inner}>
        <Menu>
          <MenuItem
            active={nav.active === 'inbox'}
            onClick={() => {
              nav.navigate('inbox');
            }}
            icon={<Inbox />}
          >
            Bandeja de entrada
          </MenuItem>

          <MenuItem
            active={nav.active === 'users'}
            onClick={() => {
              nav.navigate('users');
            }}
            icon={<PeopleAlt />}
          >
            Usuarios
          </MenuItem>

          <MenuItem
            active={nav.active === 'cars'}
            onClick={() => {
              nav.navigate('cars');
            }}
            icon={<DriveEta />}
          >
            Vehículos
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter className={styles.inner}>
        <Menu onClick={auth.signout}>
          <MenuItem icon={<ExitToApp />}>Cerrar sesión</MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}
