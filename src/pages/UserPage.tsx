import {
  Badge,
  Card,
  Divider,
  Flex,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Navigate, useParams } from 'react-router-dom';
import { Quiz, QUIZ_MODE } from '../lib/types';
import { useUserQuizzes } from '../services/quiz/quiz.hooks';
import { useUser } from '../services/user/user.hooks';

import dayjs from 'dayjs';
import { useAuth } from '../store/hooks';

export default function UserPage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const { data: user } = useUser(id as string);
  const { data: quizzes, refetch } = useUserQuizzes(id as string);
  const [openedData, { open: openData, close: closeData }] = useDisclosure(false);
  const [selected, setSelected] = useState<Quiz | null>(null);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  if (!currentUser || !user) return <div></div>;

  if (id && currentUser._id === id) {
    return <Navigate to='/profile' replace />;
  }

  function onCardClick(id: string) {
    setSelected((quizzes?.find((q) => q._id === id) || null) as Quiz | null);
    openData();
  }

  function onCardClose() {
    setSelected(null);
    closeData();
  }

  return (
    <Stack>
      <Card w='100%'>
        <Flex
          justify='space-between'
          gap='sm'
          sx={(theme) => ({ [theme.fn.smallerThan('sm')]: { flexDirection: 'column' } })}
        >
          <Stack>
            <Title>
              {user.firstName} {user.lastName}
            </Title>
            <Text mt={-15}>@{user.username}</Text>
          </Stack>
        </Flex>
      </Card>
      {quizzes?.length ? (
        <Card>
          <SimpleGrid cols={2} breakpoints={[{ cols: 1, maxWidth: 'sm' }]}>
            {quizzes.map((q) => (
              <Card
                key={q._id}
                withBorder
                sx={{ cursor: 'pointer' }}
                onClick={() => onCardClick(q._id)}
              >
                <Stack>
                  <Group grow>
                    <Badge size='md' radius='xs'>
                      {q.field.name}
                    </Badge>
                    <Badge
                      size='md'
                      radius='xs'
                      color={
                        q.mode === QUIZ_MODE.EASY
                          ? 'green'
                          : q.mode === QUIZ_MODE.MEDIUM
                          ? 'yellow'
                          : 'red'
                      }
                    >
                      {q.mode === QUIZ_MODE.EASY
                        ? 'Asan'
                        : q.mode === QUIZ_MODE.MEDIUM
                        ? 'Orta'
                        : 'Çətin'}
                    </Badge>
                    <Badge size='md' radius='xs'>
                      {q.subfield.name}
                    </Badge>
                  </Group>
                  <Flex align='center' justify='space-between'>
                    {q.points !== undefined && (
                      <Group spacing={5}>
                        <Title>
                          <CountUp end={q.points} />
                        </Title>
                        <Text>Xal</Text>
                      </Group>
                    )}
                    <Text color='dimmed' fs='italic'>
                      {dayjs(q.createdAt).format('HH:mm - DD.MM.YYYY')}
                    </Text>
                  </Flex>
                  <Group grow>
                    <Badge radius='xs'>{q.answers?.filter((a) => a.isCorrect).length} Doğru</Badge>
                    <Badge radius='xs'>
                      {q.answers
                        ?.reduce((acc, ans) => {
                          acc += ans?.time as number;
                          return acc;
                        }, 0)
                        .toFixed(1)}{' '}
                      sanİyə
                    </Badge>
                  </Group>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Card>
      ) : null}

      <Modal opened={openedData} onClose={onCardClose} size='xl'>
        {selected && (
          <Stack>
            <Group grow>
              <Badge radius='xs'>{selected.answers?.filter((a) => a.isCorrect).length} Doğru</Badge>
              <Badge radius='xs'>
                {selected.answers
                  ?.reduce((acc, ans) => {
                    acc += ans?.time as number;
                    return acc;
                  }, 0)
                  .toFixed(1)}{' '}
                sanİyə
              </Badge>
            </Group>
            <Flex align='center' justify='space-between'>
              {selected.points !== undefined && (
                <Group spacing={5}>
                  <Title>
                    <CountUp end={selected.points} />
                  </Title>
                  <Text>Xal</Text>
                </Group>
              )}
              <Text color='dimmed' fs='italic'>
                {dayjs(selected.createdAt).format('HH:mm - DD.MM.YYYY')}
              </Text>
            </Flex>
            <Stack>
              {selected.questions.map((q) => {
                // @ts-ignore
                const answer = selected.answers?.find((a) => a.question === q._id);

                return (
                  <>
                    <Flex p='xs' key={q._id} justify='space-between' align='center'>
                      <Stack spacing={0}>
                        <Text fw='bold'>{q.title}</Text>
                        <Text>{answer ? answer.point.toFixed(1) : 0} Xal</Text>
                      </Stack>
                      {!answer ? (
                        <Badge color='red'>---</Badge>
                      ) : (
                        <Badge color={answer.isCorrect ? 'green' : 'red'}>
                          {answer.answer ? answer.answer : '--- '}: {answer?.time?.toFixed(1)}{' '}
                          sanİyə
                        </Badge>
                      )}
                    </Flex>
                    <Divider />
                  </>
                );
              })}
            </Stack>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
}
