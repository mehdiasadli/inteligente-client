import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { logoutUser, updateUser } from '../../store/slices/user.slice';
import { useToast } from './../../hooks/useToast';
import { useAppDispatch } from './../../store/hooks';
import services from './user.service';

export const useUsers = () => {
  const { data, ...rest } = useQuery(['users'], services.getUsers);

  return { response: data, data: data?.data, ...rest };
};

export const useUser = (id: string) => {
  const { data, ...rest } = useQuery(['users', id], () => services.getUser({ id }));

  return { response: data, data: data?.data, ...rest };
};

export const useChangeRole = () => {
  const { error } = useToast();
  const queryClient = useQueryClient();

  return useMutation(services.changeRole, {
    onError: (err) => {
      error(err);
    },
    onSuccess: () => {
      queryClient.refetchQueries(['users']);
    },
  });
};

export const useUpdateUser = (isAdmin = false) => {
  const { error } = useToast();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation(services.updateUser, {
    onError: (err) => {
      error(err);
    },
    onSuccess: ({ data }) => {
      queryClient.refetchQueries(['users']);

      if (!isAdmin) {
        dispatch(updateUser(data));
      }
    },
  });
};

export const useDeleteUser = (isProfile = false) => {
  const { error, success } = useToast();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation(services.deleteUser, {
    onError: (err) => {
      error(err);
    },
    onSuccess: ({ data }) => {
      queryClient.refetchQueries(['users']);

      if (isProfile) {
        dispatch(logoutUser());
      } else {
        success(data.message);
      }
    },
  });
};
