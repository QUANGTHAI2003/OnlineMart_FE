import ProductCard from "@app/app/components/clients/ProductCard/ProductCard";
import ProductCardSale from "@app/app/components/clients/ProductCard/ProductCardSale";
import ProductCardSkeleton from "@app/app/components/clients/ProductCard/ProductCardSkeleton";
import SpecialCategory from "@app/app/components/clients/SpecialCategory/SpecialCategory";

const Home = () => {
  const data = [
    {
      id: 6772415,
      name: "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng",
      price: 470000,
      discount_rate: 40,
      quantity_sold: 14074,
      rating_average: 4.45,
      thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/f6/47/6c/0a4343c10030b1a025fd4750a05e67a1.png",
    },
    {
      id: 6771909,
      name: "Lò Nướng Điện Sunhouse SHD4216 (16L) - Hàng chính hãng",
      price: 759000,
      discount_rate: 28,
      quantity_sold: 14074,
      rating_average: 0,
      thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/f6/47/6c/0a4343c10030b1a025fd4750a05e67a1.png",
    },
    {
      id: 71985742,
      name: "Áo Gió Nam, Áo khoác nam [Nhập EZAGG10K giảm 10K + Miễn Phí Vận Chuyển] Chống Thấm Nước Có Túi Trong Kèm Túi Khóa Kéo Phong Cách Trẻ Trung",
      price: 159000,
      discount_rate: 47,
      quantity_sold: 328,
      rating_average: 4.45,
      thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/b7/53/6a/df9e01310eb21e2e9f872b239f7ad10e.jpg",
    },
    {
      id: 252608893,
      name: "Tã/bỉm quần HUGGIES SKINCARE gói SUPER JUMBO size XXL 54+8 miếng",
      price: 305000,
      discount_rate: 36,
      quantity_sold: 6855,
      rating_average: 4.8,
      thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/3b/7d/8f/f6d83d4d0804e9c65aec36e117b83966.jpg",
    },
    {
      id: 193143163,
      name: "[26.07_MUA 1 TẶNG 2 + VOUCHER 20K] Combo 2 bịch cà phê hòa tan Nescafé 3in1 vị nguyên bản - công thức cải tiến (Bịch 46 gói)",
      price: 360000,
      discount_rate: 0,
      quantity_sold: 1869,
      rating_average: 4.95,
      thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/24/05/0c/3d326e7b6d2faa0f393bd7db970047e0.jpg",
    },
    {
      id: 6772415,
      name: "Lò Nướng Điện Sunhouse SHD4206 (10L) - Hàng chính hãng",
      price: 470000,
      discount_rate: 40,
      quantity_sold: 14074,
      rating_average: 4.45,
      thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/f6/47/6c/0a4343c10030b1a025fd4750a05e67a1.png",
    },
    {
      id: 6771909,
      name: "Lò Nướng Điện Sunhouse SHD4216 (16L) - Hàng chính hãng",
      price: 759000,
      discount_rate: 28,
      quantity_sold: 14074,
      rating_average: 4.3,
      thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/f6/47/6c/0a4343c10030b1a025fd4750a05e67a1.png",
    },
    {
      id: 71985742,
      name: "Áo Gió Nam, Áo khoác nam [Nhập EZAGG10K giảm 10K + Miễn Phí Vận Chuyển] Chống Thấm Nước Có Túi Trong Kèm Túi Khóa Kéo Phong Cách Trẻ Trung",
      price: 159000,
      discount_rate: 47,
      quantity_sold: 328,
      rating_average: 4.45,
      thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/b7/53/6a/df9e01310eb21e2e9f872b239f7ad10e.jpg",
    },
    {
      id: 252608893,
      name: "Tã/bỉm quần HUGGIES SKINCARE gói SUPER JUMBO size XXL 54+8 miếng",
      price: 305000,
      discount_rate: 36,
      quantity_sold: 6855,
      rating_average: 4.8,
      thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/3b/7d/8f/f6d83d4d0804e9c65aec36e117b83966.jpg",
    },
    {
      id: 193143163,
      name: "[26.07_MUA 1 TẶNG 2 + VOUCHER 20K] Combo 2 bịch cà phê hòa tan Nescafé 3in1 vị nguyên bản - công thức cải tiến (Bịch 46 gói)",
      price: 360000,
      discount_rate: 0,
      quantity_sold: 1869,
      rating_average: 4.95,
      thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/24/05/0c/3d326e7b6d2faa0f393bd7db970047e0.jpg",
    },
  ];
  return (
    <>
      <div
        style={{
          display: "grid",
          alignItems: "stretch",
          gap: "8px",
          gridTemplateColumns: "repeat(6, 1fr)",
          backgroundColor: "#f5f5f5",
          padding: "8px",
        }}
      >
        {data.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            discountRate={item.discount_rate}
            quantitySold={item.quantity_sold}
            ratingAverage={item.rating_average}
            thumbnailUrl={item.thumbnail_url}
          />
        ))}
      </div>
      <div
        style={{
          display: "grid",
          alignItems: "stretch",
          gap: "8px",
          gridTemplateColumns: "repeat(6, 1fr)",
          backgroundColor: "#f5f5f5",
          padding: "8px",
        }}
      >
        {data.map((item) => (
          <ProductCardSale
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            discountRate={item.discount_rate}
            thumbnailUrl={item.thumbnail_url}
          />
        ))}
      </div>
      <SpecialCategory />
      {true && <ProductCardSkeleton />}
    </>
  );
};

export default Home;
