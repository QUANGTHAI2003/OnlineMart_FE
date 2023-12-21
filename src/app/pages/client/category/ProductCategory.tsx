import ProductCard from "@app/app/components/clients/ProductCard/ProductCard";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import { useSyncToURL } from "@app/hooks";
import { useGetProductCategoryQuery } from "@app/store/slices/api/producCategoryApi";
import { setCategory, setPrice, setShop, setSupplier } from "@app/store/slices/sortSidebarSlice";
import { useAppDispatch } from "@app/store/store";
import { IProductCategoryData } from "@app/types/products_category.types";
import { Alert, Col, Pagination as ProductPagination, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { trackWindowScroll } from "react-lazy-load-image-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { BrandComponent, SortPaginateItem } from "./components";
import * as S from "./ProductCategory.styles";

const pageSize = 30;

const ProductCategory = () => {
  const { t } = useTranslation();
  const { id, slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const syncToURL = useSyncToURL();
  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(1);
  const param = new URLSearchParams(location.search);

  const { data, isFetching } = useGetProductCategoryQuery(
    {
      id,
      page,
    },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (data?.category_slug !== slug && !isFetching) {
      navigate(`/category/${data?.category_slug}/${id}`);
    }
  }, [data?.category_slug, id, isFetching, navigate, slug]);

  useEffect(() => {
    if (data) {
      const { category, sort_price, shop, supplier } = data.filters;
      dispatch(setCategory(category));
      dispatch(setPrice(sort_price));
      dispatch(setShop(shop));
      dispatch(setSupplier(supplier));
    }
  }, [data, dispatch]);

  const filterdProductCategory = () => {
    const rating = param.get("rating");
    const price = param.get("price");
    const [minPrice, maxPrice] = price?.split(",") || [];
    const shop = param.get("shop");
    const supplier = param.get("supplier");
    const sort = param.get("sort");

    let products = data?.products || [];

    if (rating) {
      products = products.filter((item: IProductCategoryData) => item.rating >= parseInt(rating));
    }

    if (minPrice && maxPrice) {
      products = products.filter(
        (item: IProductCategoryData) =>
          item.current_price >= parseInt(minPrice) && item.current_price <= parseInt(maxPrice)
      );
    }

    if (shop) {
      const shop_id = shop.split(",");
      products = products.filter((item: IProductCategoryData) => shop_id.includes(item.shop_id.toString()));
    }

    if (supplier) {
      const supplier_id = supplier.split(",");
      products = products.filter((item: IProductCategoryData) => supplier_id.includes(item.supplier_id.toString()));
    }

    if (sort) {
      let sortedProducts = [...products];

      if (sort === "popular") {
        sortedProducts = sortedProducts.sort((a, b) => b.view_count - a.view_count);
      } else if (sort === "top_sales") {
        sortedProducts = sortedProducts.sort((a, b) => b.sold_count - a.sold_count);
      } else if (sort === "latest") {
        sortedProducts = sortedProducts.sort((a, b) => {
          const timestampA = Date.parse(a.created_at);
          const timestampB = Date.parse(b.created_at);

          return timestampB - timestampA;
        });
      } else if (sort === "low_high") {
        sortedProducts = sortedProducts.sort((a, b) => a.current_price - b.current_price);
      } else if (sort === "high_low") {
        sortedProducts = sortedProducts.sort((a, b) => b.current_price - a.current_price);
      }

      return sortedProducts;
    }

    return products;
  };

  const currentPage: number = parseInt(param.get("page") ?? "1");
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const handlePageChange = (newPage: number) => {
    if (currentPage === newPage) return;

    setPage(newPage);
    syncToURL({ page: `${newPage}` });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <S.HomeStyle className="flex flex-col">
      <p className="title">{data?.category_name}</p>
      <BrandComponent />
      <SortPaginateItem
        onPageChange={handlePageChange}
        current={currentPage}
        total={filterdProductCategory().length || 0}
        pageSize={pageSize}
      />

      {isFetching ? (
        <ProductCardSkeleton count={30} />
      ) : (
        <Row gutter={[8, 8]}>
          {filterdProductCategory().length > 0 ? (
            filterdProductCategory()
              .slice(startIndex, endIndex)
              .map((item: IProductCategoryData) => {
                return (
                  <Col key={item.id} xs={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }}>
                    <ProductCard
                      id={item.id}
                      name={item.name}
                      slug={item.slug}
                      price={item.current_price}
                      discountRate={item.discount_rate}
                      quantitySold={item.sold_count}
                      ratingAverage={item.rating}
                      thumbnailUrl={item.thumbnail_url}
                      type={item.type}
                      variant_name={item?.variant_name}
                    />
                  </Col>
                );
              })
          ) : (
            <Alert
              className="w-full mx-1 text-xl"
              message={t("user.product_category_page.alert_no_product")}
              type="warning"
              showIcon
            />
          )}
        </Row>
      )}
      <ProductPagination
        className="flex justify-center mt-8"
        defaultCurrent={1}
        current={currentPage}
        total={filterdProductCategory().length || 0}
        pageSize={pageSize}
        onChange={handlePageChange}
        hideOnSinglePage
      />
    </S.HomeStyle>
  );
};

export default trackWindowScroll(ProductCategory);
