import { Button, NumberInput, Select, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect } from 'react';
import { TypeOf, z } from 'zod';
import { useFields } from '../services/field/field.hooks';
import { useCreateQuestion } from '../services/question/question.hooks';
import { useSubfields } from '../services/subfield/subfield.hooks';
import { normalizeAnswer } from '../utils/normalizeAnswer';

const schema = z.object({
  title: z.string().min(5, 'Sual mətni 5 simvoldan uzun olmalıdır'),
  field: z.string().min(1, 'Kateqoriya doldurulmalıdır'),
  subfield: z.string().min(1, 'Mövzu doldurulmalıdır'),
  type: z.string().min(1, 'Sual tipi doldurulmaldır'),
  description: z.string().optional(),
  answers: z.string().min(1, 'Cavab(lar) doldurulmalıdır'),
  difficulty: z
    .number()
    .min(1, 'Çətinlik minimum 1 ola bilər')
    .max(10, 'Çətinlik maksimum 10 ola bilər'),
});

export type QuestionType = TypeOf<typeof schema>;

export default function CreateQuestion() {
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      field: '',
      subfield: '',
      type: 'OE',
      answers: '',
      difficulty: 5,
    },
    validate: zodResolver(schema),
    transformValues: (values) => {
      const arrAnswers = values.answers
        .split(',')
        .map((answer) => normalizeAnswer(answer.toLowerCase().trim()));
      return { ...values, answers: arrAnswers };
    },
  });
  const { data: fields } = useFields();
  const {
    data: subfields,
    isLoading: subfieldsLoading,
    isFetching: subfieldsFetching,
    refetch,
  } = useSubfields(form.values.field);
  const { mutate, isLoading } = useCreateQuestion(() => {
    form.setFieldValue('title', '');
    form.setFieldValue('description', '');
    form.setFieldValue('answers', '');
  });

  function onSuccess(values: any) {
    mutate(values);
  }

  useEffect(() => {
    if (form.values.field) {
      refetch();
    }
  }, [form.values.field, refetch]);

  return (
    <form onSubmit={form.onSubmit(onSuccess)}>
      <Stack>
        <Title>Yeni sual əlavə et</Title>
        <TextInput
          label='Sual'
          placeholder='Sual mətnini daxil edin'
          {...form.getInputProps('title')}
        />
        <Textarea
          label='Qeyd'
          placeholder='Sualın qeydini daxil edin'
          description='Oyunçulara bu sual barəsində, sualdan əlavə qeydlərini varsa buraya daxil edə bilərsiniz'
          autosize
          {...form.getInputProps('description')}
          maxRows={10}
        />
        <Select
          label='Kateqoriya'
          placeholder='Sualın kateqoriyasını seçin'
          data={fields ? fields.map((item) => ({ value: item._id, label: item.name })) : []}
          disabled={!Boolean(fields?.length) || subfieldsFetching}
          searchable
          nothingFound='Kateqoriya tapılmadı'
          {...form.getInputProps('field')}
          onChange={(e) => {
            form.setFieldValue('field', e || '');
            form.setFieldValue('subfield', '');
          }}
        />
        <Select
          label='Mövzu'
          placeholder='Sualın mövzusunu seçin'
          data={subfields ? subfields.map((item) => ({ value: item._id, label: item.name })) : []}
          disabled={!Boolean(subfields?.length) || subfieldsLoading}
          searchable
          nothingFound='Mövzu tapılmadı'
          {...form.getInputProps('subfield')}
        />
        <NumberInput
          label='Çətinlik'
          placeholder='Sualın çətinliyini daxil edin'
          description='Bütün oyunlar, xal sistemi sualların çətinliyi üzərindən aparılır. Suallar 1-lə (ən asan), 10 (ən çətin) arası çətinlikdə dəyişir. Mövzunun oynana bilməsi üçün hər çətinlikdə sualdan minimum 5 ədəd olmalıdır.'
          min={1}
          max={10}
          {...form.getInputProps('difficulty')}
        />
        <TextInput
          label='Düzgün cavab(lar)'
          placeholder='Düzgün cavab(lar)ı daxil edin'
          description='Əgər sualın birdən çox doğru sayıla biləcək cavabı varsa, o cavabları vergüllərlə ayıraraq yazın. Məsələn: rusiya,rusya,rusia və s. Nəzərə alın, boşluqlar cavabda nəzərə alınmır, yəni "Porto Novo" ilə "PortoNovo" eyni cavab sayılır. Böyük-kiçik hərflər cavabda nəzərə alınmır, yəni "McGregor" cavabı ilə "mcgREGor" cavabı eyni cavab sayılır'
          {...form.getInputProps('answers')}
        />
        <Button
          disabled={
            !Boolean(fields?.length) ||
            !Boolean(fields?.find((f) => f._id === form.values.field)?.subfields?.length)
          }
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
