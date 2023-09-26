import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../hooks/useToast';
import services from './subfield.service';

export const useCreateSubfield = (reset?: () => void) => {
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  return useMutation(services.createSubfield, {
    onError: (err) => {
      error(err);
    },
    onSuccess: ({ data }) => {
      success(data.name + ' subfield created successfully');
      queryClient.refetchQueries(['subfields', 'fields']);
      reset?.();
    },
  });
};

export const useSubfields = (fieldId?: string) => {
  const { data, ...rest } = useQuery(
    ['subfields', 'subfield-' + fieldId],
    () => services.getSubfields(fieldId || 'no-data'),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  return { response: data, data: data?.data, ...rest };
};
