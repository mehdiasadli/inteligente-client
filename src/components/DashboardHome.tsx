import { Card, SimpleGrid, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import dayjs from 'dayjs';
import _ from 'lodash';
import CountUp from 'react-countup';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useFields } from '../services/field/field.hooks';
import { useQuestionCount } from '../services/question/question.hooks';
import { useQuizes } from '../services/quiz/quiz.hooks';
import { useUsers } from '../services/user/user.hooks';

export default function DashboardHome() {
  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: fields, isLoading: fieldsLoading } = useFields();
  const { data: questions, isLoading: questionsLoading } = useQuestionCount();
  const { data: quizzes, isLoading: quizzesLoading } = useQuizes();
  const theme = useMantineTheme();

  return (
    <Stack>
      <SimpleGrid
        mb={20}
        cols={4}
        breakpoints={[
          { maxWidth: 'xs', cols: 1 },
          { maxWidth: 'sm', cols: 2 },
        ]}
      >
        <Card>
          <Text color='dimmed'>Toplam istifadəçilər</Text>
          <Title order={4}>
            {usersLoading ? '--' : users ? <CountUp end={users.length} /> : 'No-Data'}
          </Title>
        </Card>
        <Card>
          <Text color='dimmed'>Toplam kateqoriyalar</Text>
          <Title order={4}>
            {fieldsLoading ? '--' : fields ? <CountUp end={fields.length} /> : 'No-Data'}
          </Title>
        </Card>
        <Card>
          <Text color='dimmed'>Toplam oyunlar</Text>
          <Title order={4}>
            {quizzesLoading ? (
              '--'
            ) : quizzes ? (
              <CountUp end={quizzes.filter((q) => q.finished).length} />
            ) : (
              'No-Data'
            )}
          </Title>
        </Card>
        <Card>
          <Text color='dimmed'>Toplam suallar</Text>
          <Title order={4}>
            {questionsLoading ? '--' : questions ? <CountUp end={questions.count} /> : 'No-Data'}
          </Title>
        </Card>
      </SimpleGrid>
      {quizzes?.length ? (
        <ResponsiveContainer width='100%' height={350}>
          <LineChart
            data={Object.entries(
              _.groupBy(
                quizzes.filter((q) => q.finished),
                (q: any) => q.updatedAt.split('T')[0]
              )
            )
              .sort(([date1]: any, [date2]: any) => {
                const d1 = date1.split('-')[2];
                const d2 = date2.split('-')[2];

                return +d1 - +d2;
              })
              .map(([date, values]: [any, any]) => ({
                date: dayjs(date).format('DD MMM'),
                oyun: values.length,
              }))}
          >
            <CartesianGrid strokeDasharray='1 6' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='oyun' stroke={theme.primaryColor} />
          </LineChart>
        </ResponsiveContainer>
      ) : null}
    </Stack>
  );
}
