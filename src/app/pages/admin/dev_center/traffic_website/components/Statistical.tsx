import * as S from "../TrafficWebsite.styles";

import { LineChart, PrimaryIndex, SlickList } from ".";

interface IStatistical {
  range: any;
  selectedLabel: string;
  trafficData: any;
}

const Statistical: React.FC<IStatistical> = ({ range, selectedLabel, trafficData }) => {
  return (
    <S.Statistical>
      <PrimaryIndex range={range} selectedLabel={selectedLabel} />
      <SlickList trafficData={trafficData} />
      <LineChart trafficData={trafficData} />
    </S.Statistical>
  );
};

export default Statistical;
