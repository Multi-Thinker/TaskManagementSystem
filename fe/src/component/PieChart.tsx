import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
type PieChart = { total: number; completed: number };
class App extends Component<PieChart> {
  render() {
    const { total, completed }: any = this.props;
    const percentage = completed / total;
    const circle = percentage * 360;
    let remaining = Math.abs(circle - 360);
    remaining = remaining <= 0 ? 0 : remaining;
    const options = {
      exportEnabled: false,
      animationEnabled: false,
      interactivityEnabled: false,
      width: 250,
      height: 158,
      toolTip: {
        enabled: false,
      },
      data: [
        {
          showInLegend: false,
          type: "pie",
          startAngle: 270,
          indexLabelFontSize: 8,
          radius: 80,
          dataPoints: [
            {
              y: circle,
              indexLabel: circle > 0 ? "Completed" : " ",
              color: circle > 0 ? "#5285EC" : "#fff",
              indexLabelFontColor: circle > 0 ? "#5285EC" : "#fff",
            },
            { y: remaining, indexLabel: "", color: "#E8ECEC" },
          ],
        },
      ],
    };
    return (
      <div className="relative block h-full w-[250px] mx-auto">
        <div
          className="relative mx-auto block h-[200px] w-[250px]"
          style={{
            left: "calc(50% - 130px)",
            top: "-14px",
          }}
        >
          <CanvasJSChart options={options} />
        </div>
      </div>
    );
  }
}
export default App;
