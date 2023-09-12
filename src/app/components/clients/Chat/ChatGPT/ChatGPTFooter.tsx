import { SendIcon } from "@app/app/assets/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./ChatGPT.styles";

const ChatGPTFooter = ({ onSend }: any) => {
  const { t } = useTranslation();

  const [inputMessage, setInputMessage] = useState<string>("");

  const checkInputMessage = inputMessage.trim().length > 0;

  const handleMessage = (e: any) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    checkInputMessage && onSend(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <S.ChatGptFooterStyle $background={checkInputMessage}>
      <div className="input-message">
        <input
          placeholder={t("user.chatgpt.chat_input")}
          onChange={handleMessage}
          onKeyDown={handleKeyPress}
          value={inputMessage}
        />
        <div
          className="input-chat-end"
          role="button"
          onClick={handleSendMessage}
          onKeyDown={handleKeyPress}
          tabIndex={0}
        >
          <SendIcon />
        </div>
      </div>
      <div className="about-us">{t("user.chatgpt.about_us")}</div>
    </S.ChatGptFooterStyle>
  );
};

export default ChatGPTFooter;
