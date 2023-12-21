import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { searchList } from "./data";

const { Search } = Input;

const SearchBar = () => {
  const { t } = useTranslation();

  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [filteredSearchList, setFilteredSearchList] = useState(searchList);
  const navigator = useNavigate();
  const urlSearch = "/search";
  const searchRef = useRef<HTMLDivElement>(null);
  const queryParams = new URLSearchParams();
  const handleSearch = (value: string) => {
    // const url = `${urlSearch}?query=${encodeURIComponent(value)}`;
    const search = queryParams.append("search", value);
    // const filteredList = searchList.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    navigator(`${urlSearch}?${search}`);
  };

  const handleFocus = () => {
    setShowSuggestion(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestion(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative mx-auto my-0 mt-6 flex justify-center mb-4 ">
      <Search
        className="w-[50%] mt-2"
        placeholder={t("admin_shop.settings.placeholder")}
        allowClear
        enterButton
        onSearch={handleSearch} // Xử lý chuyển hướng khi nhấn Enter hoặc nút tìm kiếm
        onFocus={handleFocus}
        onChange={(e) => {
          const value = e.target.value;
          if (value) {
            const filteredList = searchList.filter((item) => {
              const itemName = t(item.name);
              const itemDescription = t(item.description);
              return (
                itemName.toLowerCase().includes(value.toLowerCase()) ||
                itemDescription.toLowerCase().includes(value.toLowerCase())
              );
            });
            setFilteredSearchList(filteredList);
          } else {
            setFilteredSearchList(searchList);
          }
          setShowSuggestion(true);
        }}
      />
      {showSuggestion && (
        <div className="absolute top-[0] z-50 bg-white w-[50%] h-auto mt-10 border border-gray-300 rounded-md shadow-md">
          <div className="flex flex-col">
            <div className="h-auto overflow-auto max-h-[400px]">
              {filteredSearchList.map((item, index) => (
                <div className="bg-[##F2F9FF] hover:bg-[#E6F4FF]" key={index}>
                  <a href={item.url} className="text-[#212B35] normal-case no-underline">
                    <li className="py-3 pl-3 pr-0 flex flex-col items-start border-solid border-[#F0F1F1] border-b-[2px] border-t-0 border-l-0 border-r-0 hover:text-[#0088FF]">
                      <h6 className="leading-5 font-medium text-sm">{t(item.name)}</h6>
                      <p className="leading-4 font-normal text-sm">{t(item.description)}</p>
                    </li>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
