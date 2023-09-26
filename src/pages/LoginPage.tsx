import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TypeOf, z } from 'zod';
import { useToast } from '../hooks/useToast';
import { useLogin } from '../services/auth/auth.hooks';

const schema = z.object({
  username: z.string().min(1, 'İstifadəçi adı doldurulmalıdır'),
  password: z.string().min(1, 'Şifrə doldurulmalıdır'),
});

export type LoginType = TypeOf<typeof schema>;

export default function LoginPage() {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      username: '',
      password: '',
    },
  });
  const { mutate, isLoading } = useLogin();
  const { clean } = useToast();

  function onSubmit(values: any) {
    clean();
    mutate(values);
  }

  return (
    <form style={{ width: '100%' }} onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label='İstifadəçi adı'
          placeholder='İstifadəçi adınızı daxil edin'
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label='Şifrə'
          placeholder='Şifrənizi daxil edin'
          {...form.getInputProps('password')}
        />
        <Button
          disabled={Object.values(form.values).some((e) => !e)}
          loading={isLoading}
          type='submit'
        >
          Daxil ol
        </Button>
      </Stack>
    </form>
  );
}
