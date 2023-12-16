import { LoadingOutlined } from "@ant-design/icons";
import { SendIcon } from "@app/app/assets/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./ChatGPT.styles";

const ChatGPTFooter = ({ onSend, onStop, isTyping }: any) => {
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
      {isTyping && (
        <Button onClick={onStop} className="absolute z-[999999] bottom-28 left-[50%] translate-x-[-50%]">
          {t("user.chatgpt.stop")}
        </Button>
      )}
      <div className="input-message">
        <Input
          placeholder={t("user.chatgpt.chat_input")}
          onChange={handleMessage}
          onKeyDown={handleKeyPress}
          value={inputMessage}
          disabled={isTyping}
        />
        <div
          className="input-chat-end"
          role="button"
          onClick={handleSendMessage}
          onKeyDown={handleKeyPress}
          tabIndex={0}
        >
          {isTyping ? <LoadingOutlined /> : <SendIcon />}
        </div>
      </div>
      <div className="about-us">{t("user.chatgpt.about_us")}</div>
    </S.ChatGptFooterStyle>
  );
};

export default ChatGPTFooter;
