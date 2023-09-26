import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../hooks/useToast';
import services from './question.service';

export const useCreateQuestion = (reset?: () => void) => {
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  return useMutation(services.createQuestion, {
    onError: (err) => {
      error(err);
    },
    onSuccess: () => {
      success('Question created successfully');
      queryClient.refetchQueries(['questions', 'subfields']);
      reset?.();
    },
  });
};

export const useUpdateQuestion = () => {
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  return useMutation(services.updateQuestion, {
    onError: (err) => {
      error(err);
    },
    onSuccess: () => {
      success('Question updated successfully');
      queryClient.refetchQueries(['questions']);
    },
  });
};

export const useDeleteQuestion = () => {
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  return useMutation(services.deleteQuestion, {
    onError: (err) => {
      error(err);
    },
    onSuccess: ({ data }) => {
      success(data.message);
      queryClient.refetchQueries(['questions']);
    },
  });
};

export const useQuestions = ({ field, subfield }: { field: string; subfield: string }) => {
  const { data, ...rest } = useQuery(
    ['questions'],
    () => services.getQuestions({ field, subfield }),
    { enabled: false }
  );

  return { response: data, data: data?.data, ...rest };
};

export const useQuestionCount = () => {
  const { data, ...rest } = useQuery(['question-count'], services.getCount);

  return { response: data, data: data?.data, ...rest };
};
