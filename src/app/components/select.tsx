// import { Select } from "antd";
// import axios, { AxiosRequestConfig } from "axios";
// import React, { useEffect, useState } from "react";

// interface ICity {
//   Id: string;
//   Name: string;
//   Districts: IDistrict[];
// }

// interface IDistrict {
//   Id: string;
//   Name: string;
//   Wards: IWard[];
// }

// interface IWard {
//   Id: string;
//   Name: string;
// }

// const SelectAddress: React.FC = () => {
//   console.log("Select render");
//   const [cities, setCities] = useState<ICity[]>([]);
//   const [districts, setDistricts] = useState<IDistrict[]>([]);
//   const [wards, setWards] = useState<IWard[]>([]);
//   const [selectedCityName, setSelectedCityName] = useState<string>("");
//   const [selectedDistrictName, setSelectedDistrictName] = useState<string>("");

//   useEffect(() => {
//     const axiosConfig: AxiosRequestConfig = {
//       url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
//       method: "GET",
//       responseType: "json",
//     };

//     axios(axiosConfig).then(({ data }) => {
//       setCities(data);
//     });
//   }, []);

//   const handleCityChange = (event: string) => {
//     setSelectedCityName(event);
//     setSelectedDistrictName("");
//     console.log(event);
//   };

//   const handleDistrictChange = (event: string) => {
//     setSelectedDistrictName(event);
//   };

//   useEffect(() => {
//     if (selectedCityName) {
//       const selectedCity = cities.find((city) => city.Name === selectedCityName);

//       if (selectedCity) {
//         setDistricts(selectedCity.Districts);
//         setWards([]);
//       }
//     } else {
//       setDistricts([]);
//       setWards([]);
//     }
//   }, [selectedCityName, cities]);

//   useEffect(() => {
//     if (selectedDistrictName) {
//       const selectedCity = cities.find((city) => city.Name === selectedCityName);
//       const selectedDistrict = selectedCity?.Districts.find((district) => district.Name === selectedDistrictName);

//       if (selectedDistrict) {
//         setWards(selectedDistrict.Wards);
//       }
//     } else {
//       setWards([]);
//     }
//   }, [selectedDistrictName, cities, selectedCityName]);

//   // add useDebounce
//   const filterOption = (inputValue: string, option: any) => {
//     return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
//   };

//   return (
//     <div className="select-address" style={{ backgroundColor: "#fff", padding: "20px" }}>
//       <div className="row-select">
//         <p className="location-type">Tỉnh/Thành phố</p>
//         <Select
//           className="form-select form-select-sm mb-3"
//           id="city"
//           aria-label=".form-select-sm"
//           onChange={handleCityChange}
//           onSearch={(value) => console.log(value)}
//           showSearch
//           filterOption={filterOption}
//           placeholder="Vui lòng chọn tỉnh/thành phố"
//         >
//           {cities.map((city) => (
//             <Select.Option key={city.Id} value={city.Name}>
//               {city.Name}
//             </Select.Option>
//           ))}
//         </Select>
//       </div>

//       <div className="row-select">
//         <p className="location-type">Quận/Huyện</p>
//         <Select
//           className="form-select form-select-sm mb-3"
//           id="district"
//           aria-label=".form-select-sm"
//           onChange={handleDistrictChange}
//           disabled={!selectedCityName}
//           placeholder="Vui lòng chọn quận/huyện"
//         >
//           {districts.map((district) => (
//             <Select.Option key={district.Id} value={district.Name}>
//               {district.Name}
//             </Select.Option>
//           ))}
//         </Select>
//       </div>

//       <div className="row-select">
//         <p className="location-type">Phường/Xã</p>
//         <Select
//           className="form-select form-select-sm"
//           id="ward"
//           aria-label=".form-select-sm"
//           disabled={!selectedDistrictName}
//           placeholder="Vui lòng chọn phường/xã"
//         >
//           {wards.map((ward) => (
//             <Select.Option key={ward.Id} value={ward.Name}>
//               {ward.Name}
//             </Select.Option>
//           ))}
//         </Select>
//       </div>
//     </div>
//   );
// };

// export default SelectAddress;
import { Select } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";

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

const SelectAddress: React.FC = React.memo(() => {
  console.log("Select render");
  const [data, setData] = useState<ICity[]>([]);
  const [selectedCityName, setSelectedCityName] = useState<string>("");
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>("");

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

  return (
    <div className="select-address" style={{ backgroundColor: "#fff", padding: "20px" }}>
      <div className="row-select">
        <p className="location-type">Tỉnh/Thành phố</p>
        <Select
          className="form-select form-select-sm mb-3"
          id="city"
          aria-label=".form-select-sm"
          onChange={handleCityChange}
          onSearch={(value) => console.log(value)}
          showSearch
          filterOption={filterOption}
          placeholder="Vui lòng chọn tỉnh/thành phố"
        >
          {cities.map((city) => (
            <Select.Option key={city.Id} value={city.Name}>
              {city.Name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="row-select">
        <p className="location-type">Quận/Huyện</p>
        <Select
          className="form-select form-select-sm mb-3"
          id="district"
          aria-label=".form-select-sm"
          onChange={handleDistrictChange}
          disabled={!selectedCityName}
          placeholder="Vui lòng chọn quận/huyện"
        >
          {districts.map((district) => (
            <Select.Option key={district.Id} value={district.Name}>
              {district.Name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="row-select">
        <p className="location-type">Phường/Xã</p>
        <Select
          className="form-select form-select-sm"
          id="ward"
          aria-label=".form-select-sm"
          disabled={!selectedDistrictName}
          placeholder="Vui lòng chọn phường/xã"
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
