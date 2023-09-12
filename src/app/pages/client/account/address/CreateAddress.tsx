import SelectAddress from "@app/app/components/clients/SelectAddress/SelectAddress";
import { Input, Button, Form } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Address.styles";
const { TextArea } = Input;
const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};
const handleGetAddress = (address: string) => {
  console.log(address);
};

const CreateAddress = () => {
  const { t } = useTranslation();
  useEffect(() => {
    console.log("render");
  });
  return (
    <S.AddressStyle>
      <div className="min-w-min bg-white">
        <Form
          className="md:text-sm sm:text-xs"
          autoComplete="off"
          onFinish={(values) => {
            console.log({ values });
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          {/* Họ và tên */}
          <S.FormItem
            name="fullname"
            label={t("user.address.fullname")}
            rules={[
              {
                required: true,
                message: t("user.address.err_fullname"),
              },
              { whitespace: true },
              { min: 6 },
            ]}
          >
            <Input placeholder={t("user.address.p_fullname")} />
          </S.FormItem>
          {/* Số điện thoại */}
          <S.FormItem
            name="phone"
            label={t("user.address.phone")}
            rules={[
              {
                required: true,
                message: "",
              },
              {
                validator(_: any, value: any) {
                  return new Promise((resolve: any, reject: any) => {
                    const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
                    if (phoneRegex.test(value)) {
                      resolve();
                    } else {
                      reject(t("user.address.err_phone"));
                    }
                  });
                },
              },
            ]}
          >
            <Input type="number" placeholder={t("user.address.p_phone")} />
          </S.FormItem>
          {/* Select */}
          <S.FormItem>
            <SelectAddress onAddressChange={handleGetAddress} />
          </S.FormItem>
          {/* Địa chỉ */}
          <S.FormItem
            name="address"
            label={t("user.address.address")}
            rules={[
              {
                required: true,
                message: t("user.address.err_address"),
              },
              { whitespace: true },
              { min: 3 },
            ]}
          >
            <TextArea rows={3} placeholder={t("user.address.p_address")} />
          </S.FormItem>
          {/* Check Default */}
          <S.FormItem name="default_address" valuePropName="checked">
            <S.FormCheckBox onChange={onChange} value>
              {t("user.address.set_default")}
            </S.FormCheckBox>
          </S.FormItem>
          <S.FormItem>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="bg-[#fdd835] text-center text-sm py-2 px-12 text-[#4a4a4a] h-auto"
            >
              {t("user.address.action_update")}
            </Button>
          </S.FormItem>
        </Form>
      </div>
    </S.AddressStyle>
  );
};

export default CreateAddress;
