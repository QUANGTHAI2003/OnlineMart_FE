import { useLocation, useNavigate } from "react-router-dom";

const useSyncToURL = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const syncToURL = (params: Record<string, string>) => {
    const currentSearchParams = new URLSearchParams(location.search);

    // Merge the current search params with the new params
    const mergedParams = { ...Object.fromEntries(currentSearchParams), ...params };

    // Construct the query string manually
    const queryString = Object.entries(mergedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    // Update the URL
    navigate(`?${queryString}`);
  };

  return syncToURL;
};

export default useSyncToURL;
