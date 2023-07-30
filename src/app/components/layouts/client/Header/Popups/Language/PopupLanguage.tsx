import { DownOutlined, UpOutlined } from "@ant-design/icons";
import useLanguage, { LanguageType } from "@app/hooks/useLanguage";
import { Button, Popover } from "antd";
import React, { useEffect, useState } from "react";

interface ILanguage {
  label: string;
  flag: string;
}

interface ILanguages {
  [key: string]: ILanguage;
}

const languages: ILanguages = {
  vi: {
    label: "Tiếng Việt",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg/230px-Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg.png",
  },
  en: {
    label: "English",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/285px-Flag_of_the_United_States.svg.png",
  },
};

const PopupLanguage: React.FC = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { language, setLanguage } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>(languages[language]);

  // Sử dụng useEffect để lấy giá trị lang trong localstorage set giá trị mặc định cho seletedLanguage
  useEffect(() => {
    const storedLanguage = localStorage.getItem("lang") as LanguageType;
    if (storedLanguage && storedLanguage !== language) {
      setSelectedLanguage(languages[storedLanguage]);
    }
  }, [language]);

  const handleSelectLanguage = (language: LanguageType) => {
    setSelectedLanguage(languages[language]);
    setVisible(false);
    setLanguage(language);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " ") {
      handleVisibleChange(!visible);
    }
  };

  const content = (
    <div className="w-[150px]">
      {Object.entries(languages).map(([key, { label, flag }]) => (
        <div
          key={key}
          onClick={() => handleSelectLanguage(key as LanguageType)}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          className="cursor-pointer flex items-center"
        >
          <img src={flag} alt={label} className="w-[25px] object-cover mr-[10px]" />
          <span className="text-base hover:text-blue-600 transition-all ease-in-out">{label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={visible}
      placement="bottom"
      onOpenChange={handleVisibleChange}
      className="border-none transition-all duration-300 ease-in-out "
    >
      <Button className="flex items-center justify-start" type="text">
        <img src={selectedLanguage.flag} alt={selectedLanguage.label} className="w-[25px] mr-[10px] " />
        <span className="text-base">{selectedLanguage.label}</span>
        {visible ? <UpOutlined /> : <DownOutlined />}
      </Button>
    </Popover>
  );
};

export default PopupLanguage;
