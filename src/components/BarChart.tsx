import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

interface ChartData {
  segmentName: string;
  value: number;
  valueForUnknown: number;
  amt?: number;
}

const data: ChartData[] =
//  [
//   { name: "Page A", uv: 4000, pv: 2400 },
//   { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
//   { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
//   { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
//   { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
//   { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
//   { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
// ];
[
  {
    segmentName: "Wholesalers/OEM",
    "value": 5098787.25,
    "valueForUnknown": 0
  },
  {
    segmentName: "Top 10 BG",
    "value": 900966.790001,
    "valueForUnknown": 0
  },
  {
    segmentName: "Small Hospitals",
    "value": 4031933.420006,
    "valueForUnknown": 0
  },
  {
    segmentName: "Pharmacy",
    "value": 2319469.909998,
    "valueForUnknown": 0
  },
  {
    segmentName: "Others",
    "value": 40584.830001,
    "valueForUnknown": 0
  },
  {
    segmentName: "Medium Hospitals",
    "value": 5962394.269999,
    "valueForUnknown": 0
  },
  {
    segmentName: "Medium BG",
    "value": 0,
    "valueForUnknown": 0
  },
  {
    segmentName: "Large Hospitals",
    "value": 6017026.690584,
    "valueForUnknown": 0
  },
  {
    segmentName: "Large BG",
    "value": 0,
    "valueForUnknown": 0
  },
  {
    segmentName: "HC/AS -Providers",
    "value": 3526131.71,
    "valueForUnknown": 0
  },
  {
    segmentName: "HC/AS -Distributors",
    "value": 2073764.509999,
    "valueForUnknown": 0
  },
  {
    segmentName: "",
    value: 2448569.620001,
    valueForUnknown: 0
  }
];

// Helper to format numbers as USD
const formatUSD = (value: number | string) => {
  const num = Number(value);
  if (isNaN(num)) return "€0";
  return `€${num.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
};

// Custom label renderer
const renderLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="#000"
      textAnchor="middle"
      fontSize={12}
    >
      {formatUSD(value)}
    </text>
  );
};

const SimpleBarChart: React.FC = () => {
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "900px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      data={data}
      margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
    >
       <defs>
          <linearGradient id="pvGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.35 0.15 255.71)" />
            <stop offset="50%" stopColor="oklch(0.47 0.15 255.71)" />
            <stop offset="100%" stopColor="oklch(0.35 0.15 255.71)" />
          </linearGradient>
        </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="segmentName" interval={0}  angle={-90}  textAnchor="end"/>
      <YAxis tickFormatter={formatUSD} />
      <Tooltip formatter={(value: any) => formatUSD(value)} />
      <Legend />
      <Bar dataKey="value"  fill="url(#pvGradient)">
        <LabelList dataKey="value" content={renderLabel} />
      </Bar>
      {/* Optional second bar
      <Bar dataKey="uv" fill="#82ca9d">
        <LabelList dataKey="uv" content={renderLabel} />
      </Bar>
      */}
    </BarChart>
  );
};

export default SimpleBarChart;
