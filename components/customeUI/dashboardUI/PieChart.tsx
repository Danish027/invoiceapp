"use client";
import React, { PureComponent } from "react";
import { PieChart as Piechart, Pie, Tooltip } from "recharts";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import PropTypes from "prop-types";
import { TopCustomers } from "@/schema/type";

export default class PieChart extends PureComponent {
  static propTypes = {
    analytics: PropTypes.array.isRequired,
  };
  render() {
    return (
      <Card>
        <div className="flex flex-col lg:flex-row justify-center items-center ">
          <div className=" w-full h-full ">
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>
                Visual representation of a List of Top 5 Customers
              </CardDescription>
            </CardHeader>
            <div className="grid lg:grid-cols-2 grid-cols-2 sm:mb-6 sm:ml-4 m-2">
              {
                //@ts-ignore
                this.props.analytics.map((value: TopCustomers) => (
                  <div
                    key={value.name}
                    className="flex justify-start flex-col  border p-5 "
                  >
                    <div className=" tracking-wide">
                      <p className="truncate ">{value.name}</p>
                    </div>
                    <div className=" tracking-wide">
                      Invoices : {value.invoices}
                    </div>
                    <div className="tracking-wide">
                      Amount : ₹{value.amount.toFixed(2)}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            <Piechart width={320} height={250}>
              <Pie
                dataKey="amount"
                isAnimationActive={false}
                //@ts-ignore
                data={this.props.analytics}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#10b981"
                label
              />
              <Tooltip />
            </Piechart>
          </div>
        </div>
      </Card>
    );
  }
}
