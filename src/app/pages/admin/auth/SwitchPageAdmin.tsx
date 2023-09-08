import * as S from "./SignupAdmin.styles";

const SwitchPageAdmin = () => {
  return (
    <div className="m-w-[1440px] bg-[#E6F7FF] px-5 pt-5">
      <div className="mx-auto px-5 h-screen flex">
        <S.BackgroundUrl />
        <S.FrameSelect>
          <h2 className="text-3xl leading-9 mb-8 text-gray-900 font-bold mt-6">
            Điểm đến kinh doanh
            <br />
            cho mọi
            <span className="text-[#1890ff]"> doanh nghiệp</span>
          </h2>
          <div className="w-72">
            <a href="signin">
              <S.Button1>Đăng nhập</S.Button1>
            </a>
          </div>
          <div className="w-72">
            <a href="signup">
              <S.Button2>Đăng ký bán hàng trên Tiki</S.Button2>
            </a>
          </div>
        </S.FrameSelect>
      </div>
    </div>
  );
};

export default SwitchPageAdmin;
