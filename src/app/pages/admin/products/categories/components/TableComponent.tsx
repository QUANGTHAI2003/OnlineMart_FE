import { ExclamationCircleFilled } from "@ant-design/icons";
import { Can, PermissionsSwitch } from "@app/app/components/common/Permissions";
import { AdminTable } from "@app/app/components/common/Table/AdminTable";
import {
  useDeleteCategoryMutation,
  useGetCategoryListQuery,
  useUpdateStatusMutation,
} from "@app/store/slices/api/categoryApi";
import { ICategory } from "@app/types/categories.types";
import { notifyError, notifySuccess, removeDiacritics } from "@app/utils/helper";
import { Button, Card, Divider, Modal, Space, Switch } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../Category.styles";
import EditCategory from "../EditCategory";

import { UpdateData } from ".";

const { confirm } = Modal;

const baseImage = import.meta.env.VITE_BASE_IMAGE_URL;

const shopId = 1;

const TableComponent = ({ dataCategory, searchValue, searchType }: any) => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<ICategory>>({});
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  const { data: categories, isFetching } = useGetCategoryListQuery(shopId);
  const [updateStatus] = useUpdateStatusMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const showConfirm = (categoryId: number) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      centered: true,
      keyboard: true,
      maskClosable: true,
      onOk() {
        deleteCategory(categoryId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleChangeStatus = async (categoryId: number) => {
    try {
      await updateStatus({
        categoryId,
        shopId,
      }).unwrap();
      notifySuccess("Cập nhật trạng thái thành công", "Thành công");
    } catch (err) {
      notifyError("Cập nhật trạng thái thất bại", "Thất bại");
    }
  };

  const handleEditCatetory = (id: number) => {
    setEditingCategoryId(id);
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<ICategory> = [
    {
      title: t("admin_shop.categories.col_name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
    },
    {
      title: "Danh mục con",
      dataIndex: "category_children",
      key: "category_children",
    },
    {
      title: t("admin_shop.categories.col_image"),
      dataIndex: "thumbnail_url",
      key: "thumbnail_url",
      render: (_, { name, thumbnail_url }) => (
        <div className="w-24">
          <img className="w-full h-full object-cover" src={`${baseImage}/${thumbnail_url}`} alt={name} />
        </div>
      ),
    },
    // {
    //   title: t("admin_shop.categories.col_keyword"),
    //   dataIndex: "keyword",
    //   key: "keyword",
    //   sorter: (a, b) => a.name.length - b.name.length,
    //   sortOrder: sortedInfo.columnKey === "keyword" ? sortedInfo.order : null,
    //   render: (_, { keyword }) => (
    //     <>
    //       {keyword.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag className="mb-2" color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: t("admin_shop.categories.col_status"),
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      render: (_, { id, status }) => (
        <PermissionsSwitch>
          <Can
            permissions={["Update cateory"]}
            // style={{ backgroundColor: "gray", display: "inline-block", pointerEvents: "none" }}
          >
            <Switch
              checkedChildren="Hiện"
              onChange={() => handleChangeStatus(id)}
              defaultChecked={status === "1" ? true : false}
              unCheckedChildren="Ẩn"
            />
          </Can>
          <Can>{status === "1" ? "Hiện" : "Ẩn"}</Can>
        </PermissionsSwitch>

        // <Switch
        //   checkedChildren="Hiện"
        //   onChange={() => handleChangeStatus(id)}
        //   defaultChecked={status === "1" ? true : false}
        //   unCheckedChildren="Ẩn"
        // />
      ),
    },
    {
      title: t("admin_shop.categories.col_action"),
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record: any) => (
        <div>
          {record.parent_id !== null ? (
            <Space size="middle" direction="vertical">
              <Button type="primary" ghost onClick={() => handleEditCatetory(record.id)} className="w-full">
                {t("admin_shop.categories.btn_edit")}
              </Button>
              <S.ModalForm
                centered
                className="min-w-[800px]"
                title="Sửa danh mục sản phẩm"
                open={isModalOpen && editingCategoryId === record.id}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
              >
                <EditCategory id={record.id} dataCategory={dataCategory} />
              </S.ModalForm>
              <Button className="w-full" onClick={() => showConfirm(record.id)}>
                {t("admin_shop.categories.btn_delete")}
              </Button>
            </Space>
          ) : (
            "Danh mục mặc định"
          )}
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleChange: TableProps<ICategory>["onChange"] = (_, __, sorter) => {
    setSortedInfo(sorter as SorterResult<ICategory>);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const displayedCategory: any = useMemo(() => {
    let filteredCategory = categories;

    if (searchValue) {
      filteredCategory = filteredCategory?.filter((product: any) => {
        const fieldValue = product[searchType];
        const searchValueString = searchValue.toString();

        return removeDiacritics(fieldValue.toString())
          .toLowerCase()
          .includes(removeDiacritics(searchValueString).toLowerCase());
      });
    }

    return filteredCategory;
  }, [categories, searchType, searchValue]);

  return (
    <section>
      <Card bordered>
        <div className="card-inner">
          <div className="header">
            <Space className="mb-4" direction="horizontal" align="center">
              <h3>
                {hasSelected
                  ? `${t("admin_shop.suppliers.name", { count: selectedRowKeys.length })}`
                  : t("admin_shop.suppliers.name")}
              </h3>
              <Divider type="vertical" />
              <UpdateData hasSelected={hasSelected} selectedRowKeys={selectedRowKeys} />
            </Space>
          </div>

          <div className="body">
            <AdminTable
              loading={isFetching}
              rowSelection={rowSelection}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={displayedCategory}
              bordered
              scroll={{ x: 1024 }}
              onChange={handleChange}
            />
          </div>
        </div>
      </Card>
    </section>
  );
};

export default TableComponent;
