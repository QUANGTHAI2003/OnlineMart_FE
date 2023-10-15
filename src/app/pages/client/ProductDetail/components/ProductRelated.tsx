import OtherProduct from "@app/app/components/clients/OtherProduct/OtherProduct";
import { useGetRelatedProductsQuery } from "@app/store/slices/api/user/productApi";
import { useParams } from "react-router-dom";

const ProductRelated = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetRelatedProductsQuery(parseInt(id as string));

  return <OtherProduct data={data || []} isLoading={isFetching} />;
};

export default ProductRelated;
