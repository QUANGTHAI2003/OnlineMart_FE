import UserRatingItem from "@app/app/pages/client/account/rating/UserRatingItem";
import { Button, Empty } from "antd";
import { useTranslation } from "react-i18next";

const UserRating = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();

  const data: any[] = [
    {
      id: 1,
      title: "Sách Tài Chính Cá Nhân Cho Người Việt Nam - Tặng Khóa học Online về Tài chính",
      rating_average: 4,
      comment:
        "Những bài viết về tài chính của anh Chánh được đăng trên nhiều báo: Kinh tế Sài Gòn, Đầu tư Chứng khoán, Nhịp cầu đầu tư, CafeF, CafeBiz, Bizlive, The Leader, TheBank, Chuyện thương trường.",
      thumbnail_url:
        "https://salt.tikicdn.com/cache/280x280/ts/product/90/49/97/ec88ab408c1997378344486c94dbac40.jpg.webp",
    },
    {
      id: 2,
      title: "Sách Tài Chính Cá Nhân Cho Người Việt Nam - Tặng Khóa học Online về Tài chính",
      rating_average: 4,
      comment:
        "Những bài viết về tài chính của anh Chánh được đăng trên nhiều báo: Kinh tế Sài Gòn, Đầu tư Chứng khoán, Nhịp cầu đầu tư, CafeF, CafeBiz, Bizlive, The Leader, TheBank, Chuyện thương trường.",
      thumbnail_url:
        "https://salt.tikicdn.com/cache/280x280/ts/product/90/49/97/ec88ab408c1997378344486c94dbac40.jpg.webp",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <p className="text-2xl font-normal">{t("user.rating_user_page.my_comment")}</p>
      </div>
      <div className="bg-white w-full p-6">
        {data.length ? (
          <div>
            {data.map((item) => (
              <UserRatingItem
                key={item.id}
                title={item.title}
                ratingAverage={item.rating_average}
                comment={item.comment}
                thumbnailUrl={item.thumbnail_url}
              />
            ))}
          </div>
        ) : (
          <Empty
            className="pt-8 pb-14"
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 100 }}
            description={<span>{t("user.rating_user_page.let's_comment")}</span>}
          >
            <Button type="primary">{t("user.rating_user_page.keep shopping")}</Button>
          </Empty>
        )}
      </div>
    </div>
  );
};

export default UserRating;
