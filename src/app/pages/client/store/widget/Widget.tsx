import { dataWidget } from "../data";
import WidgetList from "./component/WidgetList";
const Widget = () => {
  let limitedData: any = [];
  if (dataWidget.length !== 0) {
    limitedData = dataWidget.map((widget: any) => {
      if (widget.code === "hot_categories") {
        return {
          ...widget,
          items: widget.items.slice(0, 4),
        };
      }
      return {
        ...widget,
        items: widget.items.slice(0, 3),
      };
    });
  }
  return <WidgetList />;
};

export default Widget;
