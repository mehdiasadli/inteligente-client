import { Button, Card, SegmentedControl, Select, Stack, Text, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect } from 'react';
import { TypeOf, z } from 'zod';
import { useFields } from '../services/field/field.hooks';
import { useQuestions } from '../services/question/question.hooks';
import { useStartQuiz } from '../services/quiz/quiz.hooks';
import { useSubfields } from '../services/subfield/subfield.hooks';
import { useAuth } from '../store/hooks';
import { isPlayable } from '../utils/isPlayable';

const schema = z.object({
  field: z.string().min(1, 'Field is required'),
  subfield: z.string().min(1, 'Subfield is required'),
  mode: z.enum(['Easy', 'Medium', 'Hard'], {
    invalid_type_error: "Allowed modes are 'Easy', 'Medium', and 'Hard'",
    required_error: 'Mode is required',
  }),
});

export type QuizType = TypeOf<typeof schema>;

export default function QuizForm() {
  const form = useForm({
    initialValues: {
      field: '',
      subfield: '',
      mode: 'Medium',
    },
    validate: zodResolver(schema),
  });
  const { user } = useAuth();
  const { data: fields } = useFields();
  const {
    data: subfields,
    isLoading: subfieldsLoading,
    isFetching: subfieldsFetching,
    refetch,
  } = useSubfields(form.values.field);
  const { data: questions, refetch: fetchQuestions } = useQuestions({
    field: form.values.field,
    subfield: form.values.subfield,
  });
  const { mutate, isLoading } = useStartQuiz();

  function onSuccess(values: any) {
    if (user) {
      mutate({ ...values, user: user._id });
    }
  }

  useEffect(() => {
    if (form.values.field) {
      refetch();
    }
  }, [form.values.field, refetch]);

  useEffect(() => {
    if (form.values.field && form.values.subfield) {
      fetchQuestions();
    }
  }, [form.values.field, form.values.subfield, fetchQuestions]);

  return (
    <form onSubmit={form.onSubmit(onSuccess)}>
      <Card>
        <Stack>
          <Title ta='center'>Oyuna Başla</Title>
          <Select
            label='Kateqoriya'
            description={
              form.values.field && fields?.find((f) => f._id === form.values.field)?.description
            }
            placeholder='Kateqoriya seçin'
            data={fields ? fields.map((item) => ({ value: item._id, label: item.name })) : []}
            disabled={!Boolean(fields?.length)}
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
            placeholder='Mövzu seçin'
            description={
              form.values.subfield &&
              subfields?.find((f) => f._id === form.values.subfield)?.description
            }
            data={subfields ? subfields.map((item) => ({ value: item._id, label: item.name })) : []}
            disabled={!Boolean(subfields?.length) || subfieldsLoading || subfieldsFetching}
            searchable
            nothingFound='Mövzu tapılmadı'
            {...form.getInputProps('subfield')}
          />
          <SegmentedControl
            data={[
              {
                value: 'Easy',
                label: 'Asan',
              },
              {
                value: 'Medium',
                label: 'Orta',
              },
              {
                value: 'Hard',
                label: 'Çətin',
              },
            ]}
            {...form.getInputProps('mode')}
          />
          <Button
            disabled={
              !Boolean(fields?.length) || !questions || !isPlayable(questions, form.values.subfield)
            }
            loading={isLoading}
            mt={10}
            mx='auto'
            w='min(30rem, 100%)'
            type='submit'
          >
            Başla
          </Button>
          {questions && form.values.subfield && !isPlayable(questions, form.values.subfield) && (
            <Text ta='center' mt={-12} fz={12} color='red' fs='italic'>
              Mövzu hal-hazırda aktiv deyil
            </Text>
          )}
        </Stack>
      </Card>
    </form>
  );
}
