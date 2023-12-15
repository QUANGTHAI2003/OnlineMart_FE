import { DeleteOutlined, InfoCircleFilled } from "@ant-design/icons";
import { AdminTable } from "@app/app/components/common/Table/Table.styles";
import { Button, Form, Input, InputNumber } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface IDataType {
  key?: number;
  variants?: string;
}

interface IProductTableVariants {
  form: any;
  currentVariantValues: any;
}

const ProductTableVariants: React.FC<IProductTableVariants> = ({ form, currentVariantValues }) => {
  const [deletedRowKeys, setDeletedRowKeys] = useState<any[]>([]);

  const flattenCurrentVariantValues = Object.values(currentVariantValues).flat();

  const tableData = flattenCurrentVariantValues.map((variant: any, index: number) => ({
    key: index + 1,
    variants: variant,
  }));

  const sharedOnCell = (record: IDataType) => {
    if (deletedRowKeys.includes(record.key)) {
      return { colSpan: 0 };
    }

    return {};
  };

  const handleOnChangeInventory = (value: any) => {
    for (const key in flattenCurrentVariantValues) {
      const intKey = Number(key);
      form.setFieldsValue({ [`offer[${intKey}].quantity`]: value });
    }
  };

  const handleOnChangeSellingPrice = (value: any) => {
    for (const key in flattenCurrentVariantValues) {
      const intKey = Number(key);
      form.setFieldsValue({ [`offer[${intKey}].selling_price`]: value });
    }
  };

  const handleOnChangeSalePrice = (value: any) => {
    for (const key in flattenCurrentVariantValues) {
      const intKey = Number(key);
      form.setFieldsValue({ [`offer[${intKey}].sale_price`]: value });
    }
  };

  const handleOnChangeProductCode = (value: any) => {
    for (const key in flattenCurrentVariantValues) {
      const intKey = Number(key);
      form.setFieldsValue({ [`offer[${intKey}].product_code`]: value });
    }
  };

  const handleDeleteTableVariant = (key: any) => {
    const newDeletedRowKeys = [...new Set(deletedRowKeys)];

    newDeletedRowKeys.push(key);
    setDeletedRowKeys(newDeletedRowKeys);
  };

  const handleResetDeletedRowKeys = (key: any) => {
    const newDeletedRowKeys = [...new Set(deletedRowKeys)];

    const index = newDeletedRowKeys.indexOf(key);
    if (index > -1) {
      newDeletedRowKeys.splice(index, 1);
    }

    setDeletedRowKeys(newDeletedRowKeys);
  };

  const columns: ColumnsType<IDataType> = [
    {
      title: "Variants",
      dataIndex: "variants",
      key: "variants",
      fixed: "left",
    },
    {
      title: (
        <Form.Item label="Inventory quantity" name="inventory_quantity">
          <InputNumber className="w-full" min={1} placeholder="Enter for all" onChange={handleOnChangeInventory} />
        </Form.Item>
      ),
      dataIndex: "inventory_quantity",
      key: "inventory_quantity",
      onCell: (record: IDataType) => ({
        colSpan: deletedRowKeys.includes(record.key) ? 4 : 1,
      }),
      render(_, record) {
        if (typeof record.key !== "undefined") {
          return (
            <div>
              {deletedRowKeys.includes(record.key) ? (
                <i>
                  <InfoCircleFilled className="text-yellow-500 mr-1" />
                  This variant has been deleted
                  <Button type="link" onClick={() => handleResetDeletedRowKeys(record.key)}>
                    Làm lại
                  </Button>
                </i>
              ) : (
                <Form.Item name={`offer[${record.key - 1}].quantity`}>
                  <InputNumber className="w-full" min={1} />
                </Form.Item>
              )}
            </div>
          );
        }
        return null;
      },
    },
    {
      title: (
        <Form.Item label="Selling price" name="selling_price" required={true}>
          <InputNumber
            formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            parser={(value: any) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
            addonAfter="đ"
            min={0}
            className="w-full"
            placeholder="Enter for all"
            onChange={handleOnChangeSellingPrice}
          />
        </Form.Item>
      ),
      dataIndex: "selling_price",
      key: "selling_price",
      onCell: sharedOnCell,
      render(_, record) {
        if (typeof record.key !== "undefined") {
          return (
            <Form.Item
              name={`offer[${record.key - 1}].selling_price`}
              dependencies={["selling_price"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue("selling_price") > 1000) {
                      return Promise.resolve();
                    } else if (value > 1000) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Price must be greater than 1000"));
                  },
                }),
              ]}
            >
              <InputNumber
                formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                parser={(value: any) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
                addonAfter="đ"
                className="w-full"
                min={1}
              />
            </Form.Item>
          );
        }
        return null;
      },
    },
    {
      title: (
        <Form.Item label="Sale price" name="sale_price">
          <InputNumber
            formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            parser={(value: any) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
            addonAfter="đ"
            min={0}
            className="w-full"
            placeholder="Enter for all"
            onChange={handleOnChangeSalePrice}
          />
        </Form.Item>
      ),
      dataIndex: "sale_price",
      key: "sale_price",
      onCell: sharedOnCell,
      render(_, record) {
        if (typeof record.key !== "undefined") {
          return (
            <Form.Item
              name={`offer[${record.key - 1}].sale_price`}
              dependencies={["sale_price"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (record && record.key !== undefined) {
                      const currentSellingPrice = getFieldValue(`offer[${record?.key - 1}].selling_price`);

                      if (value > 0) {
                        if (value > 1000) {
                          if (currentSellingPrice < value) {
                            return Promise.reject(new Error("Giá bán phải lớn hơn giá giảm"));
                          }

                          return Promise.resolve();
                        } else if (value === null) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Giá giảm phải lớn hơn 1000"));
                      }

                      return Promise.resolve();
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber
                formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                parser={(value: any) => value?.replace(/\$\s?|(\.*)/g, "").replace(/\./g, "")}
                addonAfter="đ"
                className="w-full"
                min={0}
              />
            </Form.Item>
          );
        }
        return null;
      },
    },
    {
      title: (
        <Form.Item label="Product code" name="product_code">
          <Input
            className="w-full"
            placeholder="Enter for all"
            type="text"
            onChange={(e: any) => handleOnChangeProductCode(e.target.value)}
          />
        </Form.Item>
      ),
      key: "product_code",
      dataIndex: "product_code",
      onCell: sharedOnCell,
      render(_, record) {
        if (typeof record.key !== "undefined") {
          return (
            <Form.Item name={`offer[${record.key - 1}].product_code`}>
              <Input className="w-full" min={1} type="text" />
            </Form.Item>
          );
        }
        return null;
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Button type="link" danger onClick={() => handleDeleteTableVariant(record.key)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return <AdminTable bordered columns={columns} dataSource={tableData} pagination={false} />;
};

export default ProductTableVariants;
