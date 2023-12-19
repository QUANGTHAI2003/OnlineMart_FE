import { CaretDownOutlined } from "@ant-design/icons";
import logo from "@app/app/assets/images/OM_reverse.png";
import { useGetProductPrintQRQuery } from "@app/store/slices/api/admin/printQRApi";
import { baseImageKitUrl, formatCurrency } from "@app/utils/helper";
import {
  Divider,
  Dropdown,
  MenuProps,
  QRCode,
  Radio,
  RadioChangeEvent,
  Button,
  Col,
  Row,
  Space,
  Typography,
  theme,
} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import * as S from "../PrintQRCode.styles";

const { Title, Text } = Typography;
const { useToken } = theme;

const baseUrl = import.meta.env.VITE_BASE_URL as string;

const SettingUpQRPrint = () => {
  const { t } = useTranslation();
  const { token } = useToken();

  const [value, setValue] = useState<string>();
  const componentRef = useRef<any>();
  const [dataExport, setDataExport] = useState<string[][]>([]);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  const params = new URLSearchParams(location.search);
  const { data: productPrintQR } = useGetProductPrintQRQuery({
    productId: params.get("product_id"),
    variantValueId: params.get("variant_value_id"),
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
  });

  useEffect(() => {
    if (isPrinting) {
      handlePrint();
    }
  }, [handlePrint, isPrinting]);

  const onChangeRadio = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const getQRsExport = (done: any) => {
    const result = [];
    if (productPrintQR && productPrintQR?.length > 0) {
      result.push(["ID", "Image", "QR Code", "Name", "Quantity", "Price"]);
      productPrintQR?.map((item: any, index: any) => {
        const arr = [];
        arr[0] = index + 1;
        arr[1] = `${baseImageKitUrl}/${item.thumbnail_url}`;
        arr[2] = `${baseUrl}/${item.qr_link}`;
        arr[3] = item.name;
        arr[4] = formatCurrency(item.regular_price);
        result.push(arr);
      });

      setDataExport(result);
      done();
    }
  };

  const items: MenuProps["items"] = [
    {
      label: t("admin_shop.print_qrcode.setting.export_pdf"),
      key: "0",
      onClick: () => setIsPrinting(true),
    },
    {
      label: (
        <CSVLink data={dataExport} filename={`QR-List_${dayjs().format("DD-MM-YYYY_h-mm-ss-A")}`} asyncOnClick={true}>
          {t("admin_shop.print_qrcode.setting.export_excel")}
        </CSVLink>
      ),
      key: "1",
      onClick: getQRsExport,
    },
  ];

  return (
    <S.SettingUpQRPrint>
      <Row className="setting_row">
        <Col sm={24} md={14} lg={16} className="setting_left">
          <div>
            <Title level={5}>{t("admin_shop.print_qrcode.setting.setup_template")}</Title>
          </div>

          <div className="qrcode_item" ref={componentRef}>
            <div className="qrcode flex flex-gap flex-wrap justify-center">
              {(isPrinting ? productPrintQR : productPrintQR?.slice(0, 1))?.map((item: any) => {
                return (
                  <div key={item.id}>
                    <QRCode
                      errorLevel="H"
                      value={item?.qr_link || ""}
                      icon={logo}
                      iconSize={80}
                      size={250}
                      bgColor={token.colorBgLayout}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="note">
            <Title level={5}>{t("admin_shop.print_qrcode.setting.note")}</Title>
            <Paragraph>
              <ul>
                <li>
                  <Text italic>{t("admin_shop.print_qrcode.setting.note_text_1")}</Text>
                </li>
                <li>
                  <Text italic>{t("admin_shop.print_qrcode.setting.note_text_2")}</Text>
                </li>
              </ul>
            </Paragraph>
          </div>
        </Col>

        <Col sm={24} md={10} lg={8} className="setting_right">
          <Radio.Group onChange={onChangeRadio} value={value}>
            <Row>
              <Title level={5}>{t("admin_shop.print_qrcode.setting.size_type")}</Title>
            </Row>

            <Row className="tem_item">
              <Col span={14} className="flex flex-col">
                <Text strong className="text">
                  Khổ 2 tem
                </Text>
                <Space direction="vertical">
                  <Radio value={"72x22"}>Khổ 72 x 22 mm</Radio>
                  <Radio value={"74x22"}>Khổ 74 x 22 mm</Radio>
                </Space>
              </Col>
              <Col span={9} className="muibox">
                <img
                  src="https://sapo.dktcdn.net/sapo-frontend-v3/master/static/media/e5ffe5117aec4162aef2.png"
                  alt=""
                />
              </Col>
            </Row>

            <Divider />

            <Row className="tem_item">
              <Col span={14} className="flex flex-col">
                <Text strong>Khổ 3 tem</Text>
                <Space direction="vertical">
                  <Radio value={"110x22"}>110 x 22 mm</Radio>
                </Space>
              </Col>
              <Col span={9} className="muibox">
                <img
                  src="https://sapo.dktcdn.net/sapo-frontend-v3/master/static/media/90bc9c4af43d78365688.png"
                  alt=""
                />
              </Col>
            </Row>

            <Divider />

            <Row className="tem_item">
              <Col span={14} className="flex flex-col">
                <Text strong>Khổ giấy A4</Text>
                <Space direction="vertical">
                  <Radio value={"No.145-65"}>Tomy No.145 - 65 tem</Radio>
                  <Radio value={"No.146-180"}>Tomy No.146 - 180 tem</Radio>
                  <Radio value={"No.138-100"}>Tomy No.138 - 100 tem</Radio>
                </Space>
              </Col>
              <Col span={9} className="muibox">
                <img
                  src="https://sapo.dktcdn.net/sapo-frontend-v3/master/static/media/9d44752ba4c3cd34bb7c.png"
                  alt=""
                />
              </Col>
            </Row>

            <Divider />

            <Row className="tem_item">
              <Col span={14} className="flex flex-col">
                <Text strong>Khổ giấy A5</Text>
                <Space direction="vertical">
                  <Radio value={"No.108-40"}>Tomy No.108 - 40 tem</Radio>
                </Space>
              </Col>
              <Col span={9} className="muibox">
                <img
                  src="https://sapo.dktcdn.net/sapo-frontend-v3/master/static/media/93d4806d280d1b1b809e.png"
                  alt=""
                />
              </Col>
            </Row>
          </Radio.Group>
        </Col>
      </Row>

      <div className="footer_qr">
        <Link to="/admin/shop/products/inventory">
          <Button type="primary" ghost>
            {t("admin_shop.print_qrcode.setting.exit")}
          </Button>
        </Link>

        <Button type="primary" ghost>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Space>
              {t("admin_shop.print_qrcode.setting.export_pdf")}
              <CaretDownOutlined />
            </Space>
          </Dropdown>
        </Button>
      </div>
    </S.SettingUpQRPrint>
  );
};
export default SettingUpQRPrint;
