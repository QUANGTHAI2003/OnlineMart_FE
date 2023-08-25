import { Radio } from "antd";

const VariantSkeleton = () => {
  return (
    <>
      {[...Array(2)].map((_, index: any) => (
        <div key={index} className="animate-pulse">
          <p className="option-text">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 my-2"></div>
          </p>
          <Radio.Group className="flex items-center flex-wrap gap-3">
            {[...Array(2)].map((_, index: any) => (
              <Radio.Button
                key={index}
                value={index}
                className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-32"
              ></Radio.Button>
            ))}
          </Radio.Group>
        </div>
      ))}
    </>
  );
};

export default VariantSkeleton;
