import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../../../store/store";

import {
  ResponsiveContainer,
  Tooltip,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Scatter,
  LabelList,
} from "recharts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SecurityIcon from "@mui/icons-material/Security";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import { formatTime } from "../../../helpers";
import { IconInfo } from "./IconInfo";

const labelFormatter = (label: any, payload: any[]) => {
  return <mark>{payload?.[0]?.payload?.POOLNAME}</mark>;
};

export const Epoch = observer(() => {
  return (
    <Box sx={{ padding: 1 }}>
      <p className="h4" style={{ marginLeft: 20, marginTop: -20 }}>
        Epoch info
      </p>
      <div className="d-flex flex-row bd-highlight mb-3 m-5">
        <IconInfo
          IconComponent={() => <CalendarMonthIcon sx={{ fontSize: 40 }} />}
          description="Date"
          value={formatTime(store.selectedEpoch?.TIMESTAMP as number)}
        />
        <IconInfo
          IconComponent={() => <SecurityIcon sx={{ fontSize: 40 }} />}
          description="Validators"
          value={store.selectedEpoch?.VALIDATORS as number}
        />
        <IconInfo
          IconComponent={() => <WidgetsOutlinedIcon sx={{ fontSize: 40 }} />}
          description="Last block"
          value={store.selectedEpoch?.LAST_BLOCK as number}
        />
        <IconInfo
          IconComponent={() => (
            <ThumbDownOffAltOutlinedIcon sx={{ fontSize: 40 }} />
          )}
          description="Kicked out"
          value={store.selectedEpoch?.KICKED_OUT || 0}
        />
        <IconInfo
          IconComponent={() => <SavingsOutlinedIcon sx={{ fontSize: 40 }} />}
          description="Seat price"
          value={store.selectedEpoch?.SEAT_PRICE + " Ⓝ"}
        />
      </div>
      <Box>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart syncId="cursorId">
            <CartesianGrid />
            <XAxis type="number" dataKey="STAKE" name="Stake" unit="Ⓝ" />
            <YAxis
              type="number"
              dataKey="PRODUCED_CHUNKS"
              name="Produced Chunks"
            />

            <Tooltip labelFormatter={labelFormatter} />
            <Scatter data={store.epochValidators?.validators} fill="#8884d8">
              <LabelList dataKey="x" />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart syncId="cursorId">
            <CartesianGrid />
            <XAxis type="number" dataKey="STAKE" name="Stake" unit="Ⓝ" />
            <YAxis
              type="number"
              dataKey="PRODUCED_BLOCKS"
              name="Produced Blocks"
            />

            <Tooltip labelFormatter={labelFormatter} />

            <Scatter data={store.epochValidators?.validators} fill="#8884d8">
              <LabelList dataKey="x" />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
});
