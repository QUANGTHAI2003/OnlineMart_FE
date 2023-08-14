import { Counter } from "@app/app/components/Counter/Counter";
import MetaHeader from "@app/app/components/Meta/MetaHeader";
import { Col, DatePicker, Row, Space } from "antd";

import OpenGraph from "./../../components/Meta/OpenGraph";

const { RangePicker } = DatePicker;

const Dashboard = () => {
  return (
    <Row>
      <Col span={8}>
        <MetaHeader title="Dashboard" />
        <OpenGraph title="Dashboard" />
        <Counter />
      </Col>
      <Col span={8}></Col>
      <Col span={8}>
        <Space direction="vertical" size={12}>
          <RangePicker />
          <RangePicker showTime />
          <RangePicker picker="week" />
          <RangePicker picker="month" />
          <RangePicker picker="quarter" />
          <RangePicker picker="year" />
        </Space>
      </Col>
    </Row>
  );
};

export default Dashboard;
