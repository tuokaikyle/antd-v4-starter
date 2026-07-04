import { createFileRoute } from '@tanstack/react-router';
import { Alert, Card, Row, Col, Statistic, Collapse, Tag, Typography } from 'antd';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(DATA_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const jsonData: unknown = await response.json();

        if (!Array.isArray(jsonData)) {
          throw new Error('The response did not contain the expected data.');
        }

        setData(jsonData as Version[]);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        setError(err instanceof Error ? err.message : 'Failed to load data.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return (
      <Alert
        type='error'
        showIcon
        message='Unable to load Dream of the Red Chamber data'
        description={error}
      />
    );
  }

  if (data.length === 0) {
    return (
      <Alert
        type='info'
        showIcon
        message='No Dream of the Red Chamber data is available.'
      />
    );
  }

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
