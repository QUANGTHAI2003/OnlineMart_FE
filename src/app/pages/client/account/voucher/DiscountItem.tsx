import { CopyIcon, DiscountItemFrame } from "@app/app/assets/icons";
import { formatVNCurrency } from "@app/utils/helper";
import { notificationController } from "@app/utils/notification";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";

interface ITicketItem {
  id: number;
  image: string;
  name: string;
  count: number;
  total: number;
  code: string;
  expiry: string;
}

const DiscountItem = ({ image, name, count, total, code, expiry }: ITicketItem) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  const [, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setIsCopied(true);
    notificationController.success({
      message: `Mã giảm giá đã được sao chép `,
    });
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="relative drop-shadow-md">
      <DiscountItemFrame />
      <div className="absolute top-7 left-8 w-16 ">
        <div className="flex flex-col items-center gap-1">
          <img className="w-16 h-16 rounded-md" src={image} alt={name} />
          <h4 className=" text-[13px] leading-5 font-normal">{name}</h4>
        </div>
      </div>
      <div className="absolute w-fit top-5 left-36 flex justify-between items-start gap-32 ">
        <div className="flex flex-col items-start gap-[2px] ">
          <p className="text-base font-semibold">
            {t("user.voucher.discount")}
            &nbsp;
            <span>{formatVNCurrency(count)}</span>
          </p>
          <p className="text-[13px] text-gray-500">
            {t("user.voucher.range")}
            &nbsp;
            <span>{formatVNCurrency(total)}</span>
          </p>
        </div>
        <div className="cursor-pointer">
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <button className="border-0 bg-transparent cursor-pointer">
              <CopyIcon />
            </button>
          </CopyToClipboard>
        </div>
      </div>
      <div className="absolute bottom-4 left-36">
        <p className=" text-[13px] text-gray-500">
          {t("user.voucher.expiry")}
          :&nbsp;
          <span>{expiry}</span>
        </p>
      </div>
    </div>
  );
};

export default DiscountItem;
