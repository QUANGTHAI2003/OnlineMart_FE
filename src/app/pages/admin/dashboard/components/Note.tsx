import { Typography } from "antd";

const { Title } = Typography;

const Note = () => {
  return (
    <div className="m-6 p-4 border-2 border-solid border-red-400 rounded-lg">
      <Title level={3} className="text-center">
        CHÚ THÍCH THIẾT KẾ DỮ LIỆU
      </Title>

      <div className="mt-4">
        <Title level={4}>SellerProfile component</Title>

        <div>
          <strong>- Biến completed:</strong>
          <p>+ Là biến tích điểm tương ứng với từng box đã hoàn thành điền thông tin.</p>
          <p>
            + Cứ mỗi box đã được điền thông tin thành công thì biến completed sẽ được cộng vào 1 điểm và box sẽ đc css
            đổi màu để đánh dấu là đã hoàn thành điền thông tin.
          </p>
          <p>
            + Mỗi điểm tương ứng với 20%, tích được đủ 100% thì SellerProfile component sẽ biến mất và được thay thế
            bằng component BusinessResults.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <Title level={4}>RecentActivities component</Title>

        <div>
          <p>Cần có một list liệt kê các hành động của admin, ví dụ: Thêm sản phẩm, Sửa danh mục,...</p>
        </div>
      </div>
    </div>
  );
};

export default Note;
