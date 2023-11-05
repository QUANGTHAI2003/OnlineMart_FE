import { RedoOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import dayjs from "dayjs";
import queryString from "query-string";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import * as S from "../Evouncher.style";

const FilterEvoucher: React.FC = () => {
  const [form] = Form.useForm();
  const navigator = useNavigate();
  const { t } = useTranslation();
  const urlEvouncher = "/admin/shop/evoucher";

  const onReset = () => {
    form.resetFields();
    navigator(urlEvouncher);
  };
  const onFinish = (values: any) => {
    const queryParams = new URLSearchParams();

    if (values.status) {
      queryParams.append("status", values.status);
    }

    if (values.max_discount_amount) {
      queryParams.append("max_discount_amount", values.max_discount_amount);
    }

    if (values.date) {
      const [start_date, expired_date] = values.date;
      queryParams.append("start_date", start_date.format("YYYY-MM-DD"));
      queryParams.append("expired_date", expired_date.format("YYYY-MM-DD"));
    }

    navigator(`${urlEvouncher}?${queryParams}`);
  };
  const { RangePicker } = DatePicker;

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    if (queryParams.status) {
      form.setFieldsValue({ status: queryParams.status });
    }

    if (queryParams.max_discount_amount) {
      form.setFieldsValue({ max_discount_amount: queryParams.max_discount_amount });
    }

    if (queryParams.start_date && queryParams.expired_date) {
      const startDate = dayjs(queryParams.start_date as string);
      const endDate = dayjs(queryParams.expired_date as string);
      form.setFieldsValue({ date: [startDate, endDate] });
      form.setFieldsValue({ date: [startDate, endDate] });
    }
  }, [queryParams, form]);

  return (
    <S.FormEVouncher>
      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        <Row gutter={16}>
          <Col span={24} md={8}>
            <Form.Item label={t("admin_shop.product.evouncher.form.status")} name="status">
              <Select
                placeholder={t("admin_shop.product.evouncher.form.select.status")}
                options={[
                  { value: "0", label: t("admin_shop.product.evouncher.form.select.expired") },
                  { value: "1", label: t("admin_shop.product.evouncher.form.select.valid") },
                  { value: "2", label: t("admin_shop.product.evouncher.not_activated") },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            <Form.Item label={t("admin_shop.product.evouncher.form.discount")} name="max_discount_amount">
              <Select
                placeholder={t("admin_shop.product.evouncher.form.select.discount")}
                options={[
                  { value: "<500000", label: "<500k" },
                  { value: ">500000", label: ">500k" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            <Form.Item label={t("admin_shop.product.evouncher.form.activation_time")} name="date">
              <RangePicker
                className="w-full"
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [dayjs("00:00:00", "ss:mm:HH"), dayjs("11:59:59", "ss:mm:HH")],
                }}
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="flex justify-end">
          <Button type="primary" htmlType="submit">
            {t("admin_shop.product.evouncher.form.search")}
          </Button>

          <Button htmlType="button" className="ml-2" onClick={onReset}>
            <RedoOutlined />
            {t("admin_shop.product.evouncher.form.refresh")}
          </Button>
        </Row>
      </Form>
    </S.FormEVouncher>
  );
};

export default FilterEvoucher;
