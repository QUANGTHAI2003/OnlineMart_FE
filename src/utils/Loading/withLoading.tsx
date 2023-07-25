import React, { Suspense } from "react";

import CustomLoading from "./CustomLoading";
type ReturnType<T> = (props: T) => JSX.Element;

export const withLoading = <T extends object>(Component: React.ComponentType<T>): ReturnType<T> => {
  return (props: T) => (
    <Suspense fallback={<CustomLoading />}>
      <Component {...props} />
    </Suspense>
  );
};
