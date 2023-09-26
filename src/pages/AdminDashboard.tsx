import { Box, Group, MediaQuery, Tabs } from '@mantine/core';
import { IconHome, IconQuestionMark, IconUsersGroup } from '@tabler/icons-react';
import DashboardHome from '../components/DashboardHome';
import DashboardQuestions from '../components/DashboardQuestions';
import DashboardUsers from '../components/DashboardUsers';
import { USER_ROLE } from '../lib/types';
import { useAuth } from '../store/hooks';

const tabs = [
  {
    value: 'home',
    label: 'Əsas Səhifə',
    icon: <IconHome size={18} />,
    panel: <DashboardHome />,
  },
  {
    value: 'users',
    label: 'İstifadəçilər',
    icon: <IconUsersGroup size={18} />,
    panel: <DashboardUsers />,
    isAdmin: true,
  },
  {
    value: 'questions',
    label: 'Suallar',
    icon: <IconQuestionMark size={18} />,
    panel: <DashboardQuestions />,
  },
  // {
  //   value: 'quizes',
  //   label: 'Quizes',
  //   icon: <IconBook size={18} />,
  //   panel: <DashboardQuizes />,
  // },
];

export default function AdminDashboard() {
  const { role } = useAuth();

  return (
    <>
      <Tabs defaultValue='home'>
        <Tabs.List grow mih={50}>
          {tabs
            .filter((tab) => (role === USER_ROLE.ADMIN ? true : !tab.isAdmin))
            .map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                <Group spacing={5} align='center'>
                  <MediaQuery query='(max-width: 34em)' styles={{ display: 'none' }}>
                    {tab.icon}
                  </MediaQuery>
                  {tab.label}
                </Group>
              </Tabs.Tab>
            ))}
        </Tabs.List>

        {tabs.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value}>
            <Box p={10}>{tab.panel}</Box>
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
}
