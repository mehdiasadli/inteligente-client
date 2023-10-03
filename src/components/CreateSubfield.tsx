import { Button, Select, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TypeOf, z } from 'zod';
import { useFields } from '../services/field/field.hooks';
import { useCreateSubfield } from '../services/subfield/subfield.hooks';

const schema = z.object({
  name: z.string().min(3, 'Mövzunun adı 3 simvoldan uzun olmalıdır'),
  field: z.string().min(1, 'Kateqoriya doldurulmalıdır'),
  description: z.string().optional(),
});

export type SubfieldType = TypeOf<typeof schema>;

export default function CreateSubfield() {
  const form = useForm({
    initialValues: {
      name: '',
      field: '',
      description: '',
    },
    validate: zodResolver(schema),
  });
  const { data } = useFields();
  const { mutate, isLoading } = useCreateSubfield(form.reset);

  function onSuccess(values: any) {
    mutate(values);
  }

  return (
    <form onSubmit={form.onSubmit(onSuccess)}>
      <Stack>
        <Title>Mövzu yarat</Title>
        <TextInput
          label='Ad'
          placeholder='Mövzunun adını daxil edin'
          description='Mövzu sualları özündə cəmləşdirən bir qrupdur. Məsələn, Fiziki Coğrafiya mövzusunda suallar yaratmaq olar. Sualları yaratmazdan öncə Mövzu (ondan da öncə Kateqoriya) yaratmaq şərtdir.'
          {...form.getInputProps('name')}
        />
        <Textarea
          label='Qeyd'
          placeholder='Mövzunun qeydini (Əgər varsa) daxil edin'
          description='Bu qeyd, oyunçular oynamaq üçün bu mövzunu seçəndə onlara göstəriləcək.'
          autosize
          {...form.getInputProps('description')}
          maxRows={10}
        />
        <Select
          label='Kateqoriya'
          placeholder='Mövzunun hansı kateqoriyaya aid olduğunu seçin'
          data={data ? data.map((item) => ({ value: item._id, label: item.name })) : []}
          disabled={!Boolean(data?.length)}
          searchable
          nothingFound='Kateqoriya tapılmadı'
          {...form.getInputProps('field')}
        />
        <Button
          disabled={!Boolean(data?.length)}
          loading={isLoading}
          mt={10}
          mx='auto'
          w='min(30rem, 100%)'
          type='submit'
        >
          Əlavə et
        </Button>
      </Stack>
    </form>
  );
}
