import { Tabs } from '@mantine/core';
import CreateField from '../components/CreateField';
import CreateQuestion from '../components/CreateQuestion';
import CreateSubfield from '../components/CreateSubfield';

export default function CreatePage() {
  return (
    <Tabs defaultValue='question'>
      <Tabs.List grow mb={15}>
        <Tabs.Tab value='field'>Yeni kateqoriya</Tabs.Tab>
        <Tabs.Tab value='subfield'>Yeni mövzu</Tabs.Tab>
        <Tabs.Tab value='question'>Yeni sual</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='field'>
        <CreateField />
      </Tabs.Panel>
      <Tabs.Panel value='subfield'>
        <CreateSubfield />
      </Tabs.Panel>
      <Tabs.Panel value='question'>
        <CreateQuestion />
      </Tabs.Panel>
    </Tabs>
  );
}
