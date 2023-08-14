import { useTranslation } from "react-i18next";

const UserFooter = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();
  return (
    <footer className="bg-white font-normal mt-[16px] leading-[16px] text-[12px] text-[#808089]">
      <div className="py-[16px]">
        <div className="mx-auto px-4">
          <div className="flex justify-between gap-6">
            <div className="flex flex-col items-center">
              <div className="flex flex-col">
                <h4 className="text-[16px] leading-[24px] font-[500] mt-0 mb-[12px] text-[#38383d]">
                  {t("user.footer.footer_support.title")}
                </h4>
                <p className="mb-[8px]">
                  {t("user.footer.footer_support.hotline")}
                  <a href="tel:1900-6035" className="font-[500] text-[#38383d]">
                    : 1900-6035
                  </a>
                  <span className="block">{t("user.footer.footer_support.time")}</span>
                </p>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_support.question")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_support.submit")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_support.ordering")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_support.shipping")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_support.return_policy")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_support.installment")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_support.import")}
                </a>
                <a href="mailto:hotro@om.vn" className="mb-[8px] block text-[#808089]">
                  {t("user.footer.footer_support.customer")}
                  <span className="hover:underline hover:decoration-solid">hotro@om.vn</span>
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089]">
                  {t("user.footer.footer_support.security")}
                  <span className="hover:underline hover:decoration-solid">security@om.vn</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col">
                <h4 className="text-[16px] leading-[24px] font-[500] mt-0 mb-[12px] text-[#38383d]">
                  {t("user.footer.footer_om.title")}
                </h4>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.om")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.blog")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.recruit")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.payment")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.privacy")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.complaint")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.terms")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.xu")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.vip")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.affiliate")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.corporate")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_om.conditions")}
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col">
                <h4 className="text-[16px] leading-[24px] font-[500] mt-0 mb-[12px] text-[#38383d]">
                  {t("user.footer.footer_cooperation.title")}
                </h4>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_cooperation.operation")}
                </a>
                <a href="#/" className="mb-[8px] block text-[#808089] hover:underline hover:decoration-solid">
                  {t("user.footer.footer_cooperation.sell")}
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col">
                <h4 className="text-[16px] leading-[24px] font-[500] mt-0 mb-[12px] text-[#38383d]">
                  {t("user.footer.footer_payment.title")}
                </h4>
                <div>
                  <span className="inline-block mr-[8px] mb-[8px] w-[32px] h-[32px] align-middle">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0_1329:61134" maskUnits="userSpaceOnUse" x="0" y="6" width="32" height="20">
                        <rect y="6" width="32" height="20" rx="1.81818" fill="white"></rect>
                      </mask>
                      <g mask="url(#mask0_1329:61134)">
                        <rect opacity="0.01" x="-1" y="4" width="34.04" height="23" fill="white"></rect>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.8116 10.6916L7.26655 17.2114L6.23703 11.6676C6.11637 11.0489 5.63944 10.6916 5.10955 10.6916H0.949103L0.891235 10.9696C1.74526 11.1578 2.7154 11.4606 3.30354 11.7849C3.66323 11.9827 3.76572 12.156 3.88411 12.6263L5.83384 20.2704H8.41786L12.3794 10.6916H9.8116ZM13.4285 10.6916L11.4062 20.2704H13.8514L15.8726 10.6916H13.4285ZM27.4466 13.2791L28.1868 16.8763H26.1588L27.4466 13.2791ZM27.0873 10.6916C26.6187 10.6916 26.2234 10.9688 26.0472 11.3943L22.3792 20.2704H24.945L25.4556 18.8405H28.5911L28.8876 20.2704H31.149L29.1754 10.6916H27.0873ZM16.5398 13.6828C16.5224 15.062 17.7528 15.8321 18.6794 16.2895C19.6318 16.7594 19.9514 17.0603 19.948 17.4805C19.9408 18.1229 19.1881 18.4066 18.4842 18.4177C17.2558 18.4373 16.5417 18.0815 15.9736 17.8128L15.5311 19.9112C16.1007 20.1776 17.1555 20.4095 18.2497 20.4199C20.8175 20.4199 22.4972 19.1353 22.5063 17.1431C22.5165 14.6154 19.0565 14.4755 19.0799 13.3455C19.0883 13.0031 19.4109 12.6374 20.1178 12.5447C20.4676 12.4975 21.4332 12.4615 22.5282 12.9725L22.9579 10.9423C22.3693 10.725 21.6125 10.5168 20.67 10.5168C18.2531 10.5168 16.5534 11.8186 16.5398 13.6828Z"
                          fill="#1A1F71"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <span className="inline-block mr-[8px] mb-[8px] w-[32px] h-[32px] align-middle">
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect opacity="0.01" x="1" y="6.6665" width="30" height="20" fill="white"></rect>
                      <rect x="12.3877" y="10.1254" width="7.17949" height="12.9247" fill="#FF5F00"></rect>
                      <path
                        d="M12.8434 16.5889C12.8407 14.0664 13.9964 11.6828 15.9773 10.1254C12.6131 7.47702 7.78209 7.86278 4.87927 11.0116C1.97644 14.1604 1.97644 19.0151 4.87927 22.1639C7.78209 25.3127 12.6131 25.6985 15.9773 23.0501C13.997 21.4931 12.8414 19.1106 12.8434 16.5889Z"
                        fill="#EB001B"
                      ></path>
                      <path
                        d="M29.2539 16.5889C29.2538 19.7358 27.46 22.6064 24.6343 23.9815C21.8087 25.3567 18.4472 24.995 15.9775 23.0501C17.9569 21.4918 19.1126 19.1096 19.1126 16.5877C19.1126 14.0659 17.9569 11.6837 15.9775 10.1254C18.4472 8.18045 21.8087 7.81875 24.6343 9.19392C27.46 10.5691 29.2538 13.4397 29.2539 16.5866V16.5889Z"
                        fill="#F79E1B"
                      ></path>
                    </svg>
                  </span>
                  <span className="inline-block mr-[8px] mb-[8px] w-[32px] h-[32px] align-middle">
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect opacity="0.01" y="5.6665" width="32" height="21.3333" fill="white"></rect>
                      <path
                        d="M29.5619 22.6087C29.5619 24.9501 27.6552 26.8567 25.3138 26.8567H2.2002V10.0317C2.2002 7.6902 4.10682 5.78358 6.44828 5.78358H29.5619V22.6087Z"
                        fill="white"
                      ></path>
                      <path
                        d="M22.0356 18.2937H23.7917C23.8419 18.2937 23.959 18.277 24.0092 18.277C24.3437 18.2101 24.628 17.909 24.628 17.4909C24.628 17.0895 24.3437 16.7885 24.0092 16.7048C23.959 16.6881 23.8586 16.6881 23.7917 16.6881H22.0356V18.2937Z"
                        fill="url(#paint0_linear)"
                      ></path>
                      <path
                        d="M23.5909 7.20518C21.9184 7.20518 20.547 8.55988 20.547 10.2491V13.4101H24.8453C24.9456 13.4101 25.0627 13.4101 25.1463 13.4268C26.1163 13.477 26.8355 13.9787 26.8355 14.8484C26.8355 15.5341 26.3505 16.1195 25.4473 16.2365V16.27C26.4341 16.3369 27.1867 16.8888 27.1867 17.7418C27.1867 18.6616 26.3505 19.2637 25.2467 19.2637H20.5303V25.4519H24.9958C26.6683 25.4519 28.0397 24.0972 28.0397 22.408V7.20518H23.5909Z"
                        fill="url(#paint1_linear)"
                      ></path>
                      <path
                        d="M24.4106 15.0491C24.4106 14.6477 24.1262 14.3801 23.7917 14.3299C23.7583 14.3299 23.6747 14.3132 23.6245 14.3132H22.0356V15.785H23.6245C23.6747 15.785 23.775 15.785 23.7917 15.7682C24.1262 15.7181 24.4106 15.4505 24.4106 15.0491Z"
                        fill="url(#paint2_linear)"
                      ></path>
                      <path
                        d="M6.76619 7.20518C5.09372 7.20518 3.72229 8.55988 3.72229 10.2491V17.7585C4.57525 18.1766 5.46166 18.4442 6.34808 18.4442C7.40173 18.4442 7.97038 17.8087 7.97038 16.939V13.3933H10.5794V16.9223C10.5794 18.2937 9.72647 19.4142 6.83309 19.4142C5.077 19.4142 3.70557 19.0296 3.70557 19.0296V25.4351H8.17107C9.84355 25.4351 11.215 24.0804 11.215 22.3912V7.20518H6.76619Z"
                        fill="url(#paint3_linear)"
                      ></path>
                      <path
                        d="M15.1787 7.20518C13.5062 7.20518 12.1348 8.55988 12.1348 10.2491V14.2296C12.9041 13.5773 14.2421 13.1592 16.3996 13.2595C17.5536 13.3097 18.7912 13.6275 18.7912 13.6275V14.9153C18.1724 14.5975 17.4365 14.3132 16.4832 14.2463C14.8442 14.1292 13.8574 14.932 13.8574 16.3369C13.8574 17.7585 14.8442 18.5613 16.4832 18.4275C17.4365 18.3606 18.1724 18.0595 18.7912 17.7585V19.0463C18.7912 19.0463 17.5703 19.3641 16.3996 19.4142C14.2421 19.5146 12.9041 19.0965 12.1348 18.4442V25.4686H16.6003C18.2727 25.4686 19.6442 24.1139 19.6442 22.4247V7.20518H15.1787Z"
                        fill="url(#paint4_linear)"
                      ></path>
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="20.5439"
                          y1="19.8203"
                          x2="28.0604"
                          y2="19.8203"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#007940"></stop>
                          <stop offset="0.2285" stopColor="#00873F"></stop>
                          <stop offset="0.7433" stopColor="#40A737"></stop>
                          <stop offset="1" stopColor="#5CB531"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear"
                          x1="20.544"
                          y1="25.4526"
                          x2="28.0602"
                          y2="25.4526"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#007940"></stop>
                          <stop offset="0.2285" stopColor="#00873F"></stop>
                          <stop offset="0.7433" stopColor="#40A737"></stop>
                          <stop offset="1" stopColor="#5CB531"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear"
                          x1="20.5438"
                          y1="17.3754"
                          x2="28.0598"
                          y2="17.3754"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#007940"></stop>
                          <stop offset="0.2285" stopColor="#00873F"></stop>
                          <stop offset="0.7433" stopColor="#40A737"></stop>
                          <stop offset="1" stopColor="#5CB531"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear"
                          x1="3.71849"
                          y1="25.5849"
                          x2="11.3507"
                          y2="25.5849"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#1F286F"></stop>
                          <stop offset="0.4751" stopColor="#004E94"></stop>
                          <stop offset="0.8261" stopColor="#0066B1"></stop>
                          <stop offset="1" stopColor="#006FBC"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear"
                          x1="12.0913"
                          y1="25.3346"
                          x2="19.5036"
                          y2="25.3346"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#6C2C2F"></stop>
                          <stop offset="0.1735" stopColor="#882730"></stop>
                          <stop offset="0.5731" stopColor="#BE1833"></stop>
                          <stop offset="0.8585" stopColor="#DC0436"></stop>
                          <stop offset="1" stopColor="#E60039"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className="inline-block mr-[8px] mb-[8px] w-[32px] h-[32px] align-middle">
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M30 10.3615C30 8.8731 28.7934 7.6665 27.305 7.6665H4.695C3.20659 7.6665 2 8.8731 2 10.3615V22.9715C2 24.4599 3.20659 25.6665 4.695 25.6665H27.305C28.7934 25.6665 30 24.4599 30 22.9715V10.3615ZM4.695 8.6665H27.305L27.4513 8.67273C28.3189 8.74688 29 9.47465 29 10.3615V22.9715L28.9938 23.1178C28.9196 23.9854 28.1919 24.6665 27.305 24.6665H4.695L4.54875 24.6603C3.6811 24.5861 3 23.8584 3 22.9715V10.3615L3.00622 10.2153C3.08037 9.3476 3.80815 8.6665 4.695 8.6665Z"
                        fill="#052E5C"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.67528 20.2746L8.14557 21.881H7L9.205 15.6665H10.4582L12.6632 21.881H11.4918L10.9621 20.2746H8.67528ZM8.93368 19.4176H10.6994L9.83377 16.7647H9.80362L8.93368 19.4176ZM15.9535 21.881V16.6054H17.8097V15.6665H12.9862V16.6054H14.8467V21.881H15.9535ZM19.5711 17.471V21.881H18.5676V15.6665H19.8553L21.7589 20.4081H21.7933L23.6968 15.6665H24.9802V21.881H23.9811V17.471H23.9509L22.1551 21.881H21.3971L19.6012 17.471H19.5711Z"
                        fill="#052E5C"
                      ></path>
                      <rect x="22" y="10.6665" width="5" height="3" rx="1" fill="#0B74E5"></rect>
                    </svg>
                  </span>
                  <span className="inline-block mr-[8px] mb-[8px] w-[32px] h-[32px] align-middle">
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="mask0" maskUnits="userSpaceOnUse" x="3" y="3" width="26" height="27">
                        <path
                          d="M10.6917 3.6665L21.3083 3.6665C23.9829 3.6665 24.9528 3.94498 25.9305 4.4679C26.9083 4.99082 27.6757 5.75819 28.1986 6.73597C28.7215 7.71374 29 8.6836 29 11.3582V21.9748C29 24.6494 28.7215 25.6193 28.1986 26.597C27.6757 27.5748 26.9083 28.3422 25.9305 28.8651C24.9528 29.388 23.9829 29.6665 21.3083 29.6665H10.6917C8.0171 29.6665 7.04724 29.388 6.06946 28.8651C5.09169 28.3422 4.32432 27.5748 3.8014 26.597C3.27848 25.6193 3 24.6494 3 21.9748L3 11.3582C3 8.6836 3.27848 7.71374 3.8014 6.73597C4.32432 5.75819 5.09169 4.99082 6.06946 4.4679C7.04724 3.94498 8.0171 3.6665 10.6917 3.6665Z"
                          fill="white"
                        ></path>
                      </mask>
                      <g mask="url(#mask0)">
                        <path
                          d="M10.6917 3.6665L21.3083 3.6665C23.9829 3.6665 24.9528 3.94498 25.9305 4.4679C26.9083 4.99082 27.6757 5.75819 28.1986 6.73597C28.7215 7.71374 29 8.6836 29 11.3582V21.9748C29 24.6494 28.7215 25.6193 28.1986 26.597C27.6757 27.5748 26.9083 28.3422 25.9305 28.8651C24.9528 29.388 23.9829 29.6665 21.3083 29.6665H10.6917C8.0171 29.6665 7.04724 29.388 6.06946 28.8651C5.09169 28.3422 4.32432 27.5748 3.8014 26.597C3.27848 25.6193 3 24.6494 3 21.9748L3 11.3582C3 8.6836 3.27848 7.71374 3.8014 6.73597C4.32432 5.75819 5.09169 4.99082 6.06946 4.4679C7.04724 3.94498 8.0171 3.6665 10.6917 3.6665Z"
                          fill="#A50064"
                        ></path>
                        <path
                          d="M21.1624 8.6665C19.0427 8.6665 17.3247 10.2823 17.3247 12.2755C17.3247 14.269 19.0427 15.8849 21.1624 15.8849C23.2819 15.8849 25 14.269 25 12.2755C25 10.2823 23.2819 8.6665 21.1624 8.6665ZM21.1624 13.8159C20.2632 13.8159 19.5325 13.1289 19.5325 12.2833C19.5325 11.4376 20.2632 10.7505 21.1624 10.7505C22.0615 10.7505 22.7922 11.4376 22.7922 12.2833C22.7922 13.1289 22.0615 13.8161 21.1624 13.8161V13.8159ZM16.2168 15.8927H14.0089V11.3546C14.0089 11.0148 13.7198 10.7433 13.3587 10.7433C12.9974 10.7433 12.7083 11.0148 12.7083 11.3546V15.8927H10.5006V11.3546C10.5006 11.0148 10.2117 10.7433 9.85038 10.7433C9.48906 10.7433 9.19994 11.0148 9.19994 11.3546V15.8927H7V11.3772C7 9.8822 8.29262 8.6665 9.88225 8.6665C10.5325 8.6665 11.1267 8.87041 11.6084 9.21008C12.1645 8.84769 12.7399 8.6665 13.3345 8.6665C14.9241 8.6665 16.2168 9.8822 16.2168 11.3772V15.8927ZM21.1624 17.4481C19.0427 17.4481 17.3247 19.0638 17.3247 21.0571C17.3247 23.0506 19.0427 24.6665 21.1624 24.6665C23.2819 24.6663 25 23.0504 25 21.0571C25 19.0638 23.2819 17.4479 21.1624 17.4479V17.4481ZM13.3345 17.4397C14.9241 17.4397 16.2168 18.6554 16.2168 20.1504V24.6659H14.0089V20.1279C14.0089 19.788 13.7198 19.5165 13.3587 19.5165C12.9974 19.5165 12.7083 19.788 12.7083 20.1279V24.6659H10.5006V20.1279C10.5006 19.788 10.2117 19.5165 9.85038 19.5165C9.48906 19.5165 9.19994 19.788 9.19994 20.1279V24.6659H7V20.1504C7 18.6554 8.29262 17.4397 9.88225 17.4397C10.5325 17.4397 11.1267 17.6437 11.6084 17.9833C12.1645 17.6209 12.7399 17.4397 13.3345 17.4397ZM21.1624 19.532C22.0615 19.532 22.7922 20.2191 22.7922 21.0649C22.7922 21.9104 22.0615 22.5975 21.1624 22.5975C20.2632 22.5975 19.5325 21.9104 19.5325 21.0649C19.5325 20.2191 20.2632 19.532 21.1624 19.532Z"
                          fill="white"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <span className="inline-block mr-[8px] mb-[8px] w-[32px] h-[32px] align-middle">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                        fill="#EE0033"
                      ></path>
                      <path
                        d="M14.2558 5.97546H12.0931C11.545 5.97546 11.0193 6.19319 10.6318 6.58075C10.2442 6.96831 10.0265 7.49395 10.0265 8.04205V23.9619C10.0265 24.2333 10.0799 24.502 10.1838 24.7528C10.2877 25.0035 10.4399 25.2313 10.6318 25.4232C10.8237 25.6151 11.0515 25.7674 11.3022 25.8712C11.553 25.9751 11.8217 26.0285 12.0931 26.0285H14.2558C14.3236 26.0285 14.3908 26.0152 14.4535 25.9892C14.5162 25.9632 14.5731 25.9252 14.6211 25.8772C14.6691 25.8292 14.7071 25.7723 14.7331 25.7096C14.7591 25.6469 14.7724 25.5797 14.7724 25.5119V23.9659C14.7724 23.8289 14.718 23.6975 14.6211 23.6006C14.5242 23.5037 14.3928 23.4493 14.2558 23.4493H10.8986V8.55168H14.2558C14.3926 8.55062 14.5235 8.49531 14.6196 8.39789C14.7157 8.30046 14.7692 8.16888 14.7684 8.03203V6.49211C14.7684 6.35578 14.7145 6.22497 14.6185 6.12819C14.5225 6.03142 14.3921 5.97652 14.2558 5.97546Z"
                        fill="white"
                      ></path>
                      <path
                        d="M19.9069 5.97547H17.7442C17.6073 5.97573 17.4762 6.03028 17.3795 6.12714C17.2828 6.224 17.2285 6.35526 17.2285 6.49211V8.03204C17.2285 8.16889 17.2828 8.30015 17.3795 8.39701C17.4762 8.49387 17.6073 8.54842 17.7442 8.54869H21.1024V23.4513H17.7442C17.6073 23.4516 17.4762 23.5061 17.3795 23.603C17.2828 23.6999 17.2285 23.8311 17.2285 23.968V25.5109C17.2285 25.6477 17.2828 25.779 17.3795 25.8759C17.4762 25.9727 17.6073 26.0273 17.7442 26.0275H19.9069C20.1788 26.0281 20.4481 25.9749 20.6994 25.8712C20.9507 25.7674 21.1791 25.6151 21.3715 25.423C21.5638 25.2308 21.7163 25.0026 21.8203 24.7513C21.9243 24.5001 21.9777 24.2308 21.9775 23.959V8.04205C21.9775 7.77033 21.9239 7.50127 21.8198 7.25028C21.7157 6.99929 21.5631 6.77129 21.3707 6.57934C21.1784 6.38739 20.9501 6.23525 20.6989 6.13163C20.4477 6.02801 20.1786 5.97494 19.9069 5.97547V5.97547Z"
                        fill="white"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col">
                <h4 className="text-[16px] leading-[24px] font-[500] mt-0 mb-[12px] text-[#38383d]">
                  {t("user.footer.footer_connect.title")}
                </h4>
                <div>
                  <a
                    rel="nofollow noreferrer"
                    className="inline-block mr-4 mb-4 w-[32px] h-[32px] align-middle"
                    href="#/"
                    target="_blank"
                    title="Facebook"
                  >
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0 16.6665C0 7.82995 7.16344 0.666504 16 0.666504C24.8366 0.666504 32 7.82995 32 16.6665C32 25.5031 24.8366 32.6665 16 32.6665C7.16344 32.6665 0 25.5031 0 16.6665Z"
                        fill="#3B5998"
                      ></path>
                      <path
                        d="M17.6676 26.0742V17.3693H20.0706L20.389 14.3696H17.6676L17.6717 12.8682C17.6717 12.0858 17.7461 11.6666 18.8698 11.6666H20.372V8.6665H17.9687C15.082 8.6665 14.066 10.1217 14.066 12.5689V14.3699H12.2666V17.3696H14.066V26.0742H17.6676Z"
                        fill="white"
                      ></path>
                    </svg>
                  </a>
                  <a
                    rel="nofollow noreferrer"
                    href="#/"
                    className="inline-block mr-4 mb-4 w-[32px] h-[32px] align-middle"
                    target="_blank"
                    title="Youtube"
                  >
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0 16.6665C0 7.82995 7.16344 0.666504 16 0.666504C24.8366 0.666504 32 7.82995 32 16.6665C32 25.5031 24.8366 32.6665 16 32.6665C7.16344 32.6665 0 25.5031 0 16.6665Z"
                        fill="#FF0000"
                      ></path>
                      <path
                        d="M24.1768 12.7153C23.9805 11.9613 23.4022 11.3675 22.6679 11.166C21.3371 10.7998 16.0001 10.7998 16.0001 10.7998C16.0001 10.7998 10.6632 10.7998 9.3323 11.166C8.59795 11.3675 8.01962 11.9613 7.82335 12.7153C7.4668 14.0818 7.4668 16.9331 7.4668 16.9331C7.4668 16.9331 7.4668 19.7843 7.82335 21.151C8.01962 21.905 8.59795 22.4987 9.3323 22.7003C10.6632 23.0665 16.0001 23.0665 16.0001 23.0665C16.0001 23.0665 21.3371 23.0665 22.6679 22.7003C23.4022 22.4987 23.9805 21.905 24.1768 21.151C24.5335 19.7843 24.5335 16.9331 24.5335 16.9331C24.5335 16.9331 24.5335 14.0818 24.1768 12.7153Z"
                        fill="white"
                      ></path>
                      <path d="M14.3999 19.8665V14.5332L18.6666 17.2L14.3999 19.8665Z" fill="#FF0000"></path>
                    </svg>
                  </a>
                  <a
                    rel="nofollow noreferrer"
                    href="#/"
                    className="inline-block mr-4 mb-4 w-[32px] h-[32px] align-middle"
                    target="_blank"
                    title="Zalo"
                  >
                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0 16.6665C0 7.82995 7.16344 0.666504 16 0.666504C24.8366 0.666504 32 7.82995 32 16.6665C32 25.5031 24.8366 32.6665 16 32.6665C7.16344 32.6665 0 25.5031 0 16.6665Z"
                        fill="#3171F6"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.0002 5.99984C10.1091 5.99984 5.3335 10.4556 5.3335 15.9522C5.3335 19.0351 6.83597 21.7903 9.19473 23.6158V27.3332L12.8261 25.4565C13.8287 25.7477 14.8948 25.9046 16.0002 25.9046C21.8912 25.9046 26.6668 21.4488 26.6668 15.9522C26.6668 10.4556 21.8912 5.99984 16.0002 5.99984ZM9.87701 18.0804C10.6612 18.0804 11.3932 18.0759 12.125 18.0821C12.5362 18.0856 12.7584 18.2607 12.7962 18.5845C12.8442 18.9944 12.605 19.2664 12.1609 19.2714C11.3233 19.2809 10.4855 19.275 9.64768 19.275C9.40587 19.275 9.16349 19.2835 8.92244 19.2696C8.62187 19.2523 8.32787 19.1928 8.18415 18.8827C8.04006 18.5719 8.14015 18.293 8.33911 18.04C9.13968 17.0219 9.9412 16.0047 10.7422 14.9869C10.7898 14.9265 10.8357 14.8648 10.882 14.8043C10.833 14.7159 10.7554 14.7555 10.6949 14.7551C10.1336 14.7516 9.57215 14.7556 9.01082 14.7511C8.88254 14.7501 8.75044 14.7398 8.62701 14.7074C8.36663 14.6391 8.20854 14.4307 8.20644 14.182C8.20434 13.9329 8.35768 13.722 8.61749 13.6487C8.74025 13.6141 8.87282 13.6021 9.00111 13.6016C9.9252 13.5978 10.8493 13.5981 11.7734 13.6011C11.9367 13.6016 12.1011 13.6058 12.2597 13.6606C12.6101 13.7815 12.7643 14.1045 12.6219 14.4465C12.4978 14.7442 12.3001 14.9973 12.1027 15.2486C11.4252 16.1108 10.7452 16.9709 10.0663 17.8322C10.0136 17.899 9.96292 17.9676 9.87701 18.0804ZM14.0567 17.2472C14.0617 17.4255 14.1205 17.6652 14.2747 17.8732C14.6102 18.3257 15.2984 18.3243 15.6337 17.8723C15.9242 17.4805 15.9227 16.8304 15.6319 16.4389C15.4782 16.2321 15.273 16.1238 15.0169 16.1087C14.4487 16.0753 14.0509 16.5148 14.0567 17.2472ZM15.8889 15.3525C16.0151 15.1936 16.1404 15.0439 16.3538 15.0005C16.7609 14.9174 17.147 15.182 17.1525 15.596C17.1661 16.6319 17.161 17.668 17.1549 18.7041C17.1532 18.987 16.9789 19.2039 16.7239 19.2906C16.4567 19.3814 16.1783 19.3152 15.9998 19.09C15.9124 18.9797 15.875 18.9607 15.7531 19.0596C15.2812 19.4422 14.7489 19.5091 14.1735 19.3225C13.2505 19.023 12.8705 18.3038 12.7703 17.4228C12.6626 16.4766 12.9776 15.6645 13.8246 15.1666C14.5277 14.7532 15.2421 14.788 15.8889 15.3525ZM20.7838 17.1508C20.7824 17.416 20.8448 17.6634 21.0047 17.8783C21.3324 18.3189 22.0136 18.3224 22.348 17.8879C22.6494 17.4962 22.6504 16.8305 22.353 16.4346C22.1979 16.2282 21.9918 16.1217 21.7364 16.1082C21.1766 16.0785 20.7862 16.5065 20.7838 17.1508ZM19.4806 17.276C19.4411 15.9452 20.3142 14.9509 21.556 14.9127C22.8756 14.8721 23.8436 15.7594 23.883 17.0529C23.9229 18.3626 23.1194 19.2917 21.8803 19.416C20.5341 19.5509 19.4614 18.57 19.4806 17.276ZM19.0266 16.2455C19.0266 17.0484 19.0306 17.8513 19.025 18.6542C19.0218 19.1134 18.6166 19.4239 18.1809 19.3139C17.9192 19.2479 17.7236 18.9703 17.7231 18.6468C17.7211 17.2741 17.7223 15.9014 17.7223 14.5287C17.7223 14.287 17.7189 14.0451 17.7231 13.8035C17.7301 13.4051 17.9837 13.1465 18.3649 13.1428C18.7586 13.1389 19.0226 13.3985 19.0252 13.811C19.0302 14.6225 19.0266 15.434 19.0266 16.2455Z"
                        fill="white"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
