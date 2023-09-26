import { modals } from '@mantine/modals';

export const useConfirm = () => {
  return ({
    title,
    confirm,
    color,
    onConfirm,
  }: {
    title: string;
    confirm: string;
    color?: string;
    onConfirm: () => void;
  }) => {
    modals.openConfirmModal({
      title,
      labels: { confirm, cancel: 'Ləğv et' },
      centered: true,
      confirmProps: {
        color,
      },
      overlayProps: { blur: 2 },
      onConfirm,
      withCloseButton: false,
    });
  };
};
