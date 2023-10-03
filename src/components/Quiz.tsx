import {
  Badge,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useMemo } from 'react';
import { z } from 'zod';
import { useTimer } from '../hooks/useTimer';
import { QUIZ_MODE } from '../lib/types';
import { useEndQuiz } from '../services/quiz/quiz.hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { answer, end } from '../store/slices/quiz.slice';

const schema = z.object({
  answer: z.string(),
});

export default function Quiz() {
  const form = useForm({
    initialValues: {
      answer: '',
    },
    validate: zodResolver(schema),
  });
  const [seconds, { interval, reset }] = useTimer();

  const { mutate } = useEndQuiz();
  const { id, questions, field, subfield, mode, round, answers } = useAppSelector(
    (state) => state.quiz
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    interval.start();
  }, [interval]);

  function onSuccess(values: any) {
    dispatch(answer({ answer: values.answer, time: seconds }));
    form.reset();
    reset();
  }

  useEffect(() => {
    function onEnd() {
      const points = answers.reduce((acc, ans) => {
        acc += ans.point;
        return acc;
      }, 0);

      if (id) {
        mutate({
          id,
          data: {
            points,
            answers: answers.map((ans) => ({ ...ans, question: ans.question?._id })),
          },
        });
        dispatch(end());
      }

      reset();
      interval.stop();
    }

    if (round >= questions.length + 1) {
      onEnd();
    }
  }, [answers, dispatch, id, interval, mutate, questions.length, reset, round]);

  const question = useMemo(() => {
    return questions[round - 1];
  }, [questions, round]);

  return (
    <Container size='sm'>
      <Stack>
        <Group grow>
          <Badge size='lg' radius={'xs'}>
            {field?.name}
          </Badge>
          <Badge
            size='lg'
            radius={'xs'}
            color={mode === QUIZ_MODE.EASY ? 'green' : mode === QUIZ_MODE.MEDIUM ? 'yellow' : 'red'}
          >
            {mode === QUIZ_MODE.EASY ? 'Asan' : mode === QUIZ_MODE.MEDIUM ? 'Orta' : 'Çətin'}
          </Badge>
          <Badge size='lg' radius={'xs'}>
            {subfield?.name}
          </Badge>
        </Group>
        <Stack>
          <Title>
            {round}. {question?.title}
          </Title>
          {question?.description && (
            <Text mt={-10} fz={12} color='dimmed'>
              {question?.description}
            </Text>
          )}
        </Stack>
        <form onSubmit={form.onSubmit(onSuccess)}>
          <Stack
            spacing={10}
            p={10}
            sx={(theme) => ({
              border:
                '1px solid ' +
                (theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2]),
              borderRadius: theme.radius.sm,
            })}
          >
            <TextInput
              autoFocus
              styles={{
                input: {
                  height: '3.5rem',
                },
              }}
              label='Cavabınız'
              placeholder='Cavabınızı daxil edin'
              {...form.getInputProps('answer')}
            />
            <Group grow>
              <Paper withBorder shadow='sm' h={35}>
                <Center h='100%'>
                  <Title order={4} ta='center'>
                    {seconds.toFixed(1)}
                  </Title>
                </Center>
              </Paper>
              <Button type='submit' h={35}>
                Cavabla
              </Button>
            </Group>
          </Stack>
        </form>

        {/* <Button mt={20} mx={'auto'} w='12rem' onClick={onEnd} loading={isLoading} color='red'>
          Oyunu Bitir
        </Button> */}
      </Stack>
    </Container>
  );
}
