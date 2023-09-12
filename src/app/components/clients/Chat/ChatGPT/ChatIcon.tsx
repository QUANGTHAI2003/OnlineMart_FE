import ChatGptIcon from "@app/app/assets/images/chatgpt_icon.png";

import * as S from "./ChatGPT.styles";

interface IChatGptIconProps {
  onClickGPT: () => void;
}

const ChatIcon: React.FC<IChatGptIconProps> = ({ onClickGPT }) => {
  return (
    <S.ChatIconWrapperStyle>
      <div className="chat-icon" role="button" tabIndex={0} onClick={onClickGPT} onKeyDown={onClickGPT}>
        <img className="chat-gpt-icon" alt="" src={ChatGptIcon} height="88" width="88" />
      </div>
    </S.ChatIconWrapperStyle>
  );
};

export default ChatIcon;
