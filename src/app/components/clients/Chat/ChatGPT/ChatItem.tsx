import { AvatarImage, CopyIcon, IconCheck } from "@app/app/assets/icons";
import ChatGptAvatar from "@app/app/assets/images/chatgpt_avatar.png";
import { useCopyToClipboard } from "@app/hooks";

const ChatItem = ({ chat, checkUser }: any) => {
  const [value, copy] = useCopyToClipboard();

  return (
    <div className="chatgpt-item">
      <div className="py-3">
        <div className={`chat-card ${checkUser ? "flex-row-reverse" : "flex-row"}`}>
          <div className="chat-avatar">
            {checkUser ? <AvatarImage /> : <img src={ChatGptAvatar} alt={chat.sender} width="40" height="40" />}
          </div>
          <div className="flex items-center">
            <div className="chat-text">
              <p dangerouslySetInnerHTML={{ __html: chat.message }}></p>
            </div>
            {checkUser || (
              <div className={`chat-icon`}>
                {value ? <IconCheck /> : <CopyIcon className="cursor-pointer" onClick={() => copy(chat.message)} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
