import SelectAddress from "@app/app/components/clients/SelectAddress/SelectAddress";
import { useGetOneAddressQuery, useUpdateAddressMutation } from "@app/store/slices/api/user/addressApi";
import { isEntityError, notifyError, notifySuccess } from "@app/utils/helper";
import { Input, Button, Form } from "antd";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./Address.styles";
const { TextArea } = Input;

type IFormAddress = {
  name: string;
  phone: string;
  full_address: string;
  address: string;
};

const EditAddress = ({ id, setIsModalOpen }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data } = useGetOneAddressQuery(id);
  const [updateAddress, error] = useUpdateAddressMutation();

  const handleSubmit = async (data: IFormAddress) => {
    const name = data?.name;
    const phone = data?.phone;
    const full_address = data?.full_address;
    const address = data?.address;
    const value = {
      id,
      name,
      phone,
      city: full_address.split(",")[2],
      district: full_address.split(",")[1],
      ward: full_address.split(",")[0],
      address: address + ", " + full_address,
    };

    try {
      await updateAddress(value).unwrap();
      notifySuccess("Successfully", "Update address successfully");
      setIsModalOpen(false);
    } catch (err) {
      notifyError("Error", "Update address failed");
    }
  };
  const errorForm: any = useMemo(() => {
    const errorResult = error;

    if (isEntityError(errorResult)) {
      return errorResult;
    }

    return null;
  }, [error]);

  useEffect(() => {
    form.setFieldsValue({
      fullname: data?.name,
      phone: data?.phone,
      address: data?.ward + `, ` + data?.district + `, ` + data?.city,
      city: data?.full_address?.split(",")[2],
      district: data?.full_address?.split(",")[1],
      ward: data?.full_address?.split(",")[0],
    });
  }, [data, form]);

  return (
    <S.AddressStyle>
      <div className="min-w-min bg-white">
        <Form
          className="md:text-sm sm:text-xs"
          form={form}
          autoComplete="off"
          onFinish={handleSubmit}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <S.FormItem
            name="name"
            label={t("user.address.fullname")}
            rules={[
              {
                required: true,
                message: t("user.address.err_fullname"),
              },
              { whitespace: true },
              { min: 6 },
            ]}
            validateStatus={errorForm?.name && "error"}
            help={errorForm?.name && errorForm?.name[0]}
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

export default EditAddress;
