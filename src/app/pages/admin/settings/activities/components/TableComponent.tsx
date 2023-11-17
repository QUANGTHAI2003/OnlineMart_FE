import { EyeOutlined } from "@ant-design/icons";
import { setActivity } from "@app/store/slices/activitySlice";
import { useGetActivityLogQuery } from "@app/store/slices/api/activityApi";
import { useAppDispatch } from "@app/store/store";
import { removeDiacritics } from "@app/utils/helper";
import { Modal, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import ModalLog from "./ModalLog";

interface IDataType {
  id: number;
  author: string;
  action_type: string;
  action: string;
  content: string;
  action_date: string;
  ip: string;
  userAgent: string;
}

const TableComponent = React.memo(({ searchValue, searchType }: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data: activities } = useGetActivityLogQuery();

  useEffect(() => {
    if (activities) {
      dispatch(setActivity(activities));
    }
  }, [activities, dispatch]);

  const showModal = (key: any) => {
    setSelectedRecordId(key);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setSelectedRecordId(null);

    setIsModalOpen(false);
  };

  const getColorForAction = (action_type: string) => {
    const colorMap: { [key: string]: string } = {
      login: "processing",
      register: "processing",
      create: "success",
      update: "warning",
      delete: "error",
    };

    if (action_type in colorMap) {
      return colorMap[action_type];
    }

    return "default";
  };

  const columns: ColumnsType<IDataType> = [
    {
      title: t("admin_shop.settings.logs.table.author"),
      dataIndex: "author",
      key: "author",
      render: (text) => <p>{text}</p>,
    },
    {
      title: t("admin_shop.settings.logs.table.action_date"),
      dataIndex: "action_date",
      key: "action_date",
    },
    {
      title: t("admin_shop.settings.logs.table.action"),
      key: "action",
      dataIndex: "action",
      render: (_, { action, action_type }) => (
        <Tag color={getColorForAction(action_type)} key={action}>
          {action}
        </Tag>
      ),
    },
    {
      title: t("admin_shop.settings.logs.table.description"),
      key: "content",
      render: (_, record) => (
        <Space size="middle">
          <p>{record.content}</p>
        </Space>
      ),
    },
    {
      title: t("admin_shop.settings.logs.table.detail"),
      key: "detail",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <Space size="middle" key={record.id}>
          <EyeOutlined onClick={() => showModal(record.id)} />
        </Space>
      ),
    },
  ];

  const displayedActivities: any = useMemo(() => {
    let filterActivities: any = activities || [];

    if (searchValue) {
      filterActivities = filterActivities.filter((activity: any) => {
        const fieldValue = activity[searchType];
        const searchValueString = searchValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }

    return filterActivities;
  }, [searchType, searchValue, activities]);

  return (
    <>
      <Table
        dataSource={displayedActivities}
        rowKey={(record) => record.id}
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ["20", "50", "100"],
          showTotal(total, range) {
            return `${range[0]}-${range[1]} ${t("admin_shop.settings.logs.record_item")} ${total} ${t(
              "admin_shop.settings.logs.records"
            )}`;
          },
        }}
        columns={columns}
        scroll={{ x: 1024 }}
      />
      <Modal
        title={t("admin_shop.settings.logs.detail")}
        open={isModalOpen}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
        footer={[]}
        className="min-w-[150x]"
      >
        {selectedRecordId !== null && <ModalLog id={selectedRecordId} />}
      </Modal>
    </>
  );
});

export default TableComponent;
