import { CopyIcon, IconCheck } from "@app/app/assets/icons";
import useCopyToClipboard from "@app/hooks/useCopyToClipboard";
import { formatVNCurrency } from "@app/utils/helper";
import { useTranslation } from "react-i18next";

import * as S from "./Discount.styles";

interface ITicketItem {
  id: number;
  icon_url: string;
  icon_name: string;
  discount_amount: number;
  min_amount: number;
  coupon_code: string;
  period: string;
}

const DiscountItem = ({ icon_url, icon_name, discount_amount, min_amount, coupon_code, period }: ITicketItem) => {
  const { t } = useTranslation();
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);

  return (
    <S.DiscountFrame className="relative drop-shadow-md">
      <S.DiscountTicket width="450" height="132" viewBox="0 0 450 132" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2299_10859)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M442.477 0C446.631 0 450 3.582 450 8V124C450 128.418 446.631 132 442.477 132H132.132C132.132 127.581 128.763 124 124.608 124C120.453 124 117.085 127.581 117.085 132H7.52351C3.36865 132 0 128.418 0 124V8C0 3.582 3.36865 0 7.52351 0H117.085C117.085 4.418 120.453 8 124.608 8C128.763 8 132.132 4.418 132.132 0H368.652H442.477Z"
            fill="#FFFFFF"
          />
          <path fillRule="evenodd" clipRule="evenodd" d="M124.608 11V125V11Z" fill="#FFFFFF" />
          <path d="M124.608 11V125" stroke="#EEEEEE" strokeLinecap="square" strokeDasharray="2 4" />
        </g>
        <defs>
          <clipPath id="clip0_2299_10859">
            <rect width="450" height="132" fill="white" />
          </clipPath>
        </defs>
      </S.DiscountTicket>
      <S.DiscountImage>
        <div className="flex flex-col items-center gap-1">
          <img className="w-16 h-16 rounded-md" src={icon_url} alt={icon_name} />
          <h4 className=" lg:text-[13px] md:text-xs leading-5 font-normal">{icon_name}</h4>
        </div>
      </S.DiscountImage>
      <S.DiscountName>
        <div className="flex flex-col items-start gap-[2px] ">
          <p className="lg:text-base md:text-sm font-semibold">
            {t("user.voucher.discount")}
            &nbsp;
            <span>{formatVNCurrency(discount_amount)}</span>
          </p>
          <p className="text-[13px] text-gray-500">
            {t("user.voucher.range")}
            <span>{formatVNCurrency(min_amount)}</span>
          </p>
        </div>
        <div className="cursor-pointer">
          <button
            className="border-0 bg-transparent cursor-pointer"
            disabled={hasCopiedText}
            onClick={() => copyToClipboard(coupon_code)}
          >
            {hasCopiedText ? <IconCheck /> : <CopyIcon />}
          </button>
        </div>
      </S.DiscountName>
      <S.DiscountPeriod>
        <p className=" text-[13px] text-gray-500">
          {t("user.voucher.expiry")}
          :&nbsp;
          <span>{period}</span>
        </p>
      </S.DiscountPeriod>
    </S.DiscountFrame>
  );
};

export default DiscountItem;
