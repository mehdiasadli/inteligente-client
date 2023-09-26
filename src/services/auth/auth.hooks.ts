import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { useAppDispatch } from '../../store/hooks';
import { loginUser, logoutUser } from '../../store/slices/user.slice';
import services from './auth.service';

export const useLogin = () => {
  const { error } = useToast();
  const dispatch = useAppDispatch();

  return useMutation(services.signin, {
    onError: (err) => {
      error(err);
    },
    onSuccess: ({ data }) => {
      dispatch(loginUser(data));
    },
  });
};

export const useRegister = () => {
  const { success, error } = useToast();
  const navigate = useNavigate();

  return useMutation(services.signup, {
    onError: (err) => {
      error(err);
    },
    onSuccess: ({ data }) => {
      const name = data.firstName + ' ' + data.lastName;

      navigate('/auth/login');
      success(name + ' has signup successfully');
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(logoutUser());
    navigate('/auth/login');
  };
};
