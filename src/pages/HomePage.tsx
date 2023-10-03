import { Card, Group, Table, Title } from '@mantine/core';
import { useAverage } from '../services/quiz/quiz.hooks';

export default function HomePage() {
  const { data: average } = useAverage();

  return (
    <Group grow>
      <Card>
        <Title mb={15} ta='center'>
          Ümumi Nəticələr
        </Title>
        {average?.length ? (
          <Table verticalSpacing={'sm'} striped>
            <thead>
              <tr>
                <th>N</th>
                <th>Oyunçu</th>
                <th>Oyunların sayı</th>
                <th>Oralama xal</th>
              </tr>
            </thead>
            <tbody>
              {average.map((item, i) => (
                <tr key={item.username + item.total + item.average}>
                  <td>{i + 1}.</td>
                  <td style={{ fontWeight: 'bold' }}>@{item.username}</td>
                  <td>{item.total}</td>
                  <td>{item.average?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </Card>
    </Group>
  );
}
