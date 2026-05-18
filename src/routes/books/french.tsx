import { createFileRoute } from '@tanstack/react-router';
import {
  Select,
  Checkbox,
  Typography,
  Card,
  Divider,
  Space,
  Row,
  Col,
} from 'antd';
import { useState, useMemo } from 'react';
import flashData from '../../data/boule-de-suif-zh-en_deepseek-v4-flash.json';
import proData from '../../data/boule-de-suif-zh-en_deepseek-v4-pro.json';

export const Route = createFileRoute('/books/french')({
  component: RouteComponent,
});

const { Title, Paragraph, Text } = Typography;

interface Sentence {
  runId: string;
  cid: number;
  sid: number;
  pid: number;
  indexInParagraph: number;
  sentenceLength: number;
  isShortParagraph: boolean;
  sourcetext: string;
  translatedEn: string;
  translatedZh: string;
}

function RouteComponent() {
  const [selectedCid, setSelectedCid] = useState<number>(1);
  const [showFlash, setShowFlash] = useState(true);
  const [showPro, setShowPro] = useState(true);
  const [showFrench, setShowFrench] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showChinese, setShowChinese] = useState(true);

  // Get unique chapter IDs
  const chapterIds = useMemo(() => {
    const ids = new Set(flashData.map((s: Sentence) => s.cid));
    return [...ids].sort((a, b) => a - b);
  }, []);

  // Filter sentences by selected chapter
  const flashSentences = useMemo(
    () => (flashData as Sentence[]).filter((s) => s.cid === selectedCid),
    [selectedCid]
  );

  const proSentences = useMemo(
    () => (proData as Sentence[]).filter((s) => s.cid === selectedCid),
    [selectedCid]
  );

  // Group sentences by paragraph (pid)
  const flashByPid = useMemo(() => {
    const map = new Map<number, Sentence[]>();
    for (const s of flashSentences) {
      const arr = map.get(s.pid) || [];
      arr.push(s);
      map.set(s.pid, arr);
    }
    return map;
  }, [flashSentences]);

  const proByPid = useMemo(() => {
    const map = new Map<number, Sentence[]>();
    for (const s of proSentences) {
      const arr = map.get(s.pid) || [];
      arr.push(s);
      map.set(s.pid, arr);
    }
    return map;
  }, [proSentences]);

  // Get all unique pids from both datasets
  const allPids = useMemo(() => {
    const pids = new Set<number>();
    for (const pid of flashByPid.keys()) pids.add(pid);
    for (const pid of proByPid.keys()) pids.add(pid);
    return [...pids].sort((a, b) => a - b);
  }, [flashByPid, proByPid]);

  return (
    <div>
      <Title level={3}>Boule de Suif — 羊脂球</Title>

      {/* Controls */}
      <Space wrap style={{ marginBottom: 24 }}>
        <span>
          <Text strong>Chapter: </Text>
          <Select
            value={selectedCid}
            onChange={(val) => setSelectedCid(val)}
            style={{ width: 120 }}
            options={chapterIds.map((id) => ({
              value: id,
              label: `Chapter ${id}`,
            }))}
          />
        </span>

        <Checkbox
          checked={showFlash}
          onChange={(e) => setShowFlash(e.target.checked)}
        >
          DeepSeek V4 Flash
        </Checkbox>

        <Checkbox
          checked={showPro}
          onChange={(e) => setShowPro(e.target.checked)}
        >
          DeepSeek V4 Pro
        </Checkbox>

        <Text strong>Languages: </Text>

        <Checkbox
          checked={showFrench}
          onChange={(e) => setShowFrench(e.target.checked)}
        >
          French
        </Checkbox>

        <Checkbox
          checked={showEnglish}
          onChange={(e) => setShowEnglish(e.target.checked)}
        >
          English
        </Checkbox>

        <Checkbox
          checked={showChinese}
          onChange={(e) => setShowChinese(e.target.checked)}
        >
          Chinese
        </Checkbox>
      </Space>

      {/* Sentence count */}
      <Paragraph type='secondary'>
        {flashSentences.length} sentences in Chapter {selectedCid}
      </Paragraph>

      {/* Display paragraphs */}
      {allPids.map((pid) => {
        const flashParagraph = flashByPid.get(pid);
        const proParagraph = proByPid.get(pid);
        const referenceParagraph = flashParagraph || proParagraph;
        if (!referenceParagraph) return null;

        return (
          <Card key={pid} size='small' style={{ marginBottom: 16 }}>
            {referenceParagraph.map((sentence) => {
              const flashSentence = flashParagraph?.find(
                (s) => s.sid === sentence.sid
              );
              const proSentence = proParagraph?.find(
                (s) => s.sid === sentence.sid
              );

              return (
                <Row
                  key={sentence.sid}
                  gutter={[16, 8]}
                  style={{ marginBottom: 12, paddingBottom: 8 }}
                >
                  {showFlash && flashSentence && (
                    <Col xs={24} md={showPro && proSentence ? 12 : 24}>
                      <div
                        style={{
                          background: '#fef9e7',
                          borderRadius: 6,
                          padding: '8px 12px',
                          height: '100%',
                        }}
                      >
                        {showFrench && (
                          <Paragraph style={{ marginBottom: 4, fontSize: 15 }}>
                            {flashSentence.sourcetext}
                          </Paragraph>
                        )}
                        {showEnglish && (
                          <Paragraph style={{ marginBottom: 2 }}>
                            <Text type='success'>
                              {flashSentence.translatedEn}
                            </Text>
                          </Paragraph>
                        )}
                        {showChinese && (
                          <Paragraph style={{ marginBottom: 2 }}>
                            <Text>{flashSentence.translatedZh}</Text>
                          </Paragraph>
                        )}
                      </div>
                    </Col>
                  )}
                  {showPro && proSentence && (
                    <Col xs={24} md={showFlash && flashSentence ? 12 : 24}>
                      <div
                        style={{
                          background: '#f0f4ff',
                          borderRadius: 6,
                          padding: '8px 12px',
                          height: '100%',
                        }}
                      >
                        {showFrench && (
                          <Paragraph style={{ marginBottom: 4, fontSize: 15 }}>
                            {proSentence.sourcetext}
                          </Paragraph>
                        )}
                        {showEnglish && (
                          <Paragraph style={{ marginBottom: 2 }}>
                            <Text type='success'>
                              {proSentence.translatedEn}
                            </Text>
                          </Paragraph>
                        )}
                        {showChinese && (
                          <Paragraph style={{ marginBottom: 2 }}>
                            <Text>{proSentence.translatedZh}</Text>
                          </Paragraph>
                        )}
                      </div>
                    </Col>
                  )}
                  <Divider style={{ margin: '8px 0', width: '100%' }} />
                </Row>
              );
            })}
          </Card>
        );
      })}
    </div>
  );
}
