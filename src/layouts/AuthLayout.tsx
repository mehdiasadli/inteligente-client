import { Button, Center, Mark, Paper, Stack, Title } from '@mantine/core';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AuthLayout() {
  const { pathname } = useLocation();

  const isLoginPage = pathname.includes('login');

  return (
    <Center w='100vw' h='100vh'>
      <Paper
        shadow={'sm'}
        sx={(theme) => ({
          width: 'min(30rem, 90%)',
          padding: 30,
          [theme.fn.smallerThan('xs')]: { padding: 10 },
        })}
      >
        <Stack align='center'>
          <Title>
            {isLoginPage ? (
              <>
                Hesabınıza <Mark color='green'>Daxil</Mark> olun
              </>
            ) : (
              <>
                Yeni hesab <Mark color='cyan'>Yaradın</Mark>
              </>
            )}
          </Title>
          <Outlet />
          <Button
            variant='default'
            component={Link}
            color={isLoginPage ? 'green' : 'cyan'}
            to={isLoginPage ? '/auth/register' : '/auth/login'}
            sx={(theme) => ({ width: '80%', [theme.fn.smallerThan('sm')]: { width: '100%' } })}
          >
            {isLoginPage ? 'Qeydiyyatdan keçin' : 'Daxil olun'}
          </Button>
        </Stack>
      </Paper>
    </Center>
  );
}
