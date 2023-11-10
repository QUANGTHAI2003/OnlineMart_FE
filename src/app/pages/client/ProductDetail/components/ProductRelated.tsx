import OtherProduct from "@app/app/components/clients/OtherProduct/OtherProduct";
import { useGetRelatedProductsQuery } from "@app/store/slices/api/user/productApi";
import { useParams } from "react-router-dom";

const ProductRelated = () => {
  const { id } = useParams();

  const { data: productRelated, isFetching } = useGetRelatedProductsQuery(parseInt(id as string));

  if (productRelated !== undefined) {
    return <OtherProduct data={productRelated || []} isLoading={isFetching} />;
  }
  return null;
};

export default ProductRelated;
