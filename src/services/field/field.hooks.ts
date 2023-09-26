import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../hooks/useToast';
import services from './field.service';

export const useCreateField = (reset?: () => void) => {
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  return useMutation(services.createField, {
    onError: (err) => {
      error(err);
    },
    onSuccess: ({ data }) => {
      success(data.name + ' field created successfully');
      queryClient.refetchQueries(['fields']);
      reset?.();
    },
  });
};

export const useFields = () => {
  const { data, ...rest } = useQuery(['fields'], services.getFields);
  return { response: data, data: data?.data, ...rest };
};
