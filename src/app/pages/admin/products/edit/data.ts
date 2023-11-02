interface IOption {
  id: number;
  value: string | number;
  label: string;
  children?: IOption[];
}

export const optionsSelect: IOption[] = [
  {
    id: 1,
    value: "Điện Thoại - Máy Tính Bảng",
    label: "Điện Thoại - Máy Tính Bảng",
    children: [
      {
        id: 11,
        value: "Điện thoại Smartphone",
        label: "Điện thoại Smartphone",
      },
      {
        id: 12,
        value: "Máy tính bảng",
        label: "Máy tính bảng",
      },
      {
        id: 13,
        value: "Điện thoại phổ thông",
        label: "Điện thoại phổ thông",
      },
    ],
  },
  {
    id: 2,
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        id: 31,
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            id: 41,
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
