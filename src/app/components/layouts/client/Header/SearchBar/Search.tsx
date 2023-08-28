import { DownOutlined, UpOutlined } from "@ant-design/icons";
import iconSearch from "@app/app/assets/images/icon-search.png";
import { Button, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface ISuggestionItem {
  type: "keyword" | "shop";
  value: string;
  image?: string;
}

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<ISuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLess, setShowLess] = useState(true);
  const [isClickingSuggestion, setIsClickingSuggestion] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const apiData: ISuggestionItem[] = [
      {
        type: "shop",
        value: "Shop A",
        image: "https://vcdn.tikicdn.com/cache/100x100/ts/seller/c2/6e/c4/d168d3ed13c5d0f5608c39325e10eeae.jpg.webp",
      },
      {
        type: "keyword",
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        type: "keyword",
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        type: "keyword",
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      { type: "keyword", value: "Keyword C" },
      { type: "keyword", value: "Keyword C" },
    ];

    const filteredSuggestions = apiData.filter((item) => item.value.toLowerCase().includes(value.toLowerCase()));

    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  useEffect(() => {
    setShowLess(true);
  }, []);

  const handleSuggestionClick = (suggestion: ISuggestionItem) => {
    setInputValue(suggestion.value);
    setShowSuggestions(false);
  };
  const handleShowLessBlur = () => {
    setShowLess(true);
    setShowSuggestions(false);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (suggestionRef.current && suggestionRef.current.contains(e.target)) {
      return;
    }
    if (!isClickingSuggestion) {
      setShowSuggestions(false);
    }
  };

  const { t } = useTranslation();

  return (
    <div className="relative w-[800px] h-[40px]">
      <div className="w-full h-full flex items-center rounded-lg relative border-solid border border-[#DDDDE3] bg-white">
        <img className="w-[20px] h-[20px] max-w-full ml-[18px]" src={iconSearch} alt="icon-search" />
        <Input
          placeholder="Bạn tìm gì hôm nay"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="border-0 px-2 font-normal leading-[150%] border-tl-[8px] border-bl-[8px] flex-1 outline-none focus:ring-0 focus:ring-offset-0"
        />
        <Button className="border-0 w-[92px] h-[38px] p-1 bg-transparent text-[#0a68ff] font-normal text-sm leading-[150%] outline-none flex items-center justify-center relative hover:bg-[#0a68ff33] rounded-br-lg rounded-none rounded-tr-lg before:content-[''] before:block before:absolute before:border before:border-solid before:border-[#dddde3] before:h-[24px] before:left-0 before:top-[8px]">
          {t("user.searchbar.title")}
        </Button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionRef}
          onMouseEnter={() => setIsClickingSuggestion(true)}
          onMouseLeave={() => setIsClickingSuggestion(false)}
          className="absolute w-full h-auto mt-[2px] border border-[#DDDDE3] z-10 bg-white"
        >
          {suggestions.slice(0, showLess ? 3 : suggestions.length).map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center py-[10px] px-[20px] cursor-pointer hover:bg-gray-100"
              aria-hidden="true"
            >
              {suggestion.type === "shop" ? (
                <a href="/admin">
                  <div className="flex items-center">
                    <img className="w-9 h-9 mr-2 rounded-full" src={suggestion.image} alt={suggestion.value} />
                    <p className="truncate w-[450px] line-clamp-2">{suggestion.value}</p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center">
                  <img className="w-[20px] h-[20px] max-w-full mr-2" src={iconSearch} alt="icon-search" />
                  <p className="line-clamp-2">{suggestion.value}</p>
                </div>
              )}
            </div>
          ))}
          {suggestions.length > 3 && (
            <div
              className="flex items-center justify-center py-[10px] cursor-pointer hover:bg-gray-100"
              onClick={() => setShowLess(!showLess)}
              onBlur={handleShowLessBlur}
              tabIndex={-1}
              aria-hidden="true"
            >
              {showLess ? (
                <div className="flex items-center text-[#007AFF]">
                  <span className="font-normal ">{t("user.searchbar.expand")}</span>
                  <DownOutlined className="text-sm ml-1" />
                </div>
              ) : (
                <div className="flex items-center text-[#007AFF] ">
                  <span className="font-normal ">{t("user.searchbar.collapse")}</span>
                  <UpOutlined className="text-sm ml-1" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
