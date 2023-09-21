import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faFilter, faRedo, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Input, Space } from "antd";
import { useEffect, useState } from "react";

import * as S from "../AdminMainHeader.styles";
import ChatPlatformSkeleton from "../skeletons/ChatPlatformSkeleton";

const ChatPlatformItem = () => {
  const [loadingSkeletonCount, setLoadingSkeletonCount] = useState<boolean>(false);
  const [isDivVisible, setIsDivVisible] = useState<boolean>(false);
  const [isResetClicked, setIsResetClicked] = useState<boolean>(false);

  useEffect(() => {
    setLoadingSkeletonCount(true);
    setTimeout(() => {
      setLoadingSkeletonCount(false);
    }, 3000);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const toggleSort = () => {
    setIsDivVisible(!isDivVisible);
  };

  const resetSort = () => {
    setIsResetClicked(true);
  };

  const closeSort = () => {
    setIsDivVisible(false);
    setIsResetClicked(false);
  };
  return (
    <div>
      {loadingSkeletonCount ? (
        <ChatPlatformSkeleton count={1} />
      ) : (
        <S.ChatPlatformItem className="chatPlatform">
          <Button onClick={() => setModalOpen(true)} className="chat_button">
            <FontAwesomeIcon icon={faCommentDots} />
          </Button>

          <S.ModalChatPlatform
            title={
              <div className="setting">
                <SettingOutlined className="icon" />
              </div>
            }
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
          >
            <Space.Compact>
              <Input addonBefore={<SearchOutlined />} placeholder="large size" />
            </Space.Compact>
            <div>
              <button className="filter-button" onClick={toggleSort}>
                <FontAwesomeIcon icon={faFilter} />
                Lọc
              </button>
            </div>
            <Divider className="divider" />
            <div>
              {isDivVisible && (
                <div>
                  <p>Nội dung div hiển thị ở đây.</p>
                  <button className={`reset-button ${isResetClicked ? "reset-clicked" : ""}`} onClick={resetSort}>
                    <FontAwesomeIcon icon={faRedo} />
                    Reset
                  </button>
                  <button className="close-button" onClick={closeSort}>
                    <FontAwesomeIcon icon={faTimes} />
                    Close
                  </button>
                </div>
              )}
            </div>
          </S.ModalChatPlatform>
        </S.ChatPlatformItem>
      )}
    </div>
  );
};

export default ChatPlatformItem;
