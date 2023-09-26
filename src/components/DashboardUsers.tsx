import { Grid } from '@mantine/core';
import { USER_ROLE } from '../lib/types';
import { useUsers } from '../services/user/user.hooks';
import DashboardUserCard from './DashboardUserCard';

export default function DashboardUsers() {
  const { data, isLoading } = useUsers();

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <Grid gutter={'sm'}>
      {data?.length &&
        data
          .filter((user) => user.role !== USER_ROLE.ADMIN)
          .map((user) => (
            <Grid.Col key={user._id} lg={3} md={4} sm={6} xs={12}>
              <DashboardUserCard user={user} />
            </Grid.Col>
          ))}
    </Grid>
  );
}
