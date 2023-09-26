import { Burger, Button, Drawer, Flex, Group, Header, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconGraph,
  IconLayoutDashboard,
  IconPencilPlus,
  IconSchool,
  IconSmartHome,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { USER_ROLE } from '../lib/types';
import { useAuth } from '../store/hooks';
import UserMenu from './UserMenu';

const routes = [
  {
    label: 'Əsas Səhifə',
    link: '/',
    icon: <IconSmartHome size={15} />,
  },
  {
    label: 'Oyna',
    link: '/quiz',
    icon: <IconSchool size={15} />,
  },
  {
    label: 'Sıralama',
    link: '/stats',
    icon: <IconGraph size={15} />,
  },
];

export default function Navbar() {
  const [opened, { toggle, close }] = useDisclosure();
  const { user, role } = useAuth();
  const location = useLocation();

  useEffect(() => {
    close();
  }, [close, location.pathname]);

  if (!user) return <div></div>;

  const menuItems = (
    <>
      {routes.map((route) => (
        <Button
          leftIcon={route.icon || null}
          key={route.link}
          component={Link}
          to={route.link}
          variant='subtle'
        >
          {route.label}
        </Button>
      ))}
      {role !== USER_ROLE.MEMBER && (
        <Button
          variant='subtle'
          component={Link}
          to={'/create'}
          leftIcon={<IconPencilPlus size={15} />}
          color='cyan'
        >
          Yarat
        </Button>
      )}
      {role === USER_ROLE.ADMIN && (
        <Button
          variant='subtle'
          component={Link}
          to={'/dashboard'}
          leftIcon={<IconLayoutDashboard size={15} />}
          color='cyan'
        >
          Panel
        </Button>
      )}
    </>
  );

  return (
    <Header height={50}>
      <Flex h='100%' align='center' justify='space-between' px={25}>
        <Burger
          size='sm'
          opened={opened}
          onClick={toggle}
          sx={(theme) => ({ display: 'none', [theme.fn.smallerThan('sm')]: { display: 'block' } })}
        />
        <Group sx={(theme) => ({ [theme.fn.smallerThan('sm')]: { display: 'none' } })}>
          {menuItems}
        </Group>
        <Group>
          <UserMenu />
        </Group>
      </Flex>

      <Drawer opened={opened} onClose={close} overlayProps={{ opacity: 0.5, blur: 4 }}>
        <Stack>{menuItems}</Stack>
      </Drawer>
    </Header>
  );
}
