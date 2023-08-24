import {Select} from "antd";
import axios, {AxiosRequestConfig} from "axios";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";

interface ICity {
  Id: string;
  Name: string;
  Districts: IDistrict[];
}

interface IDistrict {
  Id: string;
  Name: string;
  Wards: IWard[];
}

interface IWard {
  Id: string;
  Name: string;
}

interface ISelectAddress {
  onAddressChange: (address: string, wardName: string) => void;
}

const SelectAddress: React.FC<ISelectAddress> = React.memo(({ onAddressChange }) => {
  const [data, setData] = useState<ICity[]>([]);
  const [selectedCityName, setSelectedCityName] = useState<string>("");
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { t } = useTranslation();

  useEffect(() => {
    const axiosConfig: AxiosRequestConfig = {
      url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
      method: "GET",
      responseType: "json",
    };

    axios(axiosConfig).then(({ data }) => {
      setData(data);
    });
  }, []);

  const handleCityChange = useCallback((event: string) => {
    setSelectedCityName(event);
    setSelectedDistrictName("");
  }, []);

  const handleDistrictChange = useCallback((event: string) => {
    setSelectedDistrictName(event);
  }, []);

  const cities = useMemo(() => {
    return data;
  }, [data]);

  const districts = useMemo(() => {
    if (selectedCityName) {
      const selectedCity = cities.find((city) => city.Name === selectedCityName);

      if (selectedCity) {
        return selectedCity.Districts;
      }
    }

    return [];
  }, [cities, selectedCityName]);

  const wards = useMemo(() => {
    if (selectedDistrictName) {
      const selectedCity = cities.find((city) => city.Name === selectedCityName);
      const selectedDistrict = selectedCity?.Districts.find((district) => district.Name === selectedDistrictName);

      if (selectedDistrict) {
        return selectedDistrict.Wards;
      }
    }

    return [];
  }, [cities, selectedCityName, selectedDistrictName]);

  // add useDebounce
  const filterOption = (inputValue: string, option: any) => {
    return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  };

  const handleWardChange = useCallback(
    (wardName: string) => {
      const selectedCity = cities.find((city) => city.Name === selectedCityName);
      const selectedDistrict = selectedCity?.Districts.find((district) => district.Name === selectedDistrictName);
      const selectedWard = selectedDistrict?.Wards.find((ward) => ward.Name === wardName);

      if (selectedCity && selectedDistrict && selectedWard) {
        const address = `${selectedWard.Name}, ${selectedDistrict.Name}, ${selectedCity.Name}`;
        onAddressChange(address, wardName);
      }
    },
    [cities, selectedCityName, selectedDistrictName, onAddressChange]
  );

  return (
    <div className="select-address" style={{ backgroundColor: "#fff", padding: "20px" }}>
      <div className="row-select">
        <p className="location-type">{t("user.select_address.select_provine")}</p>
        <Select
          className="form-select form-select-sm mb-3"
          id="city"
          aria-label=".form-select-sm"
          onChange={handleCityChange}
          showSearch
          filterOption={filterOption}
          placeholder={t("user.select_address.select_provine")}
        >
          {cities.map((city) => (
            <Select.Option key={city.Id} value={city.Name}>
              {city.Name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="row-select">
        <p className="location-type">{t("user.select_address.select_district")}</p>
        <Select
          className="form-select form-select-sm mb-3"
          id="district"
          aria-label=".form-select-sm"
          onChange={handleDistrictChange}
          showSearch
          filterOption={filterOption}
          disabled={!selectedCityName}
          placeholder={t("user.select_address.select_district")}
        >
          {districts.map((district) => (
            <Select.Option key={district.Id} value={district.Name}>
              {district.Name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="row-select">
        <p className="location-type">{t("user.select_address.select_ward")}</p>
        <Select
          className="form-select form-select-sm"
          id="ward"
          aria-label=".form-select-sm"
          disabled={!selectedDistrictName}
          placeholder={t("user.select_address.select_ward")}
          onChange={handleWardChange}
          showSearch
          filterOption={filterOption}
        >
          {wards.map((ward) => (
            <Select.Option key={ward.Id} value={ward.Name}>
              {ward.Name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
});

export default SelectAddress;
