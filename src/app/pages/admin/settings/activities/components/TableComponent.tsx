import { DatabaseOutlined, EyeOutlined } from "@ant-design/icons";
import { useDebounce } from "@app/hooks";
import { setActivity } from "@app/store/slices/activitySlice";
import { useGetActivityLogQuery } from "@app/store/slices/api/activityApi";
import { useAppDispatch, useAppSelector } from "@app/store/store";
import { removeDiacritics } from "@app/utils/helper";
import { Modal, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import ModalData from "./ModalData";
import ModalLog from "./ModalLog";
import SortData from "./SortData";

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

dayjs.extend(isBetween);

const TableComponent: React.FC<any> = React.memo(() => {
  const [isModalLogOpen, setIsModalLogOpen] = useState<boolean>(false);
  const [isModalDataOpen, setIsModalDataOpen] = useState<boolean>(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data: activities } = useGetActivityLogQuery();

  const {
    filteredValue,
    searchValue,
    selectSearchType: searchType = "author",
  } = useAppSelector((state) => state.activityAdmin);
  const debouncedValue = useDebounce(searchValue, 300);

  useEffect(() => {
    if (activities) {
      dispatch(setActivity(activities));
    }
  }, [activities, dispatch]);

  const showModal = (key: any) => {
    setSelectedRecordId(key);
    setIsModalLogOpen(true);
  };
  const showModalData = (key: any) => {
    setSelectedRecordId(key);
    setIsModalDataOpen(true);
  };

  const handleCancel = () => {
    setSelectedRecordId(null);

    setIsModalLogOpen(false);
  };

  const handleCancelData = () => {
    setSelectedRecordId(null);

    setIsModalDataOpen(false);
  };

  const getColorForAction = (action_type: string) => {
    const colorMap: { [key: string]: string } = {
      login: "processing",
      register: "processing",
      create: "success",
      update: "warning",
      delete: "error",
      system: "volcano",
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
          <DatabaseOutlined onClick={() => showModalData(record.id)} />
        </Space>
      ),
    },
  ];

  const authorData = useAppSelector((state) => state.activityAdmin.filteredValue.authorFilter);
  const actionData = useAppSelector((state) => state.activityAdmin.filteredValue.actionFilter);
  const startDate = useAppSelector((state) => state.activityAdmin.filteredValue.startDateFilter);
  const endDate = useAppSelector((state) => state.activityAdmin.filteredValue.endDateFilter);

  const displayedActivities: any = useMemo(() => {
    let filterActivities = activities;

    if (debouncedValue) {
      filterActivities = filterActivities?.filter((activity: any) => {
        const fieldValue = activity[searchType];
        const searchValueString = debouncedValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }

    if (authorData.length > 0) {
      filterActivities = filterActivities?.filter((activity: any) => {
        const fieldValue = activity?.author;

        return authorData.includes(fieldValue);
      });
    }

    if (actionData.length > 0) {
      filterActivities = filterActivities?.filter((activity) => {
        const content = activity.content.toLowerCase();

        // Split the action string into words
        const actions = actionData.flatMap((action: any) => action.toLowerCase().split(" "));

        // Check if any word from action is in the content
        return actions.some((action: any) => content.includes(action));
      });
    }

    if (startDate && endDate) {
      filterActivities = filterActivities?.filter((activity: any) => {
        const activityDate = dayjs(activity.action_date).locale("vi").format("DD-MM-YYYY");
        return dayjs(activityDate).isBetween(startDate, endDate, null, "[]");
      });
    }

    return filterActivities;
  }, [activities, searchType, debouncedValue, authorData, actionData, startDate, endDate]);

  const isFilteredValueEmpty = Object.values(filteredValue).every(
    (value) => !value || (Array.isArray(value) && value.length === 0)
  );

  return (
    <>
      {!isFilteredValueEmpty && <SortData />}
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
        open={isModalLogOpen}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
        footer={[]}
        className="min-w-[150x]"
      >
        {selectedRecordId !== null && <ModalLog id={selectedRecordId} />}
      </Modal>
      <Modal
        title={t("admin_shop.settings.logs.detail")}
        open={isModalDataOpen}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancelData}
        footer={[]}
        className="min-w-[150x]"
      >
        {selectedRecordId !== null && <ModalData id={selectedRecordId} />}
      </Modal>
    </>
  );
});

export default TableComponent;
