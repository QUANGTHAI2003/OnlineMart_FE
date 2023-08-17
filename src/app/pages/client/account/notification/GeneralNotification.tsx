/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent */
import Mascot from "@app/app/assets/images/mascot.png";
import imgItem from "@app/app/assets/images/nofitication/nofiticationItem.png";
import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
const data: any[] = [
    // {
    //     id: 1,
    //     title: "Đồ Chơi - Mẹ & Bé",
    //     img: imgItem,
    //     date: '17/8/2023',
    // },
];
const GeneralNotification = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const { t } = useTranslation();
    return (
        <div className="my-4 w-full p-4 text-center text-[14px] rounded-md bg-white">
            {data.length > 0 ? (
                <div>
                    {data.map((item) => {
                        return (
                            <Row className="text-start py-2 my-4" key={item.id}>
                                <Col span={3} className="px-4">
                                    <span>{item.date}</span>
                                </Col>
                                <Col span={3} className="px-4">
                                    <img src={item.img} alt="IMG" width={28} className="object-cover bg-[#DC3A85] rounded-full" />
                                </Col>
                                <Col span={12} className="px-4">
                                    <span>
                                        {item.title}
                                        {/* <a href="/#" className="text-[##1677ff]">
                                            {t("user.account_user.account_notification_page.detail")}
                                        </a> */}
                                    </span>
                                </Col>
                                <Col span={4} className="px-4">
                                    <Button type="link">{t("user.account_user.account_notification_page.read_an")}</Button>
                                </Col>
                                <Col span={2}>
                                    <Button danger type="text">
                                        {t("user.account_user.account_notification_page.remove_an")}
                                    </Button>
                                </Col>
                            </Row>
                        );
                    })}
                </div>
            ) : (
                <div>
                    <img src={Mascot} alt="IMG" width={160} className="object-cover" />
                    <p className="my-5">{t("user.account_user.account_notification_page.no_notification")}</p>
                    <a
                        href="#/"
                        className="bg-[#fdd835] py-[5px] px-[20px] text-[14px] text-lg text-[#4a4a4a] rounded-md inline-block mx-auto"
                    >
                        {t("user.account_user.account_notification_page.no_product")}
                    </a>
                </div>
            )}
        </div>
    );
};

export default GeneralNotification;
