import { formatCurrency } from "@app/utils/helper";

import * as S from "../OrderDetail.styles";

const ComponentDetailPrintPDF = ({ innerRef }: any) => {
  return (
    <S.OrderDetailExport ref={innerRef}>
      <div className="header font-sans">
        <div className="mx-20  flex justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">OnlimeMart</h3>
            <h4 className="text-xl font-semibold mb-2">Cần Thơ</h4>
            <p className="font-semibold text-xl">0837129785</p>
          </div>
          <div className="text-right text-xl">
            <p>
              Mã đơn hàng:
              <span className="font-semibold">QUANG THÁI</span>
            </p>
            <p>
              Ngày tạo:
              <span className="font-semibold">21-10-2021</span>
            </p>
          </div>
        </div>
      </div>
      <div className="pt-8 mx-5 font-sans">
        <h2 className="font-semibold text-2xl text-center">Đơn hàng</h2>
        <div className="flex items-center justify-between my-6">
          <p>
            Hóa đơn đến:
            <span className="font-semibold">ĐINH CHÍ NGUYỆN</span>
          </p>
          <p>
            Giao hàng đến:
            <span className="font-semibold">CẦN THƠ</span>
          </p>
          <div className="text-right">
            <p>
              Điện thoại:
              <span className="font-semibold">0837123934</span>
            </p>
            <p>
              Email:
              <span className="font-semibold">online@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mx-6">
        <table className="font-sans">
          <thead>
            <tr>
              <th className="p-5">STT</th>
              <th className="p-5">Mã sản phẩm</th>
              <th className="p-5">Tên sản phẩm</th>
              <th className="p-5">Đơn vị</th>
              <th className="p-5">Số lượng</th>
              <th className="p-5">Đơn giá</th>
              <th className="p-5">Chiếc khấu</th>
              <th className="p-5">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4">1</td>
              <td className="p-4">1</td>
              <td className="p-4">Sản phẩm tốt</td>
              <td className="p-4"></td>
              <td className="p-4">1</td>
              <td className="p-4">{formatCurrency(240000)}</td>
              <td className="p-4">0%</td>
              <td className="p-4">{formatCurrency(240000)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-2/4 float-right font-sans mx-6">
        <S.TotalPrice>
          <div>Tổng số lượng</div>
          <p>1</p>
        </S.TotalPrice>
        <S.TotalPrice>
          <div>Tổng tiền</div>
          <p>{formatCurrency(240000)}</p>
        </S.TotalPrice>
        <S.TotalPrice>
          <div>VAT</div>
          <p>{formatCurrency(240000)}</p>
        </S.TotalPrice>
        <S.TotalPrice>
          <div>Chiết khấu</div>
          <p>1</p>
        </S.TotalPrice>
        <S.TotalPrice>
          <div>Phí giao hàng</div>
          <p>{formatCurrency(240000)}</p>
        </S.TotalPrice>
        <div className="flex items-center justify-between">
          <div className="font-semibold">Khách phải trả</div>
          <p>{formatCurrency(240000)}</p>
        </div>
      </div>
    </S.OrderDetailExport>
  );
};

export default ComponentDetailPrintPDF;
