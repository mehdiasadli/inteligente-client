import {
  Badge,
  Card,
  Center,
  Container,
  Flex,
  Loader,
  SegmentedControl,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { QUIZ_MODE } from '../lib/types';
import { useFields } from '../services/field/field.hooks';
import { useBoard } from '../services/quiz/quiz.hooks';
import { useSubfields } from '../services/subfield/subfield.hooks';

const schema = z.object({
  field: z.string({ invalid_type_error: 'Field ID must be string' }).min(1, 'Field ID is required'),
  subfield: z.string({ invalid_type_error: 'Subfield ID must be string' }).optional(),
  mode: z.enum(['Easy', 'Medium', 'Hard', 'All']),
});

export default function StatsPage() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      field: '',
      subfield: '',
      mode: 'All',
    },
    validate: zodResolver(schema),
  });
  const { data: fields } = useFields();
  const {
    data: subfields,
    isLoading: subfieldsLoading,
    isFetching: subfieldsFetching,
    refetch: refetchSubfs,
  } = useSubfields(form.values.field);
  const {
    data: board,
    refetch,
    isFetching,
  } = useBoard({
    field: form.values.field,
    subfield: form.values.subfield,
  });

  useEffect(() => {
    if (form.values.field) {
      refetch();
      refetchSubfs();
    }
  }, [form.values.field, form.values.subfield, refetch, refetchSubfs]);

  return (
    <Container>
      <Stack mb={50}>
        <Select
          label='Kateqoriya'
          placeholder='Kateqoriyanı seçin'
          data={fields ? fields.map((item) => ({ value: item._id, label: item.name })) : []}
          disabled={!Boolean(fields?.length)}
          searchable
          nothingFound='Kateqoriya tapılmadı'
          allowDeselect
          {...form.getInputProps('field')}
          onChange={(e) => {
            form.setFieldValue('field', e || '');
            form.setFieldValue('subfield', '');
          }}
        />
        {form.values.field && (
          <Select
            label='Mövzu'
            placeholder='Mövzunu seçin'
            data={subfields ? subfields.map((item) => ({ value: item._id, label: item.name })) : []}
            disabled={!Boolean(subfields?.length) || subfieldsLoading || subfieldsFetching}
            searchable
            nothingFound='Mövzu tapılmadı'
            allowDeselect
            {...form.getInputProps('subfield')}
          />
        )}
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
            {
              value: 'All',
              label: 'Bütün',
            },
          ]}
          defaultValue='All'
          {...form.getInputProps('mode')}
        />
        {isFetching ? (
          <Center mt={10}>
            <Loader />
          </Center>
        ) : board && board.length ? (
          board
            .filter((item) => item.mode === form.values.mode || form.values.mode === 'All')
            .slice(0, 10)
            .map((item, index) => (
              <Card key={item._id} shadow='md'>
                <Stack>
                  <Flex align='center' justify='space-between'>
                    <Stack spacing={0}>
                      <Title order={3}>
                        {index + 1}. {item.user.firstName} {item.user.lastName}
                      </Title>
                      <Text
                        color='dimmed'
                        fz={12}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate('/user/' + item.user._id)}
                      >
                        @{item.user.username}
                      </Text>
                    </Stack>
                    <Title order={3}>{item.points?.toFixed(1)} Xal</Title>
                  </Flex>

                  <Flex
                    gap='xs'
                    sx={(theme) => ({
                      flexDirection: 'row',
                      [theme.fn.smallerThan('xs')]: {
                        flexDirection: 'column',
                        width: '100%',
                      },
                    })}
                  >
                    {!form.values.subfield && <Badge fullWidth>{item.subfield.name}</Badge>}
                    <Badge
                      fullWidth
                      color={
                        item.mode === QUIZ_MODE.EASY
                          ? 'green'
                          : item.mode === QUIZ_MODE.MEDIUM
                          ? 'yellow'
                          : 'red'
                      }
                    >
                      {item.mode === QUIZ_MODE.EASY
                        ? 'Asan'
                        : item.mode === QUIZ_MODE.MEDIUM
                        ? 'Orta'
                        : 'Çətin'}
                    </Badge>
                    <Badge fullWidth>
                      {`${item.answers
                        ?.reduce((acc, ans) => {
                          acc += ans?.time as number;
                          return acc;
                        }, 0)
                        .toFixed(1)} saniyədə ${
                        item.answers?.filter((a) => a.isCorrect).length
                      } doğru`}
                    </Badge>
                    <Badge fullWidth>{dayjs(item.updatedAt).format('HH:mm - DD.MM.YYYY')}</Badge>
                  </Flex>
                </Stack>
              </Card>
            ))
        ) : null}
      </Stack>
    </Container>
  );
}
