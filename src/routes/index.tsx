import { createFileRoute } from '@tanstack/react-router';
import { Card, Row, Col, Statistic, Collapse, Tag, Typography } from 'antd';
import { groupNumbers, type Version } from '../utils';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: Index,
});

const DATA_URL =
  'https://raw.githubusercontent.com/tuokaikyle/DreamOfTheRedChamberData/refs/heads/main/versions-generated.json';

const { Panel } = Collapse;
const { Link, Title, Paragraph } = Typography;

function Index() {
  const [data, setData] = useState<Version[]>([]);

  // fetch data from api and set data to state
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(DATA_URL);
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  if (!data || data.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <Title level={4}>Dream of the Red Chamber</Title>
      <Collapse defaultActiveKey={['0']}>
        {data.map((version, index) => (
          <Panel
            header={`${version.version} (${version.year ?? '未知年份'})`}
            key={index}
          >
            <Card>
              <Row gutter={[16, { xs: 8, sm: 16 }]}>
                <Col lg={8}>
                  <Title level={5}>Also Known As:</Title>
                  {version.names.map((name, nameIndex) => (
                    <Tag color='green' key={nameIndex}>
                      {name}
                    </Tag>
                  ))}
                </Col>
                <Col lg={8}>
                  <Statistic
                    title='Chapter count'
                    value={version.chapterCount}
                  />
                </Col>
                {version.zhipiCount && (
                  <Col lg={8}>
                    <Statistic title='评语数量' value={version.zhipiCount} />
                  </Col>
                )}
              </Row>
              <Row>
                <Col span={24} style={{ marginTop: '16px' }}>
                  <Title level={5}>Included Chapters:</Title>
                  {version.chapters.length === version.chapters.slice(-1)[0]
                    ? `${version.chapters[0]} - ${
                        version.chapters.slice(-1)[0]
                      }`
                    : groupNumbers(version.chapters).map(
                        (group, groupIndex) => (
                          <Paragraph key={groupIndex}>
                            {group.join(', ')}
                          </Paragraph>
                        )
                      )}
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ marginTop: '16px' }}>
                  {version.description.map((desc, dIndex) => (
                    <div key={dIndex}>
                      <Title level={5}>{desc.source}</Title>
                      <ul>
                        {desc.content.map((para, paraIndex) => (
                          <li key={paraIndex}>{para}</li>
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
      <Paragraph style={{ marginTop: '16px' }}>
        *The data is from this github repository{' '}
        <Link
          href='https://github.com/tuokaikyle/DreamOfTheRedChamberData/blob/main/versions.ts'
          target='_blank'
        >
          DreamOfTheRedChamberData
        </Link>
      </Paragraph>
    </div>
  );
}
