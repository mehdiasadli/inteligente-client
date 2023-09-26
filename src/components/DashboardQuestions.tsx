import { Badge, Button, Grid, Group, Select, Slider, Stack, Text, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect } from 'react';
import { TypeOf, z } from 'zod';
import { useFields } from '../services/field/field.hooks';
import { useQuestions } from '../services/question/question.hooks';
import { useSubfields } from '../services/subfield/subfield.hooks';
import { isPlayable } from '../utils/isPlayable';
import DashboardQuestionCard from './DashboardQuestionCard';

const schema = z.object({
  field: z.string(),
  subfield: z.string(),
  difficulty: z.number(),
});

export type QuestionType = TypeOf<typeof schema>;

export default function DashboardQuestions() {
  const form = useForm({
    initialValues: {
      field: '',
      subfield: '',
      difficulty: 0,
    },
    validate: zodResolver(schema),
  });

  const { data: fields, isLoading: fieldsLoading } = useFields();
  const {
    data: subfields,
    isLoading: subfieldsLoading,
    isFetching: subfieldsFetching,
    refetch: fetchSubfields,
  } = useSubfields(form.values.field);
  const {
    data: questions,
    isFetching,
    refetch: fetchQuestions,
  } = useQuestions({
    field: form.values.field,
    subfield: form.values.subfield,
  });

  useEffect(() => {
    if (form.values.field) {
      fetchSubfields();
    }
  }, [form.values.field, fetchSubfields]);

  function onSuccess() {
    if (form.values.field && form.values.subfield) {
      fetchQuestions();
      form.setFieldValue('difficulty', 0);
    }
  }

  return (
    <Stack>
      <Group mt={5} align='center'>
        {questions && (
          <Badge color={isPlayable(questions, form.values.subfield) ? 'green' : 'red'}>
            {isPlayable(questions, form.values.subfield) ? 'ON' : 'OFF'}
          </Badge>
        )}
        <Title order={3} ta='center'>
          {questions?.length || 0} sual tapıldı
        </Title>
      </Group>
      <form onSubmit={form.onSubmit(onSuccess)}>
        <Stack>
          <Select
            label='Kateqoriya'
            placeholder='Kateqoriyanı seçin'
            data={fields ? fields.map((item) => ({ value: item._id, label: item.name })) : []}
            disabled={!Boolean(fields?.length) || fieldsLoading}
            searchable
            nothingFound='Kateqoriya tapılmadı'
            allowDeselect
            {...form.getInputProps('field')}
          />
          {form.values.field && (
            <Select
              label='Mövzu'
              placeholder='Mövzunu seçin'
              data={
                subfields ? subfields.map((item) => ({ value: item._id, label: item.name })) : []
              }
              disabled={!Boolean(subfields?.length) || subfieldsLoading || subfieldsFetching}
              searchable
              nothingFound='Mövzu tapılmadı'
              allowDeselect
              {...form.getInputProps('subfield')}
            />
          )}
          <Slider
            min={0}
            label={form.values.difficulty || 'Bütün'}
            max={10}
            {...form.getInputProps('difficulty')}
          />

          <Button
            disabled={!(form.values.field && form.values.subfield)}
            loading={isFetching}
            type='submit'
          >
            Axtar
          </Button>
        </Stack>
      </form>
      {!questions?.length ? (
        <Text
          color='red'
          ta='center'
          fw='bold'
          fz={14}
          p={5}
          sx={(theme) => ({ borderRadius: theme.radius['sm'] })}
        >
          Sual tapılmadı
        </Text>
      ) : (
        <Grid>
          {questions
            .filter((q) => q.difficulty === form.values.difficulty || !form.values.difficulty)
            .map((question) => (
              <Grid.Col md={4} sm={6} xs={12} key={question._id}>
                <DashboardQuestionCard question={question} />
              </Grid.Col>
            ))}
        </Grid>
      )}
    </Stack>
  );
}
