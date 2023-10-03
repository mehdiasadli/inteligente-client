import { Button, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TypeOf, z } from 'zod';
import { useCreateField } from '../services/field/field.hooks';

const schema = z.object({
  name: z.string().min(5, 'Kateqoriyanın adı 5 simvoldan uzun olmalıdır'),
  description: z.string().optional(),
});

export type FieldType = TypeOf<typeof schema>;

export default function CreateField() {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
    },
    validate: zodResolver(schema),
  });
  const { mutate, isLoading } = useCreateField(form.reset);

  function onSuccess(values: any) {
    mutate(values);
  }

  return (
    <form onSubmit={form.onSubmit(onSuccess)}>
      <Stack>
        <Title>Kateqoriya yarat</Title>
        <TextInput
          label='Ad'
          placeholder='Kateqoriyanın adını daxil edin'
          description='Kateqoriya müxtəlif mövzuları özündə cəmləşdirən, daha böyük bir qrupdur. Məsələn, "Dünya Tarixi", "Azərbaycan Tarixi", "Yeni Tarix" və s. kimi mövzuları Tarix kateqoriyasında toplamaq olar. Bu səbəbdən, mövzunu yaratmazdan əvvəl kateqoriya yaratmaq şərtdir.'
          {...form.getInputProps('name')}
        />
        <Textarea
          label='Qeyd'
          placeholder='Kateqoriyanın qeydini (Əgər varsa) daxil edin'
          description='Bu qeyd, oyunçular oynamaq üçün bu kateqoriyanı seçəndə onlara göstəriləcək.'
          autosize
          {...form.getInputProps('description')}
          maxRows={10}
        />
        <Button loading={isLoading} mt={10} mx='auto' w='min(30rem, 100%)' type='submit'>
          Əlavə et
        </Button>
      </Stack>
    </form>
  );
}
