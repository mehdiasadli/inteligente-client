import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../hooks/useToast';
import { end, start } from '../../store/slices/quiz.slice';
import { useAppDispatch } from './../../store/hooks';
import services from './quiz.service';

export const useStartQuiz = () => {
  const { error } = useToast();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation(services.startQuiz, {
    onError: (err) => {
      error(err);
    },
    onSuccess: ({ data }) => {
      dispatch(start({ data }));
      queryClient.refetchQueries(['quizes']);
    },
  });
};

export const useEndQuiz = () => {
  const { error } = useToast();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation(services.endQuiz, {
    onError: (err) => {
      error(err);
    },
    onSuccess: () => {
      dispatch(end());
      queryClient.refetchQueries(['quizes']);
    },
  });
};

export const useDeleteQuiz = () => {
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  return useMutation(services.deleteQuiz, {
    onError: (err) => {
      error(err);
    },
    onSuccess: ({ data }) => {
      success(data.message);
      queryClient.refetchQueries(['quizes']);
    },
  });
};

export const useQuiz = (id: string) => {
  const { data, ...rest } = useQuery(['quizes', 'quiz-' + id], () => services.getQuiz({ id }));

  return { response: data, data: data?.data, ...rest };
};

export const useBoard = ({ field, subfield }: { field: string; subfield?: string }) => {
  const { data, ...rest } = useQuery(
    ['quizes', 'board'],
    () => services.getBoard({ field, subfield }),
    {
      enabled: false,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  return { response: data, data: data?.data, ...rest };
};

export const useQuizes = () => {
  const { data, ...rest } = useQuery(['quizes'], services.getQuizes);

  return { response: data, data: data?.data, ...rest };
};

export const useAverage = () => {
  const { data, ...rest } = useQuery(['average'], services.getAverage);

  return { response: data, data: data?.data, ...rest };
};

export const useUserQuizzes = (id: string) => {
  const { data, ...rest } = useQuery(['user-quizzes'], () => services.getUserQuizes({ id }), {
    enabled: false,
  });

  return { response: data, data: data?.data, ...rest };
};
