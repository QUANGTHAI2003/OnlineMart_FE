import Description from "@app/app/components/clients/Description/Description";
import { getName } from "country-list";
import { useTranslation } from "react-i18next";

import * as S from "../ProductDetail.styles";

const ProductDetailInfo = ({ info, description, isFetching }: any) => {
  const { t } = useTranslation();

  const getTextFromCode = (code: string) => {
    switch (code) {
      case "origin":
        return "Xuất xứ";
      case "category":
        return "Danh mục";
      case "supplier":
        return "Nhà cung cấp";
      default:
        return "";
    }
  };

  return (
    <S.ProductDetailInfoStyle>
      <div className="left">
        <div className="group">
          <h2>{t("user.product_detail.detail_info")}</h2>
          <div className="content has-table">
            <table>
              <tbody>
                {info?.map((info: any) => {
                  if (info?.value !== null) {
                    return (
                      <tr key={info.code}>
                        <td>{getTextFromCode(info?.code)}</td>
                        <td>{info?.code == "origin" ? getName(info?.value) : info?.value}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Description description={description} isFetching={isFetching} />
      </div>
      <div className="right"></div>
    </S.ProductDetailInfoStyle>
  );
};

export default ProductDetailInfo;
