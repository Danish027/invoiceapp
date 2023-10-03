import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  LineChart as Linechart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

export default class LineChart extends PureComponent {
  // static demoUrl = "https://codesandbox.io/s/synchronized-line-charts-zc3nl";
  static propTypes = {
    analytics: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Invoices and Amount Chart</CardTitle>
            <CardDescription>
              Visual representation of invoices and corresponding amounts over
              time
            </CardDescription>
          </CardHeader>

          <div style={{ width: "100%" }} className="p-2">
            <ResponsiveContainer width="100%" height={200}>
              <Linechart
                width={500}
                height={200}
                //@ts-ignore
                data={this.props.analytics}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Line
                  type="monotone"
                  dataKey="Invoices"
                  stroke="#10b981"
                  fill="#10b981"
                />
                <Line
                  type="monotone"
                  dataKey="Amount"
                  stroke="#10b981"
                  fill="#10b981"
                />
              </Linechart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Amount and Total Paid Amount Chart</CardTitle>
            <CardDescription>
              Visualization of both the total invoice amounts and total paid
              amounts for invoices over time
            </CardDescription>
          </CardHeader>

          <div style={{ width: "100%" }} className="p-2">
            <ResponsiveContainer width="100%" height={200}>
              <Linechart
                width={500}
                height={200}
                //@ts-ignore
                data={this.props.analytics}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Line
                  type="monotone"
                  dataKey="Total-Amount"
                  stroke="#10b981"
                  fill="#10b981"
                />
                <Line
                  type="monotone"
                  dataKey="Total-Amount-Paid"
                  stroke="#10b981"
                  fill="#10b981"
                />
              </Linechart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    );
  }
}
