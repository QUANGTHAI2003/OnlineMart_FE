import SelectAddress from "@app/app/components/clients/SelectAddress/SelectAddress";
import { useCreateAddressMutation } from "@app/store/slices/api/user/addressApi";
import { useAppSelector } from "@app/store/store";
import { isEntityError, notifyError, notifySuccess } from "@app/utils/helper";
import { Input, Button, Form } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Address.styles";

const { TextArea } = Input;

type FormValues = {
  fullname: string;
  phone: number;
  address: string;
  city: string;
  district: string;
  ward: string;
  is_default: boolean;
  user_id: number;
  full_address: string;
};

type ErrorMessage = {
  [key: number]: string;
};

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};

const CreateAddress = ({ setIsModalOpen }: any) => {
  const { t } = useTranslation();

  const [createAddress, { error, isLoading }] = useCreateAddressMutation();
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.userState.user);

  const handleSubmit = async (data: FormValues) => {
    const name = data.fullname;
    const phone = data.phone;
    const full_address = data.full_address;
    const address = data.address;
    const is_default = data.is_default;
    const user_id = user.id;
    const value = {
      name,
      phone,
      city: full_address.split(",")[2],
      district: full_address.split(",")[1],
      ward: full_address.split(",")[0],
      address: address + ", " + full_address,
      is_default: is_default ? "1" : "0",
      user_id,
    };
    try {
      await createAddress(value).unwrap();
      notifySuccess("Successfully", "Create address successfully");
      form.resetFields();
      setIsModalOpen(false);
    } catch (err: any) {
      const status = err.status || 500;
      const errorMessages: ErrorMessage = {
        400: "Bad Request",
        401: "Unauthorized",
        500: "Internal Server Error",
      };

      const errorMessage = errorMessages[status];
      notifyError("Create address failed", errorMessage);
    }
  };

  const errorForm: any = useMemo(() => {
    const errorResult = error;

    if (isEntityError(errorResult)) {
      return errorResult.data.errors;
    }

    return null;
  }, [error]);

  return (
    <S.AddressStyle>
      <div className="min-w-min bg-white">
        <Form className="md:text-sm sm:text-xs" form={form} autoComplete="off" onFinish={handleSubmit}>
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
            validateStatus={errorForm?.fullname && "error"}
            help={errorForm?.fullname?.[0]}
          >
            <Input placeholder={t("user.address.p_fullname")} />
          </S.FormItem>
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
            validateStatus={errorForm?.phone && "error"}
            help={errorForm?.phone?.[0]}
          >
            <Input type="number" placeholder={t("user.address.p_phone")} />
          </S.FormItem>
          <S.FormItem name="full_address">
            <SelectAddress onAddressChange={(value) => form.setFieldsValue({ full_address: value })} />
          </S.FormItem>
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
            validateStatus={errorForm?.address && "error"}
            help={errorForm?.address?.[0]}
          >
            <TextArea rows={3} placeholder={t("user.address.p_address")} />
          </S.FormItem>
          <S.FormItem name="is_default" valuePropName="checked">
            <S.FormCheckBox onChange={onChange} value>
              {t("user.address.set_default")}
            </S.FormCheckBox>
          </S.FormItem>
          <S.FormItem>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={isLoading}
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
