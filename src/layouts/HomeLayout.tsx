import { Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <Container size='xl' my={15}>
        <Outlet />
      </Container>
    </>
  );
}
