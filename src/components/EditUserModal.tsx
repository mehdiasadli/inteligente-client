import { Button, SegmentedControl, Stack, Text, TextInput, useMantineTheme } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TypeOf, z } from 'zod';
import { User, USER_ROLE } from '../lib/types';
import { useUpdateUser } from '../services/user/user.hooks';

const schema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters long'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters long'),
});

export type EditUserType = TypeOf<typeof schema>;

export default function EditUserModal({
  user,
  isAdmin = false,
}: {
  user: User;
  isAdmin?: boolean;
}) {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
    },
    validate: zodResolver(schema),
    transformValues: (values) => {
      return { firstName: values.firstName, lastName: values.lastName };
    },
  });
  const { mutate, isLoading } = useUpdateUser(isAdmin);

  function onSuccess(values: any) {
    mutate({ id: user._id, data: values });
  }

  return (
    <form onSubmit={form.onSubmit(onSuccess)}>
      <Stack>
        <TextInput
          label='Ad'
          placeholder='Adınızı daxil edin'
          {...form.getInputProps('firstName')}
        />
        <TextInput
          label='Soyad'
          placeholder='Soyadınızı daxil edin'
          {...form.getInputProps('lastName')}
        />
        <TextInput
          disabled
          label='İstifadəçi adı'
          description='İstifadəçi adınızı dəyişmək mümkün deyil'
          placeholder='İstifadəçi adınızı daxil edin'
          {...form.getInputProps('username')}
        />
        {isAdmin && (
          <>
            <Text fw='bold' ta='center' fz={16}>
              Rol
            </Text>
            <SegmentedControl
              mt={-10}
              styles={{
                label: {
                  cursor: 'default',
                },
              }}
              color={theme.primaryColor}
              value={user.role}
              data={[USER_ROLE.MEMBER, USER_ROLE.MOD, USER_ROLE.ADMIN]}
            />
          </>
        )}

        <Button
          disabled={!form.isDirty('firstName') && !form.isDirty('lastName')}
          variant='light'
          loading={isLoading}
          type='submit'
        >
          Təsdiqlə
        </Button>
      </Stack>
    </form>
  );
}
