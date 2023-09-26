import { Container, Divider, Stack, Title } from '@mantine/core';
import Quiz from '../components/Quiz';
import QuizForm from '../components/QuizForm';
import UserQuizList from '../components/UserQuizList';
import { useQuizes } from '../services/quiz/quiz.hooks';
import { useAppSelector, useAuth } from '../store/hooks';

export default function QuizPage() {
  const { active } = useAppSelector((state) => state.quiz);
  const { data: quizes } = useQuizes();
  const { user } = useAuth();

  const data = quizes?.filter((q) => q.finished && user && q.user._id === user._id);
  
  return active ? (
    <Quiz />
  ) : (
    <Container size='sm' mb={50}>
      <QuizForm />
      {quizes && data?.length ? (
        <>
          <Divider my={20} />
          <Stack>
            <Title ta='center'>Son Oyunlar</Title>
            <UserQuizList quizes={data.length <= 5 ? data : data.slice(0, 5)} />
          </Stack>
        </>
      ) : null}
    </Container>
  );
}
