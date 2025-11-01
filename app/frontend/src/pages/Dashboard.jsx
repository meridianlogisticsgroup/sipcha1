import { Card, Col, Row, Statistic, Typography, Divider } from "antd";
import { PhoneOutlined, TeamOutlined, SettingOutlined } from "@ant-design/icons";

export default function Dashboard() {
  return (
    <div style={{ padding: 16 }}>
      <Typography.Title level={3} style={{ marginBottom: 8 }}>Overview</Typography.Title>
      <Typography.Text type="secondary">Key metrics for your SIP + Chatwoot stack</Typography.Text>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic title="Active Admins" value={5} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic title="Provisioned Numbers" value={23} prefix={<PhoneOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic title="Configured Settings" value={12} prefix={<SettingOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
