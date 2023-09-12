import { useTranslation } from "react-i18next";

import * as S from "./ChatGPT.styles";

const ChatGPTHeader = () => {
  const { t } = useTranslation();

  return (
    <S.ChatGptHeaderStyle>
      <h3>{t("user.chatgpt.assistant")}</h3>
      <div className="feature-btn"></div>
    </S.ChatGptHeaderStyle>
  );
};

export default ChatGPTHeader;
