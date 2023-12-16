import { ScrollDownIcon } from "@app/app/assets/icons";
import { getLang } from "@app/utils/localstorage";
import OpenAI from "openai";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./ChatGPT.styles";
import ChatGPTFooter from "./ChatGPTFooter";
import ChatGPTHeader from "./ChatGPTHeader";
import ChatIcon from "./ChatIcon";
import ChatItem from "./ChatItem";
import { trainData } from "./train";

const CHATGPT = "ChatGPT";
const USER = "user";

type IChatSender = typeof CHATGPT | typeof USER | "system";

export interface IChatGPTMessage {
  message: string;
  sender: IChatSender;
}

const checkLang = getLang();

const introduceEn = "Hello, I am Omer, the virtual assistant of the Online Mart website. How can I assist you?";
const introduceVi = "Xin chào tôi là Omer trợ lý ảo của website Online Mart. Bạn cần giúp gì ạ?";

const initMessage: IChatGPTMessage[] = [
  {
    message: checkLang == "vi" ? introduceVi : introduceEn,
    sender: CHATGPT,
  },
];

const API_KEY: string = import.meta.env.VITE_CHAT_GPT_API as string;

const ChatGPT: React.FC = () => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<IChatGPTMessage[]>(initMessage);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [stream, setStream] = useState<any>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const scrollDownRef = useRef<HTMLButtonElement>(null);
  const currentChatRef = useRef<HTMLDivElement>(null);

  const handleShowChatGPT = () => {
    setModalOpen(true);
  };

  const handleSendRequest = async (message: string) => {
    const newMessage: IChatGPTMessage = {
      message,
      sender: USER,
    };

    setMessages((prevMessages: IChatGPTMessage[]) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      setStream(response);

      let completeMessage = "";
      for await (const chunk of response) {
        const chunkMessage = chunk.choices[0]?.delta?.content;

        if (chunkMessage !== undefined) {
          completeMessage += chunkMessage;
        }

        setMessages((prevMessages: IChatGPTMessage[]) => {
          const updatedMessages = [...prevMessages];
          if (updatedMessages.length > 0) {
            const lastMessageIndex = updatedMessages.length - 1;
            const lastMessage = updatedMessages[lastMessageIndex];

            const updatedMessage: IChatGPTMessage = {
              ...lastMessage,
              message: completeMessage,
              sender: "system",
            };

            updatedMessages[lastMessageIndex] = updatedMessage;
          }
          return updatedMessages;
        });
      }
    } catch (error: any) {
      console.log("Error sending message:", error);
      setMessages((prevMessages: IChatGPTMessage[]) => [
        ...prevMessages,
        { message: t("user.chatgpt.system_error"), sender: "system" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const openai = new OpenAI({
    apiKey: API_KEY,
    // timeout: 20 * 1000,
    dangerouslyAllowBrowser: true,
  });

  async function processMessageToChatGPT(chatMessages: IChatGPTMessage[]): Promise<any> {
    const apiMessages = chatMessages.map((messageObject: IChatGPTMessage) => {
      const role = messageObject.sender === CHATGPT ? "assistant" : "user";
      return { role, content: messageObject.message || "" };
    });

    const apiRequestBody: any = {
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content: trainData,
        },
        ...apiMessages,
      ],
      stream: true,
    };

    try {
      const response = await openai.chat.completions.create(apiRequestBody).catch((err: any) => {
        if (err instanceof OpenAI.APIError) {
          const statusCode = err.status;

          if (statusCode === 400) {
            setMessages((prevMessages: IChatGPTMessage[]) => [
              ...prevMessages,
              { message: err.message, sender: "system" },
            ]);
          } else if (statusCode === 404) {
            setMessages((prevMessages: IChatGPTMessage[]) => [
              ...prevMessages,
              { message: err.message, sender: "system" },
            ]);
          } else if (statusCode === 429) {
            setMessages((prevMessages: IChatGPTMessage[]) => [
              ...prevMessages,
              { message: err.message, sender: "system" },
            ]);
          }
        }
      });

      return response;
    } catch (error) {
      console.log("Error processing message:", error);
      throw error;
    }
  }

  const handleScrollDownClick = () => {
    const chatGpt = document.querySelector(".om-modal-body") as HTMLElement;
    chatGpt?.scrollTo(0, chatGpt?.scrollHeight);
  };

  const handleStopResponse = () => {
    console.log("stop response");
    stream.controller.abort();
  };

  useEffect(() => {
    const chatGpt = document.querySelector(".om-modal-body") as HTMLElement;

    chatGpt?.scrollTo(0, chatGpt?.scrollHeight);

    const handleScrollDown = () => {
      const scrollDown = scrollDownRef.current;
      if (chatGpt?.scrollTop + chatGpt?.clientHeight > chatGpt?.scrollHeight - 100) {
        scrollDown?.classList.add("hidden");
      } else {
        scrollDown?.classList.remove("hidden");
      }
    };

    chatGpt?.addEventListener("scroll", () => {
      handleScrollDown();
    });

    return () => {
      chatGpt?.removeEventListener("scroll", () => {
        handleScrollDown();
      });
    };
  }, [messages]);

  return (
    <>
      <S.ChatGptStyle
        title={<ChatGPTHeader />}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        maskStyle={{ zIndex: 99999 }}
        className="min-w-[700px] max-w-[1000px] w-full"
        zIndex={99999}
        keyboard={true}
        footer={<ChatGPTFooter onSend={handleSendRequest} isTyping={isTyping} onStop={handleStopResponse} />}
      >
        <div className="chat-infinity" ref={currentChatRef}>
          {messages.map((chat: any, index: number) => {
            const checkUser = chat.sender === USER;
            return <ChatItem checkUser={checkUser} chat={chat} key={index} />;
          })}
          <button className="scroll-down hidden" ref={scrollDownRef} onClick={handleScrollDownClick}>
            <ScrollDownIcon />
          </button>
        </div>
      </S.ChatGptStyle>
      <ChatIcon onClickGPT={handleShowChatGPT} />
    </>
  );
};

export default ChatGPT;
