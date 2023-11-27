import { Col, Row } from "antd";

type ProductCardSkeletonProps = {
  count: number;
};

const ProductCardSkeleton = ({ count }: ProductCardSkeletonProps) => {
  return (
    <Row gutter={[8, 8]}>
      {[...Array(count)].map((_, index) => (
        <Col key={index} xs={{ span: 12 }} sm={{ span: 6 }} xl={{ span: 4 }} className="animate-pulse">
          <div className="rounded-md bg-slate-300 h-44 w-full"></div>
          <div className="info py-3 w-full">
            <div className="name">
              <div className="bg-slate-300 h-4 w-full rounded-sm"></div>
              <div className="flex mt-2 gap-x-1">
                <div className="bg-slate-300 h-4 w-1/2 rounded-sm"></div>
                <div className="bg-slate-300 h-4 w-1/2 rounded-sm"></div>
              </div>
              <div className="bg-slate-300 h-4 w-full rounded-sm mt-2"></div>
              <div className="flex mt-2 gap-x-1">
                <div className="bg-slate-300 h-4 w-1/2 rounded-sm"></div>
                <div className="bg-slate-300 h-4 w-1/2 rounded-sm"></div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ProductCardSkeleton;
