import { PlusOutlined } from "@ant-design/icons";
import { useGetReviewProductQuery, useReviewProductMutation } from "@app/store/slices/api/user/reviewApi";
import { useAppSelector } from "@app/store/store";
import { baseImageUrl, handleApiError, notifySuccess } from "@app/utils/helper";
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  InputRef,
  Rate,
  Select,
  Space,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import ImgCrop from "antd-img-crop";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "../ListOrder.style";

const { TextArea } = Input;
type FormValues = {
  review_product: string;
  product_id: number;
  user_id: number;
  rating: number;
  agree: string;
  images: any;
};

const ModalReviewProduct = ({ product_id, product_image, product_name, order_id }: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const user_id = useAppSelector((state) => state.userState.user)?.id;
  const [replyReview, { isLoading }] = useReviewProductMutation();
  const { data: reviewProductData, isFetching } = useGetReviewProductQuery({ user_id, product_id });
  const mappedMedia = reviewProductData?.media?.map((item: any) => item.review_media.media);
  const [rating, setRating] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [items, setItems] = useState(["Đẹp", "Hàng chuẩn"]);
  const [disagreeItem, setDisagreeItem] = useState(["Không đẹp", "Không giống ảnh"]);
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [disagreeValue, setDisagreeValue] = useState<string>("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  let index = 0;

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const addDisagree = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setDisagreeItem([...disagreeItem, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const handleSelectChange = (value: any) => {
    setSelectedValue(value);
  };
  const handleDisagreeChange = (value: any) => {
    setDisagreeValue(value);
  };

  const handleSubmit = async (data: FormValues) => {
    const content = data.review_product;
    try {
      const imagesArray = Object.values(fileList || []) as any[];

      const formData = new FormData();
      formData.append("content", content);
      formData.append("product_id", product_id as any);
      formData.append("user_id", user_id);
      formData.append("rating", rating as any);
      formData.append("agree", selectedValue);
      formData.append("disagree", disagreeValue);
      formData.append("shop_id", 1 as any);
      formData.append("order_id", order_id as any);
      if (imagesArray.length > 0) {
        imagesArray.forEach((image: any, index: number) => {
          formData.append(`images[${index}]`, image.originFileObj);
        });
      }
      await replyReview(formData).unwrap();
      form.resetFields();
      notifySuccess(t("user.orders.order_details.review_success"));
      setIsModalOpen(false);
      form.resetFields();
    } catch (err: any) {
      console.log(err);
      handleApiError(err);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const imageGroup =
    mappedMedia &&
    mappedMedia.map((image: any) => ({
      src: `${baseImageUrl}/${image}`,
      alt: "your image review",
    }));
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {reviewProductData ? (
        <>
          <Button type="default" onClick={handleOpenModal} className="border-blue-400 text-blue-400">
            Xem đánh giá
          </Button>
          <Spin spinning={isFetching}>
            <S.ModalReview
              open={isModalOpen}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  {t("user.orders.order_details.cancel")}
                </Button>,
              ]}
            >
              <div>
                <div className="pb-3">
                  <div className="title-review flex w-full">
                    <div className="review-image  w-[350px]">
                      <img
                        src={`${baseImageUrl}/${product_image}`}
                        className="w-full h-full object-cover"
                        alt={product_name}
                      />
                    </div>
                    <div className="review-text pl-4 h-full">
                      <p className="line-clamp-3 text-xl font-bold">{product_name}</p>
                      <div className="h-3/6 rate">
                        <Rate className="rating" allowHalf disabled defaultValue={reviewProductData?.rating} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] bg-gray-300"></div>
              </div>
              <div className="review-order pb-5">
                <div className="pb-4">
                  <TextArea rows={4} disabled defaultValue={reviewProductData?.content} />
                </div>
                <div className="agree w-full pb-3">
                  <Select
                    mode="multiple"
                    className="w-full"
                    disabled
                    placeholder={t("user.orders.order_details.agree")}
                    defaultValue={reviewProductData?.agree.split(",")}
                  />
                </div>
                <div className="disagree w-full pb-3">
                  <Select
                    mode="multiple"
                    className="w-full"
                    defaultValue={reviewProductData?.disagree.split(",")}
                    disabled
                  />
                </div>

                <div className="grid gap-x-8 gap-y-4 grid-cols-3 pt-3">
                  <Image.PreviewGroup>
                    {imageGroup &&
                      imageGroup.map((image: any, index: any) => (
                        <Image key={index} width={100} className="p-4" src={image.src} alt={image.alt} />
                      ))}
                  </Image.PreviewGroup>
                </div>
              </div>
            </S.ModalReview>
          </Spin>
        </>
      ) : (
        <div>
          <Button type="default" onClick={showModal} className="border-blue-400 text-blue-400">
            {t("user.orders.order_details.write_review")}
          </Button>
          <S.ModalReview
            open={isModalOpen}
            footer={[
              <Button key="back" onClick={handleCancel}>
                {t("user.orders.order_details.cancel")}
              </Button>,
              <Button key="submit" loading={isLoading} form="reviewFormId" type="primary" htmlType="submit">
                {t("user.orders.order_details.send_review")}
              </Button>,
            ]}
          >
            <div>
              <div className="py-3">
                <div className="title-review flex  w-full">
                  <div className="review-image  w-[350px]">
                    <img
                      src={`${baseImageUrl}/${product_image}`}
                      className="w-full h-full object-cover 3"
                      alt={product_name}
                    />
                  </div>
                  <div className="review-text pl-8 h-full">
                    <p className="line-clamp-3 text-xl font-bold">{product_name}</p>
                    <div className="h-3/6 rate">
                      <Rate className="rating" allowHalf value={rating} onChange={setRating} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[1px] bg-gray-300"></div>
            </div>

            <div className="review-order pb-5">
              <Form form={form} id="reviewFormId" autoComplete="off" onFinish={handleSubmit}>
                <Form.Item name="review_product">
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item className="agree">
                  <Select
                    mode="multiple"
                    placeholder={t("user.orders.order_details.agree")}
                    onChange={handleSelectChange}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Space style={{ padding: "0 8px 4px" }}>
                          <Input
                            placeholder={t("user.orders.order_details.your_review")}
                            ref={inputRef}
                            value={name}
                            name="agree"
                            onChange={onNameChange}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                            {t("user.orders.order_details.add_review")}
                          </Button>
                        </Space>
                      </>
                    )}
                    options={items.map((item) => ({ label: item, value: item }))}
                  />
                </Form.Item>
                <Form.Item className="disagree">
                  <Select
                    mode="multiple"
                    placeholder={t("user.orders.order_details.disagree")}
                    onChange={handleDisagreeChange}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Space style={{ padding: "0 8px 4px" }}>
                          <Input
                            placeholder={t("user.orders.order_details.your_review")}
                            ref={inputRef}
                            value={name}
                            name="agree"
                            onChange={onNameChange}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <Button type="text" icon={<PlusOutlined />} onClick={addDisagree}>
                            {t("user.orders.order_details.add_review")}
                          </Button>
                        </Space>
                      </>
                    )}
                    options={disagreeItem.map((item) => ({ label: item, value: item }))}
                  />
                </Form.Item>
                <Form.Item name="upload" valuePropName="fileList">
                  <ImgCrop>
                    <Upload listType="picture-card" fileList={fileList} onChange={onChange}>
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </Form.Item>
              </Form>
            </div>
          </S.ModalReview>
        </div>
      )}
    </>
  );
};
export default ModalReviewProduct;
