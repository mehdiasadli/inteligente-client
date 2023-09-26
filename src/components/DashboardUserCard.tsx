import {
  Badge,
  Button,
  Flex,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserCancel, IconUserCheck, IconUserEdit } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '../hooks/useConfirm';
import { User, USER_ROLE } from '../lib/types';
import { useChangeRole, useDeleteUser } from '../services/user/user.hooks';
import EditUserModal from './EditUserModal';

const roleMap: Record<USER_ROLE, string> = {
  [USER_ROLE.MEMBER]: 'outline',
  [USER_ROLE.MOD]: 'light',
  [USER_ROLE.ADMIN]: 'filled',
};

export default function DashboardUserCard({ user }: { user: User }) {
  const { mutate: changeRole, isLoading: changeRoleLoading } = useChangeRole();
  const { mutate: deleteUser, isLoading: deleteUserLoading } = useDeleteUser();
  const openConfirm = useConfirm();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const theme = useMantineTheme();

  function onChange() {
    const newRole = user.role === USER_ROLE.MEMBER ? USER_ROLE.MOD : USER_ROLE.MEMBER;

    changeRole({ id: user._id, data: { role: newRole } });
  }

  function onDelete() {
    openConfirm({
      title: 'Bu istifadəçini silmək istədiyinizdən əminsiniz?',
      confirm: 'Sil',
      color: 'red',
      onConfirm: () => {
        deleteUser({ id: user._id });
      },
    });
  }

  function onEdit() {
    open();
  }

  return (
    <Paper shadow='sm' p={10} withBorder>
      <Stack>
        <Flex align='center' justify='space-between'>
          <Stack
            sx={{ cursor: 'pointer' }}
            spacing={0}
            onClick={() => navigate('/user/' + user._id)}
          >
            <Title order={4}>
              {user.firstName} {user.lastName}
            </Title>
            <Text fz={12} color='dimmed'>
              @{user.username}
            </Text>
          </Stack>
          <Badge
            size='xs'
            ml={10}
            color={changeRoleLoading ? 'gray' : theme.primaryColor}
            variant={roleMap[user.role]}
          >
            {user.role}
          </Badge>
        </Flex>
        <Stack spacing={5}>
          <Button
            leftIcon={<IconUserEdit size={16} />}
            variant='default'
            disabled={deleteUserLoading}
            onClick={onEdit}
          >
            Düzəliş et
          </Button>
          {user.role !== USER_ROLE.ADMIN && (
            <>
              <Button
                leftIcon={<IconUserCheck size={16} />}
                variant='default'
                loading={changeRoleLoading}
                disabled={deleteUserLoading}
                onClick={onChange}
              >
                {user.role === USER_ROLE.MEMBER ? 'Moderator et' : 'Member et'}
              </Button>
              <Button
                leftIcon={<IconUserCancel size={16} />}
                variant='default'
                onClick={onDelete}
                loading={deleteUserLoading}
              >
                Sil
              </Button>
            </>
          )}
        </Stack>
      </Stack>

      <Modal opened={opened} onClose={close}>
        <EditUserModal user={user} isAdmin />
      </Modal>
    </Paper>
  );
}
