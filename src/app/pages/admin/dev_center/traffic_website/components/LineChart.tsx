import { G2, Line } from "@ant-design/plots";
import { each, findIndex } from "@antv/util";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const LineChart: React.FC<any> = ({ trafficData }) => {
  const [searchParams] = useSearchParams();
  const [currentSlickId, setCurrentSlickId] = useState<number>(Number(searchParams.get("slick_id")) || 1);

  useEffect(() => {
    setCurrentSlickId(Number(searchParams.get("slick_id")) || 1);
  }, [searchParams]);

  const { InteractionAction, registerInteraction, registerAction } = G2;

  G2.registerShape("point", "custom-point", {
    draw(cfg, container) {
      const point = {
        x: Array.isArray(cfg.x) ? cfg.x[0] : cfg.x,
        y: Array.isArray(cfg.y) ? cfg.y[0] : cfg.y,
      };
      const group = container.addGroup();
      group.addShape("circle", {
        name: "outer-point",
        attrs: {
          x: point.x,
          y: point.y,
          fill: cfg.color || "orange",
          opacity: 0.5,
          r: 6,
        },
      });
      group.addShape("circle", {
        name: "inner-point",
        attrs: {
          x: point.x,
          y: point.y,
          fill: cfg.color || "red",
          opacity: 1,
          r: 2,
        },
      });
      return group;
    },
  });

  class CustomMarkerAction extends InteractionAction {
    active() {
      const view = this.getView();
      const evt = this.context.event;

      if (evt.data) {
        const { items } = evt.data;
        const pointGeometries = view.geometries.filter((geom) => geom.type === "point");
        each(pointGeometries, (pointGeometry) => {
          each(pointGeometry.elements, (pointElement) => {
            const active = findIndex(items, (item: any) => item.data === pointElement.data) !== -1;
            const [point0, point1] = pointElement.shape.getChildren();

            if (active) {
              point0.animate(
                {
                  r: 10,
                  opacity: 0.2,
                },
                {
                  duration: 1800,
                  easing: "easeLinear",
                  repeat: true,
                }
              );

              point1.animate(
                {
                  r: 6,
                  opacity: 0.4,
                },
                {
                  duration: 800,
                  easing: "easeLinear",
                  repeat: true,
                }
              );
            } else {
              this.resetElementState(pointElement);
            }
          });
        });
      }
    }

    reset() {
      const view = this.getView();
      const points = view.geometries.filter((geom) => geom.type === "point");
      each(points, (point) => {
        each(point.elements, (pointElement) => {
          this.resetElementState(pointElement);
        });
      });
    }

    resetElementState(element: any) {
      const [point0, point1] = element.shape.getChildren();
      point0.stopAnimate();
      point1.stopAnimate();
      const { r, opacity } = point0.get("attrs");
      point0.attr({
        r,
        opacity,
      });
      const { r: r1, opacity: opacity1 } = point1.get("attrs");
      point1.attr({
        r: r1,
        opacity: opacity1,
      });
    }

    getView() {
      return this.context.view;
    }
  }

  registerAction("custom-marker-action", CustomMarkerAction);
  registerInteraction("custom-marker-interaction", {
    start: [
      {
        trigger: "tooltip:show",
        action: "custom-marker-action:active",
      },
    ],
    end: [
      {
        trigger: "tooltip:hide",
        action: "custom-marker-action:reset",
      },
    ],
  });
  const config = {
    data: (trafficData && trafficData[currentSlickId - 1] && trafficData[currentSlickId - 1].data) || [],
    xField: "year",
    yField: "value",
    smooth: true,
    point: {
      size: 5,
      shape: "custom-point",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: true,
      label: {
        formatter: (datum: any) => {
          return {
            name: datum.year,
            value: datum.value,
          };
        },
      },
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "custom-marker-interaction",
      },
    ],
  };

  return <Line {...config} />;
};

export default LineChart;
