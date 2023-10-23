import * as S from "../TrafficWebsite.styles";

import { LineChart, PrimaryIndex, SlickList } from ".";

interface IStatistical {
  range: any;
  selectedLabel: string;
}

const Statistical: React.FC<IStatistical> = ({ range, selectedLabel }) => {
  return (
    <S.Statistical>
      <PrimaryIndex range={range} selectedLabel={selectedLabel} />
      <SlickList />
      <LineChart />
    </S.Statistical>
  );
};

export default Statistical;
