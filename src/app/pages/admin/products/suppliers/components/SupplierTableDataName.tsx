import { ISupplier } from "@app/types/suppliers.types";
import { baseImageUrl } from "@app/utils/helper";
import { Image } from "antd";
import React from "react";

const SupplierTableDataName: React.FC<ISupplier> = (data) => {
  console.log({ data });
  return (
    <div className="flex flex-nowrap justify-around items-center">
      <Image width="50%" preview={false} src={`${baseImageUrl}/${data?.avatar}`} />
      <h6 className="line-clamp-2 font-semibold">{data?.name}</h6>
    </div>
  );
};

export default SupplierTableDataName;
