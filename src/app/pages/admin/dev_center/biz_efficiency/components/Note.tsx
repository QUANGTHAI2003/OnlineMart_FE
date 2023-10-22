import { Typography } from "antd";

const { Title } = Typography;

const Note = () => {
  return (
    <div className="m-4 bg-white p-6 rounded border-2 border-solid border-red-300">
      <Title level={3} className="flex justify-center">
        *** CHÚ THÍCH THIẾT KẾ DỮ LIỆU ***
      </Title>

      <div className="text-red-300 flex flex-col gap-4">
        {/* ReportTime */}
        <div>
          <Title level={4}>*** Tại component ReportTime ***</Title>
          <p>
            - Mặc định: rerender thì ô &quot;Hôm nay&quot; sẽ là giá trị mặc định và các giá trị khác cũng nhận theo giá
            trị mặc định này (RangePicker, Chỉ số chính, các box của SlickList, top 5 sản phẩm, top 5 thành phố)
          </p>
          <p>
            - Khi chọn một item bất kỳ (Hôm qua, 30 ngày qua,...hay ngày bắt đầu + ngày kết thúc trong RangePicker) thì:
          </p>
          <p>
            1. Tại &quot;Lần cập nhật cuối&quot; sẽ: Nhận giá trị thời gian ngay tại thời điểm chọn bất kỳ item nào và
            lưu nó vào local Storage
          </p>
          <p>
            2. Các thành phần khác (RangePicker, Chỉ số chính, các box của SlickList, top 5 sản phẩm, top 5 thành phố):
            sẽ nhận khoảng thời gian tương ứng với từng item thời gian được chọn
          </p>
        </div>

        {/* DateComparison */}
        <div>
          <Title level={4}>*** Tại component DateComparison ***</Title>
          <p>
            - Khi viết api ta sẽ gọi lại dữ liệu 2 lần và truyền giá trị vào BusinessReportData & ExportExcelData -
            BusinessReportData: đổ trường &quot;value&quot; ra giao diện SlickList
          </p>
          <p>
            - ExportExcelData: xuất dữ liệu ra file excel để giải quyết vấn đề &quot;dữ liệu chỉ đổ ra trên cùng 1
            cột&quot;
          </p>
        </div>

        {/* SlickList */}
        <div>
          <Title level={4}>*** Tại component SlickList ***</Title>
          <p>- Doanh số (doanh thu) = Số lượng đơn hàng (trong khoảng thời gian được chọn) x Đơn giá</p>

          <p>- Đơn hàng = Tổng số đơn hàng (trong khoảng thời gian được chọn, không bao gồm đơn hủy và hoàn tiền)</p>

          <p>
            - Doanh thu thuần = Tổng doanh thu (trong khoảng thời gian được chọn) - (Chiết khấu thương mại + Phí trả
            Tiki - OMart)
          </p>

          <p>- Lượt xem = Tổng lượt xem (trong khoảng thời gian được chọn)</p>

          <p>
            - Tỷ lệ chuyển đổi = Tổng số khách truy cập (khách đã có đơn hàng được xác nhận) / Tổng sô khách truy cập
            (trong khoảng thời gian được chọn)
          </p>

          <p>
            - Giá trị trung bình (AOV) = Tổng doanh thu (trong khoảng thời gian được chọn) / Số lượng đơn hàng (trong
            khoảng thời gian được chọn)
          </p>

          <p>- Đơn hàng hủy = Tổng những đơn hàng hủy (trong khoảng thời gian được chọn)</p>

          <p>
            - Tỷ lệ chênh lệch (phần dưới cùng của mỗi box - mũi tên và %) = ((value ngày kết thúc - value ngày bắt đầu)
            / value ngày bắt đầu) x 100
          </p>
        </div>

        {/* LineChart */}
        <div>
          <Title level={4}>*** Tại component LineChart ***</Title>
          <p>
            - Khi viết api tự xử lý lại logic của line chart này vì hiện tại chưa rõ dây chuyền hoạt động của dữ liệu
          </p>
        </div>
      </div>
    </div>
  );
};

export default Note;
