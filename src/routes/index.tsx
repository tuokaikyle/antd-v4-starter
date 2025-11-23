import { createFileRoute } from '@tanstack/react-router';
import { Card, Row, Col, Statistic, Collapse, Tag, Typography } from 'antd';
import { groupNumbers, versions } from '../versions';

export const Route = createFileRoute('/')({
  component: Index,
});

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

function Index() {
  return (
    <div>
      <h1>Dream of the Red Chamber</h1>
      <Collapse defaultActiveKey={['0']}>
        {versions.map((version, index) => (
          <Panel
            header={`${version.version} (${version.year ?? '未知年份'})`}
            key={index}
          >
            <Card>
              <Row gutter={16}>
                <Col span={8}>
                  <Title level={5}>Also Known As:</Title>
                  {version.names.map((name) => (
                    <Tag color='green'>{name}</Tag>
                  ))}
                </Col>
                <Col span={8}>
                  <Statistic
                    title='Chapter count'
                    value={version.chapterCount}
                  />
                </Col>
                {version.zhipiCount && (
                  <Col span={8}>
                    <Statistic title='评语数量' value={version.zhipiCount} />
                  </Col>
                )}
              </Row>
              <Row>
                <Col span={24} style={{ marginTop: '16px' }}>
                  <Title level={5}>Included Chapters:</Title>
                  {version.chapters.length === version.chapters.slice(-1)[0]
                    ? `${version.chapters[0]} - ${version.chapters.slice(-1)[0]}`
                    : groupNumbers(version.chapters).map((group) => (
                        <Paragraph>{group.join(', ')}</Paragraph>
                      ))}
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ marginTop: '16px' }}>
                  {version.description.map((desc) => (
                    <div>
                      <Title level={5}>{desc.source}</Title>
                      <ul>
                        {desc.content.map((para) => (
                          <li>{para}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Col>
              </Row>
            </Card>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
