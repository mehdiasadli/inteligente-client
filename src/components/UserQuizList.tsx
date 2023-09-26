import { Badge, Card, Flex, Group, Stack, Text, Title, Tooltip } from '@mantine/core';
import dayjs from 'dayjs';
import CountUp from 'react-countup';
import { Quiz, QUIZ_MODE } from '../lib/types';

export default function UserQuizList({ quizes }: { quizes: Quiz[] }) {
  return (
    <>
      {quizes.map((quiz) => (
        <Card key={quiz._id} shadow='sm'>
          <Stack>
            <Group grow>
              <Tooltip
                transitionProps={{ transition: 'slide-up', duration: 150 }}
                label={quiz.field.name}
              >
                <Badge size='md' radius={'xs'}>
                  {quiz.field.name}
                </Badge>
              </Tooltip>
              <Badge
                size='md'
                radius={'xs'}
                color={
                  quiz.mode === QUIZ_MODE.EASY
                    ? 'green'
                    : quiz.mode === QUIZ_MODE.MEDIUM
                    ? 'yellow'
                    : 'red'
                }
              >
                {quiz.mode === QUIZ_MODE.EASY
                  ? 'Asan'
                  : quiz.mode === QUIZ_MODE.MEDIUM
                  ? 'Orta'
                  : 'Çətin'}
              </Badge>
              <Tooltip
                label={quiz.subfield.name}
                transitionProps={{ transition: 'slide-up', duration: 150 }}
              >
                <Badge size='md' radius={'xs'}>
                  {quiz.subfield.name}
                </Badge>
              </Tooltip>
            </Group>
            <Flex align='center' justify='space-between'>
              {quiz.points !== undefined && (
                <Group spacing={5}>
                  <Title>
                    <CountUp end={quiz.points} />
                  </Title>
                  <Text>{quiz.points === 1} Xal</Text>
                </Group>
              )}
              <Text color='dimmed' fs='italic'>
                {dayjs(quiz.createdAt).format('HH:mm - DD.MM.YYYY')}
              </Text>
            </Flex>
            <Group grow>
              <Badge radius='xs'>{quiz.answers?.filter((a) => a.isCorrect).length} Doğru</Badge>
              <Badge radius='xs'>
                {quiz.answers
                  ?.reduce((acc, ans) => {
                    acc += ans?.time as number;
                    return acc;
                  }, 0)
                  .toFixed(1)}{' '}
                saniyə
              </Badge>
            </Group>
          </Stack>
        </Card>
      ))}
    </>
  );
}
