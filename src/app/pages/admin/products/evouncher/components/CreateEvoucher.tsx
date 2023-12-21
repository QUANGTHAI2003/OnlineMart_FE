import { useCreateVoucherMutation } from "@app/store/slices/api/admin/voucherApi";
import { useAppSelector } from "@app/store/store";
import { handleApiError, isEntityError, notifySuccess } from "@app/utils/helper";
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../Evouncher.style";

type FormValues = {
  fieldValues: any;
  code: string;
  usage_limit: number;
  discount: string;
  unit: "0" | "1";
  min_discount_amount: number;
  max_discount_amount: number;
  date: string;
  start_date: string;
  expired_date: string;
  status: "0" | "1" | "2";
};

const CreateEvoucher = ({ onCancel }: any) => {
  const { t } = useTranslation();
  const [createVoucher, { isLoading, error }] = useCreateVoucherMutation();
  const [disabled, setDisabled] = useState<boolean>(false);
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const shop_id = useAppSelector((state) => state.userState.user)?.shop?.id;

  const handleUnitChange = () => {
    form.validateFields(["discount"]);
    if (form.getFieldValue("unit") === "1") {
      setDisabled(!disabled);
      form.setFieldsValue({
        max_discount_amount: form.getFieldValue("discount"),
      });
    } else if (form.getFieldValue("unit") === "0") {
      setDisabled(false); // Sửa thành false để bỏ đánh dấu disabled
    }
  };

  useEffect(() => {
    if (form.getFieldValue("unit") === "1") {
      setDisabled(!disabled);
      form.setFieldsValue({
        max_discount_amount: form.getFieldValue("discount"),
      });
    } else if (form.getFieldValue("unit") === "0") {
      setDisabled(false); // Sửa thành false để bỏ đánh dấu disabled
    }
  }, [disabled, form]);
  const handleSubmit = async (data: FormValues) => {
    const code = data.code;
    const usage_limit = data.usage_limit;
    const discount = data.discount;
    const unit = data.unit;
    const min_discount_amount = data.min_discount_amount;
    const max_discount_amount = data.max_discount_amount;
    const start_date = data.date && dayjs(data.date[0]).format("YYYY-MM-DD ss:mm:HH");
    const expired_date = data.date && dayjs(data.date[1]).format("YYYY-MM-DD ss:mm:HH");
    const status = data.status;
    const values = {
      code,
      usage_limit,
      discount,
      unit,
      min_discount_amount,
      max_discount_amount,
      start_date,
      expired_date,
      status,
      shop_id,
    };
    try {
      await createVoucher(values).unwrap();
      notifySuccess(t("admin_shop.product.evouncher.create_successfully"));
      form.resetFields();
      onCancel();
    } catch (err: any) {
      handleApiError(err);
    }
  };
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
    <Spin spinning={isLoading}>
      <Form
        autoComplete="off"
        onFinish={handleSubmit}
        form={form}
        initialValues={{
          status: "1",
          unit: "0",
        }}
      >
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
                  pattern: /^\d*$/,
                  message: t("admin_shop.product.evouncher.validate.number"),
                },
                {
                  pattern: /^(?!0$)-?\d+$/,
                  message: t("admin_shop.product.evouncher.validate.lease_0"),
                },
              ]}
              validateStatus={errorForm?.usage_limit && "error"}
              help={errorForm?.usage_limit && errorForm?.usage_limit[0]}
            >
              <InputNumber maxLength={10} className="w-full" />
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
                  pattern: /^[0-9]+(\.[0-9]+)?$/,
                  message: t("admin_shop.product.evouncher.validate.lease_0"),
                },
                {
                  validator: validateDiscount,
                },
              ]}
              validateStatus={errorForm?.discount && "error"}
              help={errorForm?.discount && errorForm?.discount[0]}
            >
              <InputNumber
                maxLength={10}
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
                {
                  validator: (_: any, value: number) =>
                    value > 1000
                      ? Promise.resolve()
                      : Promise.reject(`${t("admin_shop.product.evouncher.validate.min_value")}`),
                },
                {
                  pattern: /^[0-9]+(\.[0-9]+)?$/,
                  message: t("admin_shop.product.evouncher.validate.lease_0"),
                },
              ]}
              validateStatus={errorForm?.min_discount_amount && "error"}
              help={errorForm?.min_discount_amount && errorForm?.min_discount_amount[0]}
            >
              <InputNumber
                maxLength={10}
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
                  pattern: /^[0-9]+(\.[0-9]+)?$/,
                  message: t("admin_shop.product.evouncher.validate.lease_0"),
                },
                {
                  validator: (_: any, value: number) =>
                    value > 10000
                      ? Promise.resolve()
                      : Promise.reject(`${t("admin_shop.product.evouncher.validate.min_value_10000")}`),
                },
              ]}
              validateStatus={errorForm?.max_discount_amount && "error"}
              help={errorForm?.max_discount_amount && errorForm?.max_discount_amount[0]}
            >
              <InputNumber
                maxLength={10}
                disabled={disabled}
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
                  defaultValue: [dayjs("00:00:00", "ss:mm:HH"), dayjs("11:59:59", "ss:mm:HH")],
                }}
                format="DD-MM-YYYY ss:mm:HH"
              />
            </S.FormField>
          </Col>
        </Row>
        <S.FormField className="text-right">
          <Button size="large" type="primary" htmlType="submit">
            {t("admin_shop.product.evouncher.add_vouncher")}
          </Button>
        </S.FormField>
      </Form>
    </Spin>
  );
};

export default CreateEvoucher;
