interface IOption {
  value: string | number;
  label: string;
  children?: IOption[];
}

export const optionsSelect: IOption[] = [
  {
    value: "Điện Thoại - Máy Tính Bảng",
    label: "Điện Thoại - Máy Tính Bảng",
    children: [
      {
        value: "Điện thoại Smartphone",
        label: "Điện thoại Smartphone",
      },
      {
        value: "Máy tính bảng",
        label: "Máy tính bảng",
      },
      {
        value: "Điện thoại phổ thông",
        label: "Điện thoại phổ thông",
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
