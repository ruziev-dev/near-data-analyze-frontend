import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import {
  CartesianGrid,
  XAxis,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";
import { formatTime } from "../../../helpers";

import { store } from "../../../store/store";

const AVERAGE_STAKE = "Average_Validators_Stake";
const MEDIAN_STAKE = "Median_Validators_Stake";
const SEAT_PRICE = "Seat_Price";
const VALIDATORS = "Validators";
const KICKED_OUT = "Kicked_Out";
const PROPOSALS = "Proposals";

const labelFormatter = (label: any, payload: any[]) => {
  return (
    <div>
      <p className="h5">
        {`Epoch № ${payload[0]?.payload?.epochHeight} - `}
        <mark> {formatTime(payload[0]?.payload?.time)}</mark>
      </p>
      <p>{`ID: ${payload[0]?.payload?.epochID}`}</p>
    </div>
  );
};

export const Base = observer(() => {
  const data = store?.baseInfo?.epochs?.map((epoch) => ({
    epochHeight: epoch.HEIGHT,
    epochID: epoch.ID,
    time: epoch.TIMESTAMP,
    [SEAT_PRICE]: epoch.SEAT_PRICE,
    [AVERAGE_STAKE]: epoch.AVERAGE_STAKE,
    [MEDIAN_STAKE]: epoch.MEDIAN_STAKE,
    [VALIDATORS]: epoch.VALIDATORS,
    [KICKED_OUT]: epoch.KICKED_OUT,
    [PROPOSALS]: epoch.PROPOSALS,
  }));

  const onEpochClick = (data: CategoricalChartState) => {
    const epochId = data.activePayload?.[0]?.payload?.epochID || "";
    store.onSelectEpoch(epochId);
  };
  return (
    <Box sx={{ padding: 1 }}>
      <p className="h5 m-3">Epochs History Data</p>
      <ResponsiveContainer width="100%" height={360} className="mt-3">
        <AreaChart data={data} syncId="cursorId" onClick={onEpochClick}>
          <defs>
            <linearGradient
              id={`color${AVERAGE_STAKE}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#000000" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#000000" stopOpacity={0} />
            </linearGradient>
            <linearGradient
              id={`color${SEAT_PRICE}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient
              id={`color${MEDIAN_STAKE}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            tickMargin={10}
            angle={10}
            tickFormatter={(value: number) => formatTime(value)}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            labelFormatter={labelFormatter}
            formatter={(value: string, name: string) => [
              `${value} Ⓝ`,
              name.replaceAll("_", " "),
            ]}
          />
          <Area
            type="monotone"
            dataKey={AVERAGE_STAKE}
            stroke="#000000"
            fillOpacity={1}
            fill={`url(#color${AVERAGE_STAKE})`}
          />
          <Area
            type="monotone"
            dataKey={MEDIAN_STAKE}
            stroke="#82ca9d"
            fillOpacity={1}
            fill={`url(#color${MEDIAN_STAKE})`}
          />
          <Area
            type="monotone"
            dataKey={SEAT_PRICE}
            stroke="#8884d8"
            fillOpacity={1}
            fill={`url(#color${SEAT_PRICE})`}
          />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={360} className="mt-3">
        <ComposedChart data={data} syncId="cursorId" onClick={onEpochClick}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="time"
            tickFormatter={(value: any, index: number) => formatTime(value)}
            tickMargin={10}
            angle={10}
          />
          <Tooltip
            labelFormatter={labelFormatter}
            formatter={(value: string, name: string) => [
              value,
              name.replaceAll("_", " "),
            ]}
          />
          <Area
            type="monotone"
            dataKey={PROPOSALS}
            fill="#82ca9d"
            stroke="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey={VALIDATORS}
            fill="#8884d8"
            stroke="#8884d8"
          />

          <Bar dataKey={KICKED_OUT} barSize={20} fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
});
