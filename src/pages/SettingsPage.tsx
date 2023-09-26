import { Button, Flex, Paper, Stack, Switch, Title } from '@mantine/core';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changePrimary, toggleScheme } from '../store/slices/settings.slice';

const colors = [
  'green',
  'cyan',
  'orange',
  'yellow',
  'pink',
  'grape',
  'gray',
  'teal',
];

const colorsAz = [
  'Yaşıl',
  'Cyan',
  'Narıncı',
  'Sarı',
  'Çəhrayı',
  'Üzümü',
  'Boz',
  'Til',
];

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { scheme, primaryColor } = useAppSelector((state) => state.settings);
  const [customLoading, setCustomLoading] = useState(false);

  function onSwitch(e: React.ChangeEvent<HTMLInputElement>) {
    const mode = e.target.checked ? 'dark' : 'light';

    dispatch(toggleScheme(mode));
  }

  function onColorChange(color: string) {
    dispatch(changePrimary(color));
    setCustomLoading(true);

    setTimeout(() => setCustomLoading(false), 1000);
  }

  return (
    <Stack
      p={15}
      sx={(theme) => ({
        borderRadius: theme.radius['sm'],
        border: '1px solid ' + (scheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2]),
      })}
    >
      <Title>Parametrlər</Title>
      <Paper withBorder p={15}>
        <Stack>
          <Title order={4}>Tema</Title>
          <Flex gap='sm' wrap={'wrap'} justify='center'>
            {colors.map((color, i) => (
              <Button
                onClick={() => onColorChange(color)}
                key={color}
                sx={{ flex: 1 }}
                variant={primaryColor === color ? 'filled' : 'subtle'}
                color={color}
                disabled={customLoading}
              >
                {colorsAz[i]}
              </Button>
            ))}
          </Flex>
        </Stack>
      </Paper>
      <Switch checked={scheme === 'dark'} label='Qaranlıq mod' onChange={onSwitch} />
    </Stack>
  );
}
