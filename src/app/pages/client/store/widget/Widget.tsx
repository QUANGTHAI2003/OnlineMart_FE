import { dataWidget } from "../data";

import WidgetList from "./component/WidgetList";
const Widget = () => {
  if (dataWidget.length !== 0) {
    dataWidget.map((widget: any) => {
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
