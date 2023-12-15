import { formatCurrency, formatDateTime } from "@app/utils/helper";
import { Button, Card, Col, Divider, Pagination, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ProductTableDataName } from ".";

interface IProductDataTabletProps {
  data: any;
  showConfirm: (id: number, name: string) => void;
}

const ProductDataTablet: React.FC<IProductDataTabletProps> = ({ data, showConfirm }) => {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        {data?.map((item: any) => {
          return (
            <Col key={item?.id} xs={24} lg={12}>
              <Card
                hoverable
                actions={[
                  <Button
                    className="w-full border-none shadow-none text-red-500"
                    onClick={() => showConfirm(data?.id, item?.name)}
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
                    <Col span={12}>
                      <Space direction="vertical">
                        <div className="secondary-description">Giá</div>
                        {typeof item?.price === "number" ? (
                          <span>{formatCurrency(item?.price)}</span>
                        ) : (
                          (() => {
                            const priceRange = item?.price.split("-");
                            const minPrice = parseInt(priceRange[0]);
                            const maxPrice = parseInt(priceRange[1]);

                            if (minPrice === maxPrice) {
                              return <span>{formatCurrency(minPrice)}</span>;
                            }

                            return <span>{`${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`}</span>;
                          })()
                        )}
                      </Space>
                    </Col>
                    <Col span={12}>
                      <Space direction="vertical">
                        <div className="secondary-description">Tồn kho</div>
                        {item?.stock}
                      </Space>
                    </Col>
                  </Row>
                  <Divider />
                  <Row className="flex-1">
                    <Col span={8}>
                      <Space direction="vertical">
                        <div className="secondary-description">{`${t("admin_shop.product.list.table.category")}:`}</div>
                        {item?.category}
                      </Space>
                    </Col>
                    <Col span={8}>
                      <Space direction="vertical">
                        <div className="secondary-description">{`${t("admin_shop.product.list.table.brand")}:`}</div>
                        {item?.brand}
                      </Space>
                    </Col>
                    <Col span={8}>
                      <Space direction="vertical">
                        <div className="secondary-description">
                          {`${t("admin_shop.product.list.table.updated_at")}:`}
                        </div>
                        {formatDateTime(item?.updated_at)}
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
