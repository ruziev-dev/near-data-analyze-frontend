import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { store } from "../../../store/store";
import { IconInfo } from "../epoch/IconInfo";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatTime } from "../../../helpers";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";
import { Avatar } from "@mui/joy";

const labelFormatter = (label: any, payload: any[]) => {
  return (
    <div>
      <p className="h5">
        {`Epoch № ${payload[0]?.payload?.HEIGHT} - `}
        <mark> {formatTime(payload[0]?.payload?.TIMESTAMP)}</mark>
      </p>
      <p>{`ID: ${payload[0]?.payload?.ID}`}</p>
    </div>
  );
};

export const Pool = observer(() => {
  const onEpochClick = (data: CategoricalChartState) => {
    console.log(data);
    const epochId = data.activePayload?.[0]?.payload?.ID || "";
    store.onSelectEpoch(epochId);
  };
  const poolContacts = store?.poolsInfoMap?.[store?.selectedPool as string];

  const poolHistory = store.poolHistory?.history.map((item) => ({
    ...item,
    UPTIME: Math.round(
      ((item.PRODUCED_BLOCKS + item.PRODUCED_CHUNKS) /
        (item.EXPECTED_BLOCKS + item.EXPECTED_CHUNKS)) *
        100
    ),
  }));

  const blocksTotal =
    poolHistory?.reduce((acc, item) => (acc += item.PRODUCED_BLOCKS), 0) || 0;

  const chunksTotal =
    poolHistory?.reduce((acc, item) => (acc += item.PRODUCED_CHUNKS), 0) || 0;

  const kickedOut =
    poolHistory?.reduce((acc, item) => (acc += item.KICKEDOUT), 0) || 0;

  return (
    <Box sx={{ padding: 1 }}>
      <div className="d-flex flex-row bd-highlight mt-0 justify-content-around ">
        {poolContacts && (
          <Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                size="lg"
                alt={poolContacts.country_code}
                src={
                  poolContacts.country_code
                    ? `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.4/flags/4x3/${poolContacts.country_code}.svg`
                    : "https://assets.vglive.no/dist/img/flag-blank.3a4771e35e.svg"
                }
              />
              <div>
                {poolContacts.email && (
                  <Typography component="div">{poolContacts.email}</Typography>
                )}
                {poolContacts.url && (
                  <Typography component="div">{poolContacts.url}</Typography>
                )}
                {poolContacts.twitter && (
                  <Typography level="body2">
                    Twitter: {poolContacts.twitter}
                  </Typography>
                )}
                {poolContacts.telegram && (
                  <Typography level="body2">
                    Telegram: {poolContacts.telegram}
                  </Typography>
                )}
              </div>
            </Box>
          </Card>
        )}
        <IconInfo
          IconComponent={() => <WidgetsOutlinedIcon sx={{ fontSize: 40 }} />}
          description="Blocks Total"
          value={blocksTotal}
        />
        <IconInfo
          IconComponent={() => <AppsOutlinedIcon sx={{ fontSize: 40 }} />}
          description="Chunks Total"
          value={chunksTotal}
        />
        <IconInfo
          IconComponent={() => (
            <ThumbDownOffAltOutlinedIcon sx={{ fontSize: 40 }} />
          )}
          description="Kicked Out Total"
          value={kickedOut}
        />

        {/* poolContacts && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: -5,
            }}
          >
            {Object.keys(poolContacts).map((key) => (
              <ListItem key={key} sx={{ maxWidth: 250, padding: 0}}>
                <ListItemText
                  sx={{ margin: 0}}
                  primary={key}
                  secondary={
                    //@ts-ignore
                    poolContacts?.[key] as string
                  }
                />
              </ListItem>
            ))}
          </Box>
        ) */}
      </div>
      <Box>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart
            data={poolHistory}
            syncId="cursorId"
            onClick={onEpochClick}
          >
            <CartesianGrid stroke="#f5f5f5" />

            <YAxis
              yAxisId="left"
              type="number"
              dataKey="STAKE"
              unit="Ⓝ"
              tickFormatter={(value: any) => Math.round(value / 1000) + "k"}
              orientation="left"
              stroke="#8884d8"
            />
            <YAxis
              yAxisId="right"
              type="number"
              dataKey="PRODUCED_CHUNKS"
              orientation="right"
              stroke="#82ca9d"
            />
            <XAxis
              dataKey="TIMESTAMP"
              tickFormatter={(value: any, index: number) => formatTime(value)}
              tickMargin={10}
              angle={10}
            />
            <Tooltip
              labelFormatter={labelFormatter}
              formatter={(value: string, name: string) => [
                name === "STAKE" ? value + " Ⓝ" : value,
                name.replaceAll("_", " "),
              ]}
            />

            <Area
              type="monotone"
              dataKey="STAKE"
              fill="blue"
              stroke="blue"
              yAxisId="left"
            />

            <Line
              type="monotone"
              dataKey="PRODUCED_CHUNKS"
              stroke="#ff7300"
              dot={{ r: 0 }}
              strokeWidth={3}
              yAxisId="right"
            />
            <Line
              width={3}
              type="monotone"
              dataKey="PRODUCED_BLOCKS"
              stroke="green"
              dot={{ r: 0 }}
              strokeWidth={3}
              yAxisId="right"
            />
          </ComposedChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={330}>
          <ComposedChart
            data={poolHistory}
            syncId="cursorId"
            onClick={onEpochClick}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <YAxis
              yAxisId="left"
              type="number"
              dataKey="UPTIME"
              unit="%"
              stroke="#8884d8"
            />
            <YAxis
              yAxisId="right"
              type="number"
              dataKey="KICKEDOUT"
              orientation="right"
              stroke="#82ca9d"
            />
            <XAxis
              dataKey="TIMESTAMP"
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
              yAxisId="right"
              type="monotone"
              dataKey="UPTIME"
              fill="green"
              stroke="green"
            />

            <Bar yAxisId="right" dataKey={"KICKEDOUT"} fill="red" />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
});
