import { PlusOutlined } from "@ant-design/icons";
import { setPermission, setStatusType } from "@app/store/slices/redux/admin/sellerAdminSlice";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { Button, Drawer, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const FillerDrawer = React.memo(({ statusTypeData, permissionList }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const statusType = useAppSelector((state) => state.sellerAdmin.filteredValue.statusType) || "all";
  const permissionsFilter = useAppSelector((state) => state.sellerAdmin.filteredValue.permissionFilter);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      statusType: statusType,
      permissions: permissionsFilter,
    });
  }, [form, permissionsFilter, statusType]);

  const handleApplySort = (values: any) => {
    const { statusType, permissions } = values;
    console.log("🚀 ~ file: FillerDrawer.tsx:34 ~ handleApplySort ~ permissions:", permissions);
    dispatch(setStatusType(statusType));
    dispatch(setPermission(permissions));
  };

  return (
    <>
      <Button block onClick={showDrawer}>
        {t("admin_shop.seller.filter.type.other")}
        <PlusOutlined />
      </Button>
      <Drawer
        title={t("admin_shop.seller.filter.type.other")}
        placement="right"
        footer={
          <div className="flex justify-end">
            <Button className="mr-2" onClick={onClose}>
              {t("admin_shop.seller.filter.filter")}
            </Button>
            <Button type="primary" form="sellerDrawerSort" htmlType="submit" onClick={onClose}>
              {t("admin_shop.seller.filter.apply")}
            </Button>
          </div>
        }
        onClose={onClose}
        open={open}
      >
        <Form form={form} id="sellerDrawerSort" onFinish={handleApplySort} layout="vertical" autoComplete="off">
          <Form.Item name="statusType" label={t("admin_shop.seller.filter.type.condition")}>
            <Select
              className="w-full"
              placeholder={t("admin_shop.seller.filter.type.condition")}
              popupMatchSelectWidth={false}
              size="middle"
              options={statusTypeData}
            />
          </Form.Item>
          <Form.Item name="permissions" label={t("admin_shop.seller.register.form.permission")}>
            <Select
              mode="multiple"
              className="w-full"
              placeholder={t("admin_shop.seller.filter.type.condition")}
              popupMatchSelectWidth={false}
              size="middle"
              options={permissionList?.map((item: any) => {
                return { label: item.name, value: item.name };
              })}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
});

export default FillerDrawer;
