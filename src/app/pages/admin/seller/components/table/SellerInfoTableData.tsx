import { Link } from "react-router-dom";

interface ISellerInfoDataTabletProps {
  data: any;
}

const SellerInfoTableData = ({ data }: ISellerInfoDataTabletProps) => {
  return (
    <div>
      <Link className="font-semibold" target="_blank" to={`#/${data.id}`}>
        {data.code}
      </Link>
      <dd>{data.name}</dd>
    </div>
  );
};

export default SellerInfoTableData;
