import Description from "@app/app/components/clients/Description/Description";
import { useTranslation } from "react-i18next";

import * as S from "../ProductDetail.styles";

const ProductDetailInfo = ({ description }: any) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  return (
    <S.ProductDetailInfoStyle>
      <div className="left">
        <div className="group">
          <h2>{t("user.product_detail.detail_info")}</h2>
          <div className="content has-table">
            <table>
              <tbody>
                <tr>
                  <td>Thương hiệu</td>
                  <td>Biti&apos;s</td>
                </tr>
                <tr>
                  <td>Xuất xứ thương hiệu</td>
                  <td>Việt Nam</td>
                </tr>
                <tr>
                  <td>Chất liệu</td>
                  <td>
                    <p>Eva, cao su</p>
                  </td>
                </tr>
                <tr>
                  <td>Hàng chính hãng</td>
                  <td>Có</td>
                </tr>
                <tr>
                  <td>Xuất xứ</td>
                  <td>Việt Nam</td>
                </tr>
                <tr>
                  <td>Sản phẩm có được bảo hành không?</td>
                  <td>Có</td>
                </tr>
                <tr>
                  <td>Thời gian bảo hành</td>
                  <td>3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Description description={description} />
      </div>
      <div className="right"></div>
    </S.ProductDetailInfoStyle>
  );
};

export default ProductDetailInfo;
