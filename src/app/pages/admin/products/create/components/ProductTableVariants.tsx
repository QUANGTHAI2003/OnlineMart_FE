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
      const intKey = Number(key) + 1;
      form.setFieldsValue({ [`inventory_quantity-${intKey}`]: value });
    }
  };

  const handleOnChangeSellingPrice = (value: any) => {
    for (const key in flattenCurrentVariantValues) {
      const intKey = Number(key) + 1;
      form.setFieldsValue({ [`selling_price-${intKey}`]: value });
    }
  };

  const handleOnChangeProductCode = (value: any) => {
    for (const key in flattenCurrentVariantValues) {
      const intKey = Number(key) + 1;
      form.setFieldsValue({ [`product_code-${intKey}`]: value });
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
        colSpan: deletedRowKeys.includes(record.key) ? 3 : 1,
      }),
      render(_, record) {
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
              <Form.Item name={`inventory_quantity-${record.key}`}>
                <InputNumber className="w-full" min={1} />
              </Form.Item>
            )}
          </div>
        );
      },
    },
    {
      title: (
        <Form.Item label="Selling price" name="selling_price" required={true}>
          <InputNumber className="w-full" placeholder="Enter for all" onChange={handleOnChangeSellingPrice} />
        </Form.Item>
      ),
      dataIndex: "selling_price",
      key: "selling_price",
      onCell: sharedOnCell,
      render(_, record) {
        return (
          <Form.Item
            name={`selling_price-${record.key}`}
            dependencies={["selling_price"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("selling_price") > 0) {
                    return Promise.resolve();
                  } else if (value > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Price must be greater than 1000"));
                },
              }),
            ]}
          >
            <InputNumber className="w-full" min={1} />
          </Form.Item>
        );
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
        return (
          <Form.Item name={`product_code-${record.key}`}>
            <Input className="w-full" min={1} type="text" />
          </Form.Item>
        );
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
