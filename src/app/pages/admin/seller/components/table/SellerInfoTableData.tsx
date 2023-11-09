import { Link } from "react-router-dom";

interface ISellerInfoDataTabletProps {
  data: any;
}

const SellerInfoTableData = ({ data }: ISellerInfoDataTabletProps) => {
  return (
    <div>
      <Link className="font-semibold" to={`#/${data.id}`}>
        {`#${data?.id}`}
      </Link>
      <dd>{data?.name}</dd>
    </div>
  );
};

export default SellerInfoTableData;
