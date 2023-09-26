import { Button, Card, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserCancel, IconUserEdit } from '@tabler/icons-react';
import EditUserModal from '../components/EditUserModal';
import { useConfirm } from '../hooks/useConfirm';
import { useDeleteUser } from '../services/user/user.hooks';
import { useAuth } from '../store/hooks';

export default function ProfilePage() {
  const { user } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const openConfirm = useConfirm();
  const { mutate: deleteUser, isLoading: deleteUserLoading } = useDeleteUser(true);

  if (!user) return <div></div>;

  function onDelete() {
    openConfirm({
      title: 'İstifadəçini silmək istədiyinizə əminsiniz?',
      confirm: 'Sil',
      color: 'red',
      onConfirm: () => {
        deleteUser({ id: user?._id as string });
      },
    });
  }

  function onEdit() {
    open();
  }

  return (
    <Stack>
      <Group>
        <Card>
          <Stack>
            <Title>
              {user.firstName} {user.lastName}
            </Title>
            <Text mt={-15}>@{user.username}</Text>
            <Button
              loading={deleteUserLoading}
              onClick={onEdit}
              leftIcon={<IconUserEdit size={16} />}
            >
              İstifadəçini tənzimlə
            </Button>
            <Button
              color='red'
              leftIcon={<IconUserCancel size={16} />}
              onClick={onDelete}
              loading={deleteUserLoading}
            >
              İstifadəçini sil
            </Button>
          </Stack>
        </Card>
      </Group>

      <Modal opened={opened} onClose={close}>
        <EditUserModal user={user} />
      </Modal>
    </Stack>
  );
}
