import { createFileRoute } from '@tanstack/react-router';
import { Collapse, Table, Tag } from 'antd';
import type { Book, Lesson } from './raw/renjiaoshe';
import { bubianban } from './raw/bubianban';

export const Route = createFileRoute('/yuwen/bubianban')({
  component: RouteComponent,
});

const isActivity = (
  item: Lesson
): item is { activity: string; topic: string } => 'activity' in item;

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 80,
    render: (_: unknown, record: Lesson) =>
      isActivity(record) ? null : record.index,
  },
  {
    title: '课文',
    dataIndex: 'title',
    key: 'title',
    render: (_: unknown, record: Lesson) => {
      if (isActivity(record)) {
        return (
          <Tag color='blue'>
            {record.activity}：{record.topic}
          </Tag>
        );
      }
      return (
        <span>
          {record.title}
          {record.asterisk && (
            <Tag color='orange' style={{ marginLeft: 8 }}>
              略读
            </Tag>
          )}
        </span>
      );
    },
  },
  {
    title: '包含篇目',
    dataIndex: 'sections',
    key: 'sections',
    render: (sections: string[] | undefined) =>
      sections ? sections.join('、') : null,
  },
];

function RouteComponent() {
  return (
    <div style={{ padding: 24 }}>
      <h1>部编版小学语文课文目录</h1>
      <Collapse defaultActiveKey={[bubianban[0]?.bookName]}>
        {bubianban.map((book: Book) => (
          <Collapse.Panel header={book.bookName} key={book.bookName}>
            <Table
              dataSource={book.articles}
              columns={columns}
              rowKey={(_: Lesson, idx?: number) => `${book.bookName}-${idx}`}
              pagination={false}
              size='small'
            />
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
}
