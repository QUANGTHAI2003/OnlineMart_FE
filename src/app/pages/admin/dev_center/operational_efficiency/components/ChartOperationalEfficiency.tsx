import { Gauge } from "@ant-design/plots";

const ChartOperationalEfficiency: React.FC<any> = ({ percent, rangeRate }) => {
  const handleGetColorByPercent = () => {
    if (percent <= 1 / 3) {
      return "#F4664A";
    } else if (percent >= 2 / 3) {
      return "#30BF78";
    }
    return "#FAAD14";
  };

  const config: any = {
    percent: percent < 0.25 ? percent * 20 : percent,
    type: "meter",
    innerRadius: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: percent < 0.25 ? ["#30BF78", "#FAAD14", "#F4664A"] : ["#F4664A", "#FAAD14", "#30BF78"],
    },
    axis: {
      label: {
        formatter(v: any) {
          return Number(v) * rangeRate;
        },
      },
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#272D40",
        },
      },
      pin: {
        style: {
          stroke: "#272D40",
        },
      },
    },
    statistic: {
      content: {
        formatter: ({ percent }: any) => `${((rangeRate === 5 ? percent / 20 : percent) * 100).toFixed(0)}%`,
        style: {
          fontSize: "1.2rem",
          lineHeight: "1.2rem",
          color: handleGetColorByPercent(),
        },
      },
    },
  };
  return <Gauge {...config} />;
};
export default ChartOperationalEfficiency;
