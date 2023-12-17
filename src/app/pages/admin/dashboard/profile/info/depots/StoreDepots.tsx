import { ArrowLeftOutlined } from "@ant-design/icons";
import { AdminBreadcrumb } from "@app/app/components/common/Breadcrumb/Breadcrumb";
import { useCreateBankMutation, useGetInfoShopRootQuery } from "@app/store/slices/api/admin/adminShopApi";
import { useAppSelector } from "@app/store/store";
import { handleApiError, notifySuccess } from "@app/utils/helper";
import { Button, Form, Input, Row, Select, Typography } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as S from "../AccountStoreInfo.styles";
import AlertNotification from "../components/AlertNotification";

interface IBank {
  id: string;
  name: string;
  shortName: string;
}

type FormValues = {
  name_bank: string;
  user_name_bank: string;
  number_bank: string;
};

const bankAPI = import.meta.env.VITE_API_BANKS as string;

const StoreDepots = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const numberBankPattern = /^\d{9}$|^\d{12}$|^\d{15}$/;

  const [data, setData] = useState<IBank[]>([]);

  const shopId = useAppSelector((state) => state.userState.user?.shop_id);
  const [createBank, { isLoading }] = useCreateBankMutation();
  const { data: shopInfomation } = useGetInfoShopRootQuery(shopId);

  const handleSubmit = async (data: FormValues) => {
    const value = {
      name_bank: data.name_bank,
      user_name_bank: data.user_name_bank,
      number_bank: data.number_bank,
      _method: "PATCH",
    };
    try {
      await createBank({ shopId: shopId, data: value }).unwrap();
      notifySuccess("Successfully", "Create bank successfully");
    } catch (err: any) {
      handleApiError(err);
    }
  };
  console.log("handleSubmit", handleSubmit);

  useEffect(() => {
    const axiosConfig: AxiosRequestConfig = {
      url: bankAPI,
      method: "GET",
      responseType: "json",
    };

    axios(axiosConfig).then(({ data }) => {
      setData(data.data);
    });
  }, []);

  const banks = useMemo(() => {
    return data;
  }, [data]);

  const validateMessages = {
    required: "${label} " + t("admin_shop.shop_info.store_bank_depots.validate_required"),
    types: {
      email: "${label} " + t("admin_shop.shop_info.store_bank_depots.validate_type"),
    },
    pattern: {
      mismatch: "${label} " + t("admin_shop.shop_info.store_bank_depots.validate_invalid"),
    },
  };

  useEffect(() => {
    form.setFieldsValue({
      name_bank: shopInfomation?.name_bank,
      user_name_bank: shopInfomation?.user_name_bank,
      number_bank: shopInfomation?.number_bank,
    });
  }, [shopInfomation, form]);

  return (
    <main>
      <div className="bg-white px-6 pb-6">
        <AdminBreadcrumb />
        <section className="flex items-center gap-x-2">
          <Link to="/admin/shop/profile">
            <ArrowLeftOutlined className="text-lg text-black" />
          </Link>
          <Typography.Title className="mb-0" level={3}>
            {t("admin_shop.shop_info.store_bank_depots.title")}
          </Typography.Title>
        </section>
      </div>
      <AlertNotification className="mb-6" />
      <S.ShopSettingCard
        className="mb-5 mx-6 store-depots"
        type="inner"
        title={
          <>
            <Typography.Title className="mb-1" level={4}>
              {t("admin_shop.shop_info.store_bank_depots.title")}
            </Typography.Title>
            <span className="leading-4 font-normal text-gray-600">
              {t("admin_shop.shop_info.store_bank_depots.title_desc")}
            </span>
          </>
        }
        bordered={false}
      >
        <Form
          autoComplete="off"
          labelWrap={true}
          requiredMark={false}
          onFinish={handleSubmit}
          form={form}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="name_bank"
            hasFeedback
            colon={false}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            label={<div className="font-bold">{t("admin_shop.shop_info.store_bank_depots.bank_name")}</div>}
            rules={[{ required: true }]}
          >
            <Select
              size="large"
              className="form-select form-select-sm w-full"
              id="bank"
              aria-label=".form-select-sm"
              showSearch
            >
              {banks?.map((bank) => (
                <Select.Option key={bank?.id} value={bank?.name}>
                  {`${bank?.name} (${bank?.shortName})`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            colon={false}
            name="user_name_bank"
            hasFeedback
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            label={<b>{t("admin_shop.shop_info.store_bank_depots.bank_account_name")}</b>}
            rules={[{ required: true }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            colon={false}
            name="number_bank"
            hasFeedback
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            label={<b>{t("admin_shop.shop_info.store_bank_depots.bank_account_number")}</b>}
            rules={[{ required: true }, { pattern: numberBankPattern }]}
          >
            <Input size="large" />
          </Form.Item>
          <Row justify="end">
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                {t("admin_shop.shop_info.store_bank_depots.save")}
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </S.ShopSettingCard>
    </main>
  );
};

export default StoreDepots;
