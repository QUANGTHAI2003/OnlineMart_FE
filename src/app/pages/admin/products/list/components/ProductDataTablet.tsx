import { Button, Card, Col, Divider, Pagination, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ProductTableDataName } from ".";

interface IProductDataTabletProps {
  data: any;
  showConfirm: (id: number) => void;
}

const ProductDataTablet: React.FC<IProductDataTabletProps> = ({ data, showConfirm }) => {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        {data.map((item: any) => {
          return (
            <Col key={item.id} xs={24} lg={12}>
              <Card
                hoverable
                actions={[
                  <Button
                    className="w-full border-none shadow-none text-red-500"
                    onClick={() => showConfirm(data.id)}
                    key="delete"
                  >
                    {t("admin_shop.product.list.table.delete")}
                  </Button>,
                  <Link to={`edit/${data.id}`} key="edit">
                    <Button type="primary" ghost className="w-full border-none">
                      {t("admin_shop.product.list.table.edit")}
                    </Button>
                  </Link>,
                ]}
              >
                <>
                  <ProductTableDataName data={item} trans={t} />
                  <Divider />
                  <Row className="flex-1">
                    <Col span={8}>
                      <Space direction="vertical">
                        <div className="secondary-description">{`${t("admin_shop.product.list.table.category")}:`}</div>
                        {item.category}
                      </Space>
                    </Col>
                    <Col span={8}>
                      <Space direction="vertical">
                        <div className="secondary-description">{`${t("admin_shop.product.list.table.brand")}:`}</div>
                        {item.brand}
                      </Space>
                    </Col>
                    <Col span={8}>
                      <Space direction="vertical">
                        <div className="secondary-description">
                          {`${t("admin_shop.product.list.table.updated_at")}:`}
                        </div>
                        {item.updated_at}
                      </Space>
                    </Col>
                  </Row>
                </>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Pagination className="text-right mt-4" defaultCurrent={5} total={100} />
    </>
  );
};

export default ProductDataTablet;
