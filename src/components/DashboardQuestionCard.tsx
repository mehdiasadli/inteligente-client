import {
  Badge,
  Button,
  Center,
  Group,
  Modal,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconX } from '@tabler/icons-react';
import { PopulatedQuestion, USER_ROLE } from '../lib/types';
import { useDeleteQuestion } from '../services/question/question.hooks';
import { useAuth } from '../store/hooks';
import EditQuestionModal from './EditQuestionModal';

export default function DashboardQuestionCard({ question }: { question: PopulatedQuestion }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isLoading } = useDeleteQuestion();
  const { role } = useAuth();

  const diffs = Array.from({ length: 10 }, (_, i) => i + 1).map((i) => i.toString());

  function onDelete() {
    mutate({ id: question._id });
  }
  function onEdit() {
    open();
  }

  return (
    <Paper shadow='sm' p={10} withBorder>
      <Stack>
        <Title order={5}>{question.title}</Title>
        {question.description && (
          <Text color='dimmed' fz={13} mt={-15}>
            {question.description}
          </Text>
        )}
        {question.answers && (
          <SimpleGrid
            spacing={3}
            cols={4}
            breakpoints={[
              { maxWidth: '30em', cols: 3 },
              { maxWidth: '20em', cols: 2 },
            ]}
          >
            {question.answers.map((answer) => (
              <Tooltip
                label={answer}
                transitionProps={{ transition: 'slide-up', duration: 150 }}
                key={answer + Math.random()}
              >
                <Badge variant='dot'>
                  <Center>{answer}</Center>
                </Badge>
              </Tooltip>
            ))}
          </SimpleGrid>
        )}

        <Tooltip
          label='Difficulty of the question'
          withArrow
          color={
            question.difficulty < 4
              ? 'green.9'
              : question.difficulty < 7
              ? 'yellow.9'
              : question.difficulty < 10
              ? 'orange.9'
              : 'red.9'
          }
          transitionProps={{ transition: 'slide-up', duration: 300 }}
        >
          <SegmentedControl
            size='xs'
            data={diffs}
            color={
              question.difficulty < 4
                ? 'green'
                : question.difficulty < 7
                ? 'yellow'
                : question.difficulty < 10
                ? 'orange'
                : 'red'
            }
            value={question.difficulty.toString()}
          />
        </Tooltip>
        <Group grow>
          <Button
            onClick={onEdit}
            disabled={isLoading}
            leftIcon={<IconEdit size={16} />}
            variant='default'
          >
            Düzəliş et
          </Button>
          {role === USER_ROLE.ADMIN && (
            <Button
              onClick={onDelete}
              loading={isLoading}
              leftIcon={<IconX size={16} />}
              variant='default'
            >
              Sil
            </Button>
          )}
        </Group>
      </Stack>

      <Modal opened={opened} onClose={close}>
        <EditQuestionModal question={question} />
      </Modal>
    </Paper>
  );
}
