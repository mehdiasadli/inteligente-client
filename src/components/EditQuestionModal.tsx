import { Button, NumberInput, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { TypeOf, z } from 'zod';
import { PopulatedQuestion } from '../lib/types';
import { useUpdateQuestion } from '../services/question/question.hooks';
import { normalizeAnswer } from '../utils/normalizeAnswer';

const schema = z.object({
  title: z.string().min(5, 'Sual mətni ən azı 5 simvoldan ibarət olmalıdır'),
  description: z.string().optional(),
  answers: z.string().min(1, 'Cavab(lar) doldurulmalıdır'),
  difficulty: z
    .number()
    .min(1, 'Çətinlik minimum 1 ola bilər')
    .max(10, 'Çətinlik maksimum 10 ola bilər'),
});

export type EditUserType = TypeOf<typeof schema>;

export default function EditQuestionModal({ question }: { question: PopulatedQuestion }) {
  const form = useForm({
    initialValues: {
      title: question.title,
      description: question.description || '',
      difficulty: question.difficulty,
      answers: question?.answers?.join(',') || '',
    },
    validate: zodResolver(schema),
    transformValues: (values) => {
      const arrAnswers = values.answers
        .split(',')
        .map((answer) => normalizeAnswer(answer.toLowerCase().trim()));
      return { ...values, answers: arrAnswers };
    },
  });
  const { mutate, isLoading } = useUpdateQuestion();

  function onSuccess(values: any) {
    mutate({ id: question._id, data: values });
  }
  return (
    <form onSubmit={form.onSubmit(onSuccess)}>
      <Stack>
        <TextInput label='Sual' placeholder='Sual mətnini daxil edin' {...form.getInputProps('title')} />
        <Textarea
          label='Qeyd'
          placeholder='Sualın qeydini daxil edin'
          autosize
          {...form.getInputProps('description')}
          maxRows={10}
        />
        <NumberInput
          label='Çətinlik'
          placeholder='Sualın çətinliyini daxil edin'
          min={1}
          max={10}
          {...form.getInputProps('difficulty')}
        />
        <TextInput
          label='Cavab(lar)'
          placeholder='Cavab(lar)ı daxil edin'
          description='Əgər sualın birdən çox doğru sayıla biləcək cavabı varsa, o cavabları vergüllərlə ayıraraq yazın. Məsələn: rusiya,rusya,rusia və s.'
          {...form.getInputProps('answers')}
        />
        <Button loading={isLoading} mt={10} mx='auto' w='min(30rem, 100%)' type='submit'>
          Əlavə et
        </Button>
      </Stack>
    </form>
  );
}
