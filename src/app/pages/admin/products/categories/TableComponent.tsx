import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space, Switch, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as S from "./Category.styles";
import EditCategory from "./EditCategory";

const { confirm } = Modal;

interface IDataType {
  key: string;
  name: string;
  name_child: string;
  image: string;
  keyword: string[];
  status: number;
}

const showConfirm = (key: number) => {
  confirm({
    title: "Do you Want to delete these items?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    centered: true,
    keyboard: true,
    maskClosable: true,
    onOk() {
      console.log("Delete ", key);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const TableComponent = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (key: any) => {
    console.log(key);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [sortedInfo, _] = useState<SorterResult<IDataType>>({});

  const columns: ColumnsType<IDataType> = [
    {
      title: t("admin_shop.categories.col_name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
    },
    {
      title: "Danh mục con",
      dataIndex: "name_child",
      key: "name_child",
    },
    {
      title: t("admin_shop.categories.col_image"),
      dataIndex: "image",
      key: "image",
      render: (_, { name, image }) => (
        <div className="w-28">
          <img className="w-full h-full object-cover" src={image} alt={name} />
        </div>
      ),
    },
    {
      title: t("admin_shop.categories.col_keyword"),
      dataIndex: "keyword",
      key: "keyword",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "keyword" ? sortedInfo.order : null,
      render: (_, { keyword }) => (
        <>
          {keyword.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag className="mb-2" color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: t("admin_shop.categories.col_status"),
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      render: (_, { status }) => (
        <Switch checkedChildren="Hiện" defaultChecked={status === 1 ? true : false} unCheckedChildren="Ẩn" />
      ),
    },
    {
      title: t("admin_shop.categories.col_action"),
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record: any) => (
        <Space size="middle" direction="vertical">
          <Button type="primary" ghost onClick={() => showModal(record.key)} className="w-full">
            {t("admin_shop.categories.btn_edit")}
          </Button>
          <S.ModalForm
            centered
            className="min-w-[800px]"
            title="Sửa danh mục sản phẩm"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <EditCategory />
          </S.ModalForm>
          <Button className="w-full" onClick={() => showConfirm(record.key)}>
            {t("admin_shop.categories.btn_delete")}
          </Button>
        </Space>
      ),
    },
  ];

  const data: IDataType[] = [
    {
      key: "1",
      name: "Đồ gia dụng",
      name_child: "Chảo",
      image:
        "https://plus.unsplash.com/premium_photo-1676068244015-6d08a8759079?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      keyword: ["home", "house"],
      status: 1,
    },
    {
      key: "2",
      name: "Đồ điện tử",
      name_child: "Máy phát điện",
      image:
        "https://plus.unsplash.com/premium_photo-1676068244015-6d08a8759079?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      keyword: ["electronic", "developer"],
      status: 0,
    },
    {
      key: "3",
      name: "Đồ ăn",
      name_child: "Bánh trán trộn",
      image:
        "https://plus.unsplash.com/premium_photo-1676068244015-6d08a8759079?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      keyword: ["food", "hambuger"],
      status: 1,
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <S.WrapperTable>
      <Table rowSelection={rowSelection} scroll={{ x: 1024 }} columns={columns} dataSource={data} />
    </S.WrapperTable>
  );
};

export default TableComponent;
