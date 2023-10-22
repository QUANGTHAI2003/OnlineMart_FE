import * as S from "../BusinessEfficiency.styles";

import { DateComparison, LineChart, SlickList } from ".";

interface IStatistical {
  range: any;
  selectedLabel: string;
}

const Statistical: React.FC<IStatistical> = ({ range, selectedLabel }) => {
  return (
    <S.Statistical>
      <DateComparison range={range} selectedLabel={selectedLabel} />
      <SlickList />
      <LineChart />
    </S.Statistical>
  );
};

export default Statistical;
