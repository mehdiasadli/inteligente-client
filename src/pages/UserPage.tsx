import { Card, Group, Stack, Text, Title } from '@mantine/core';
import { Navigate, useParams } from 'react-router-dom';
import { useUser } from '../services/user/user.hooks';

import { useAuth } from '../store/hooks';

export default function UserPage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const { data: user } = useUser(id as string);

  if (!currentUser || !user) return <div></div>;

  if (id && currentUser._id === id) {
    return <Navigate to='/profile' replace />;
  }

  return (
    <Stack>
      <Group>
        <Card>
          <Title>
            {user.firstName} {user.lastName}
          </Title>
          <Text>@{user.username}</Text>
        </Card>
      </Group>
    </Stack>
  );
}
