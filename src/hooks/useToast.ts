import { notifications } from '@mantine/notifications';

export const useToast = () => {
  function error(err: any) {
    const message =
      typeof err === 'string'
        ? err
        : err?.response?.data?.message || 'Əməliyyat zamanı xəta baş verdi';

    notifications.show({
      message,
      color: 'red',
    });
  }

  function success(msg: string) {
    notifications.show({
      message: msg,
      color: 'green',
      autoClose: 2000,
      withCloseButton: false,
    });
  }

  function clean() {
    notifications.clean();
  }

  return { success, error, clean };
};
