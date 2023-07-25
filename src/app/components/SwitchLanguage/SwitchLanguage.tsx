import { useLanguage } from "@app/hooks";
import { Button, Popover } from "antd";
import React, { useState } from "react";

type Language = {
  name: string;
  nativeName: string;
};

export const SwitchLanguage: React.FC = React.memo(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { language, setLanguage } = useLanguage();

  const [open, setOpen] = useState<boolean>(false);

  const [lang] = useState<Language[]>([
    { name: "en", nativeName: "English" },
    { name: "vi", nativeName: "Tiếng Việt" },
  ]);

  const [activeLang, setActiveLang] = useState<Language>({
    name: language,
    nativeName: language === "en" ? "English" : "Tiếng Việt",
  });

  const handleSet = (lang: any): void => {
    setOpen(false);
    setLanguage(lang);
    setActiveLang({
      name: lang,
      nativeName: lang === "en" ? "English" : "Tiếng Việt",
    });
  };

  const handleOpenChange = (newOpen: boolean): void => {
    setOpen(newOpen);
  };

  const content = (
    <>
      {lang.map((language) => (
        <Button
          key={language.name}
          block
          type="text"
          className="border-primary mb-2 px-4 py-2 text-sm text-start items-center inline-flex hover:bg-gray-100"
          onClick={() => handleSet(language.name)}
        >
          <span className="flag-icon flag-icon-vn"></span>
          <span className="truncate">{language.nativeName}</span>
        </Button>
      ))}
    </>
  );

  return (
    <Popover content={content} title="Đổi ngôn ngữ" trigger="click" open={open} onOpenChange={handleOpenChange}>
      <Button
        className="inline-flex items-center justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
        type="text"
      >
        {activeLang.nativeName}
        <svg
          className="-me-1 ms-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Popover>
  );
});
