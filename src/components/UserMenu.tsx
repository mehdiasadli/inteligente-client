import { Button, Menu } from '@mantine/core';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useLogout } from '../services/auth/auth.hooks';
import { useAuth } from '../store/hooks';

export default function UserMenu() {
  const { user } = useAuth();
  const logout = useLogout();

  if (!user) return <div></div>;

  return (
    <Menu shadow='md' width={150} position='bottom-end' offset={5}>
      <Menu.Target>
        <Button variant='light'>
          {user.firstName} {user.lastName}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component={Link} to='/profile' icon={<IconUser size={14} />}>
          Profil
        </Menu.Item>
        <Menu.Item component={Link} to='/settings' icon={<IconSettings size={14} />}>
          Parametrlər
        </Menu.Item>
        <Menu.Item onClick={logout} icon={<IconLogout color='red' size={14} />}>
          Çıxış
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
