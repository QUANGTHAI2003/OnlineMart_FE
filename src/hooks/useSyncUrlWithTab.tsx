import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSyncUrlWithTab = (initialTab: string, param: string) => {
  const location = useLocation();
  const navigate = useNavigate();
  const paramFilterName = param || "tab";

  const [tabFiltered, setTabFiltered] = useState<string>(initialTab);

  useEffect(() => {
    const params = queryString.parse(location.search);
    const tabParam = params?.[paramFilterName];

    if (!tabParam) {
      const queryParams = queryString.stringify({ [paramFilterName]: initialTab });
      navigate({ search: queryParams });
    } else {
      setTabFiltered(String(tabParam));
    }
  }, [initialTab, location.search, navigate, paramFilterName]);

  const handleChangeTab = (key: any) => {
    setTabFiltered(key);
    const queryParams = queryString.stringify({ [paramFilterName]: key });
    navigate({ search: queryParams });
  };

  return { tabFiltered, handleChangeTab };
};

export default useSyncUrlWithTab;
