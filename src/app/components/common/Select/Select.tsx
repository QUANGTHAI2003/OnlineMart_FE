import { Select as AntSelect } from "antd";
import { RefSelectProps } from "antd/lib/select";
import React, { ComponentProps } from "react";

import * as S from "./Select.styles";

export const { Option } = AntSelect;

export interface ISelectProps extends ComponentProps<typeof AntSelect>, S.ISelectProps {
  className?: string;
}

const filterOption = (inputValue: string, option: any) =>
  option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;

export const Select = React.forwardRef<RefSelectProps, ISelectProps>(
  ({ className, width, children, ...props }, ref) => (
    <S.SelectStyle
      showSearch
      filterOption={filterOption}
      getPopupContainer={(triggerNode: HTMLElement) => triggerNode}
      ref={ref}
      width={width}
      className={className}
      {...props}
    >
      {children}
    </S.SelectStyle>
  )
);
