import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { theme } from '../lib/theme';
import { useAppSelector } from '../store/hooks';

export default function Mantine({ children }: { children: React.ReactNode }) {
  const { scheme, primaryColor } = useAppSelector((state) => state.settings);

  return (
    <MantineProvider
      theme={{
        ...theme,
        colorScheme: scheme,
        primaryColor,
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
}
