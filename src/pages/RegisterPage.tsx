import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TypeOf, z } from 'zod';
import { useToast } from '../hooks/useToast';
import { useRegister } from '../services/auth/auth.hooks';

const schema = z
  .object({
    username: z.string().min(3, 'İstifadəçi adı 3 simvoldan uzun olmalıdır'),
    firstName: z.string().min(3, 'Ad 3 simvoldan uzun olmalıdır'),
    lastName: z.string().min(3, 'Soyad 3 simvoldan uzun olmalıdır'),
    password: z.string().min(6, 'Şifrə 6 simvoldan uzun olmalıdır'),
    confirmPassword: z.string(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: 'Şifrələr uyğun deyil',
    path: ['confirmPassword'],
  });

export type RegisterType = TypeOf<typeof schema>;

export default function RegisterPage() {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { mutate, isLoading } = useRegister();
  const { clean } = useToast();

  function onSubmit(values: any) {
    clean();
    mutate(values);
  }

  return (
    <form style={{ width: '100%' }} onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Group grow>
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
        </Group>
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
        <PasswordInput
          label='Şifrəni təsdiqlə'
          placeholder='Şifrənizi yenidən daxil edin'
          {...form.getInputProps('confirmPassword')}
        />
        <Button
          loading={isLoading}
          disabled={Object.values(form.values).some((e) => !e)}
          color='cyan'
          type='submit'
        >
          Qeydiyyat
        </Button>
      </Stack>
    </form>
  );
}
