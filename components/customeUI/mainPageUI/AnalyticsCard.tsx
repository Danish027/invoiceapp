import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { IconType } from "react-icons";

interface AnalyticsCardProps {
  label?: string;
  value?: number;
  icon?: IconType;
  growth?: number;
  symbol?: boolean;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  label,
  value,
  icon: Icon,
  growth,
  symbol,
}) => {
  return (
    <div>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
          <div>{Icon && <Icon size={17} />}</div>
        </CardHeader>
        <CardContent className=" pb-4">
          <div className="text-2xl font-bold">
            {symbol ? "₹" : ""}
            {value?.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {growth && growth >= 0 ? (
              <span className="text-green-500">+{growth.toFixed(2)}%</span>
            ) : (
              <span className="text-red-500">{growth?.toFixed(2)}%</span>
            )}{" "}
            from last month
          </p>
        </CardContent>
      </Card>{" "}
    </div>
  );
};
