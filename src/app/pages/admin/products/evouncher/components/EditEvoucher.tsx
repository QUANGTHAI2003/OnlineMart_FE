import { useGetVoucherOnlyQuery, useUpdateVoucherMutation } from "@app/store/slices/api/admin/voucherApi";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../Evouncher.style";

type FormValues = {
  fieldValues: any;
  code: string;
  usage_limit: number;
  discount: number;
  unit: "0" | "1";
  min_discount_amount: number;
  max_discount_amount: number;
  start_date: string;
  expired_date: string;
  status: "0" | "1" | "2";
  date: string;
};

const { RangePicker } = DatePicker;

const EditVoucher = ({ id, onCancel }: any) => {
  const { data, isFetching } = useGetVoucherOnlyQuery(id);
  const [updateVoucher, { isLoading, error }] = useUpdateVoucherMutation();
  console.log(data);
  const [form] = Form.useForm();

  const handleUnitChange = () => {
    form.validateFields(["discount"]);
  };

  useEffect(() => {
    form.setFieldsValue({ unit: "0" });
    form.validateFields(["discout"]);
  }, [form]);
  const handleSubmit = async (fieldValues: FormValues) => {
    const values = {
      ...fieldValues,
      start_date: fieldValues.date && dayjs(fieldValues.date[0]).format("YYYY-MM-DD ss:mm:HH"),
      expired_date: fieldValues.date && dayjs(fieldValues.date[1]).format("YYYY-MM-DD ss:mm:HH"),
      id,
    };
    try {
      await updateVoucher(values).unwrap();
      console.log(values);
      notifySuccess(
        t("admin_shop.product.evouncher.successfully"),
        t("admin_shop.product.evouncher.update_successfully")
      );
      onCancel();
    } catch (err) {
      handleApiError(err);
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      code: data?.code,
      usage_limit: data?.usage_limit,
      discount: data?.discount,
      unit: data?.unit,
      min_discount_amount: data?.min_discount_amount,
      max_discount_amount: data?.max_discount_amount,
      date: [dayjs(data?.start_date), dayjs(data?.expired_date)],
    });
  }, [
    data?.code,
    data?.discount,
    data?.expired_date,
    data?.max_discount_amount,
    data?.min_discount_amount,
    data?.start_date,
    data?.unit,
    data?.usage_limit,
    form,
  ]);

  const { t } = useTranslation();
  const errorForm: any = useMemo(() => {
    const errorResult = error;

    if (isEntityError(errorResult)) {
      return errorResult.data.errors;
    }

    return null;
  }, [error]);

  const validateDiscount = (_: any, value: number | undefined) => {
    if (form.getFieldValue("unit") === "0" && value && value >= 100) {
      return Promise.reject(t("admin_shop.product.evouncher.validate.maximum_100"));
    }
    return Promise.resolve();
  };
  return (
    <Spin spinning={isFetching || isLoading}>
      <Form autoComplete="off" onFinish={handleSubmit} form={form}>
        <Row justify="space-between" gutter={16}>
          <Col span={12}>
            <S.FormField
              label={t("admin_shop.product.evouncher.table.id_vouncher")}
              name="code"
              rules={[
                {
                  required: true,
                  message: `${t("admin_shop.product.evouncher.validate.required")} ${t(
                    "admin_shop.product.evouncher.table.id_vouncher"
                  )}`,
                },
                {
                  pattern: /^[^!@#$%^&*(),.?":{}|<>]+$/,
                  message: t("admin_shop.product.evouncher.validate.special_chars"),
                },
                {
                  min: 5,
                  message: t("admin_shop.product.evouncher.validate.least_5"),
                },
                {
                  max: 10,
                  message: t("admin_shop.product.evouncher.validate.limit_10"),
                },
              ]}
              validateStatus={errorForm?.code && "error"}
              help={errorForm?.code && errorForm?.code[0]}
            >
              <Input />
            </S.FormField>
          </Col>
          <Col span={12}>
            <S.FormField
              label={t("admin_shop.product.evouncher.table.usage_limit")}
              name="usage_limit"
              rules={[
                {
                  required: true,
                  message: `${t("admin_shop.product.evouncher.validate.required")} ${t(
                    "admin_shop.product.evouncher.table.usage_limit"
                  )}`,
                },
                {
                  pattern: /^\d+$/,
                  message: t("admin_shop.product.evouncher.validate.number"),
                },
              ]}
              validateStatus={errorForm?.usage_limit && "error"}
              help={errorForm?.usage_limit && errorForm?.usage_limit[0]}
            >
              <Input />
            </S.FormField>
          </Col>
          <Col span={20}>
            <S.FormField
              label={t("admin_shop.product.evouncher.table.discount")}
              name="discount"
              rules={[
                {
                  required: true,
                  message: `${t("admin_shop.product.evouncher.validate.required")} ${t(
                    "admin_shop.product.evouncher.table.discount"
                  )}`,
                },
                {
                  validator: validateDiscount,
                },
              ]}
              validateStatus={errorForm?.discount && "error"}
              help={errorForm?.discount && errorForm?.discount[0]}
            >
              <InputNumber
                formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                parser={(value) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
                className="w-full"
              />
            </S.FormField>
          </Col>
          <Col span={4}>
            <S.FormField
              label={t("admin_shop.product.evouncher.table.unit")}
              name="unit"
              rules={[
                {
                  required: true,
                  message: `${t("admin_shop.product.evouncher.validate.required")} ${t(
                    "admin_shop.product.evouncher.table.unit"
                  )}`,
                },
              ]}
              validateStatus={errorForm?.unit && "error"}
              help={errorForm?.unit && errorForm?.unit[0]}
            >
              <Select
                options={[
                  {
                    value: "0",
                    label: "%",
                  },
                  {
                    value: "1",
                    label: "VNĐ",
                  },
                ]}
                onChange={handleUnitChange}
              />
            </S.FormField>
          </Col>

          <Col span={12}>
            <S.FormField
              label={t("admin_shop.product.evouncher.table.min_discount_amount")}
              name="min_discount_amount"
              rules={[
                {
                  required: true,
                  message: `${t("admin_shop.product.evouncher.validate.required")} ${t(
                    "admin_shop.product.evouncher.table.min_discount_amount"
                  )}`,
                },
                { pattern: /^\d+$/, message: t("admin_shop.product.evouncher.validate.number") },
                {
                  validator: (_: any, value: number) =>
                    value >= 1000
                      ? Promise.resolve()
                      : Promise.reject(`${t("admin_shop.product.evouncher.validate.min_value")}`),
                },
              ]}
              validateStatus={errorForm?.min_discount_amount && "error"}
              help={errorForm?.min_discount_amount && errorForm?.min_discount_amount[0]}
            >
              <InputNumber
                formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                parser={(value) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
                className="w-full"
              />
            </S.FormField>
          </Col>
          <Col span={12}>
            <S.FormField
              label={t("admin_shop.product.evouncher.table.max_discount_amount")}
              name="max_discount_amount"
              rules={[
                {
                  required: true,
                  message: `${t("admin_shop.product.evouncher.validate.required")} ${t(
                    "admin_shop.product.evouncher.table.max_discount_amount"
                  )}`,
                },
                {
                  validator: (_: any, value: number) =>
                    value >= 10000
                      ? Promise.resolve()
                      : Promise.reject(`${t("admin_shop.product.evouncher.validate.min_value_10000")}`),
                },
                { pattern: /^\d+$/, message: t("admin_shop.product.evouncher.validate.number") },
              ]}
              validateStatus={errorForm?.max_discount_amount && "error"}
              help={errorForm?.max_discount_amount && errorForm?.max_discount_amount[0]}
            >
              <InputNumber
                formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                parser={(value) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
                className="w-full"
              />
            </S.FormField>
          </Col>
          <Col span={24}>
            <S.FormField
              label={t("admin_shop.product.evouncher.table.date")}
              hasFeedback
              name="date"
              validateStatus={errorForm?.start_date && "error" && errorForm?.expired_date && "error"}
              help={
                errorForm?.start_date &&
                errorForm?.start_date[0] &&
                errorForm?.expired_date &&
                errorForm?.expired_date[0]
              }
            >
              <RangePicker
                className="w-full"
                showTime={{
                  hideDisabledOptions: true,
                  // defaultValue: [dayjs(data?.start_date), dayjs(data?.expired_date)],
                }}
                format="DD-MM-YYYY ss:mm:HH"
              />
            </S.FormField>
          </Col>
        </Row>
        <S.FormField className="text-right">
          <Button size="large" type="primary" htmlType="submit">
            {t("admin_shop.product.evouncher.form.update_voucher")}
          </Button>
        </S.FormField>
      </Form>
    </Spin>
  );
};

export default EditVoucher;
