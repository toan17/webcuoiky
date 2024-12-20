import { useState } from "react";
import { Typography, Box, MenuItem, Select, useTheme } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { mockRegistry } from "../../data/mockData";
import { tokens } from "../../theme";
import { ResponsiveBar } from "@nivo/bar";

const data = [
    { month: "Hiện tại", value: 100 },
    { month: "Tháng tiếp theo", value: 130 },
];

const Line = () => {
    const theme = useTheme();
    const themeTokens = tokens(theme.palette.mode);
    const [time, setTime] = useState();
    const [center, setCenter] = useState("all");
    return (
        <Box
            m="20px"
            sx={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: 2,
                placeContent: "space-between",
                alignItems: "center",
            }}
        >
            <Header
                title="Dự báo số liệu"
                subtitle="Dự báo số lượng xe đăng kiểm trong tháng tới "
            />

            <Box
                sx={{
                    display: "flex",
                    // flexDirection: "row",
                    paddingBottom: 2,
                    placeContent: "space-between",
                    width: "50vw",
                }}
            >
                <Select
                    sx={{ flex: 1, marginX: 2 }}
                    id="time"
                    value={time}
                    defaultValue={0}
                    onChange={(e) => {
                        setTime(e.target.value);
                    }}
                    label="Time"
                >
                    <MenuItem disabled value={-1}>
                        <em>Khoảng thời gian: </em>
                    </MenuItem>
                    <MenuItem value={0}>Thời gian: All time</MenuItem>
                    <MenuItem value={1}>Quý I</MenuItem>
                    <MenuItem value={2}>Quý II</MenuItem>
                    <MenuItem value={3}>Quý III</MenuItem>
                    <MenuItem value={4}>Quý IV</MenuItem>
                </Select>
                <Select
                    sx={{ flex: 1, marginX: 2 }}
                    id="center"
                    value={center}
                    defaultValue={"all"}
                    onChange={(e) => {
                        setCenter(e.target.value);
                    }}
                    label="Trung tâm"
                    InputLabelProps={{
                        sx: { color: themeTokens.grey[800] },
                    }}
                >
                    <MenuItem disabled value="">
                        <em>Trung tâm: </em>
                    </MenuItem>
                    <MenuItem value={"all"}>Trung tâm: All</MenuItem>
                    {mockRegistry.map((item) => (
                        <MenuItem key={item.center} value={item.center}>
                            {item.center}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <Box
                height="50vh"
                width="50vw"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignContent: "center",
                }}
            >
                <ResponsiveBar
                    sx={{ flex: 2 }}
                    data={data}
                    keys={["value"]}
                    indexBy="month"
                    layout="horizontal"
                    margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                    padding={0.3}
                    valueScale={{ type: "linear", max: 200 }}
                    indexScale={{ type: "band", round: true }}
                    colors={({ index }) => {
                        // Sử dụng màu sắc từ theme
                        const colors = [
                            themeTokens.blueAccent[300],
                            themeTokens.greenAccent[500],
                            themeTokens.redAccent[500],
                        ];
                        return colors[index % colors.length];
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={themeTokens.grey[300]}
                    borderRadius={5} // Bo góc cho cột
                    enableGridY={true}
                    enableLabel={false} // Ẩn nhãn trên cột
                    theme={{
                        axis: {
                            ticks: {
                                text: {
                                    fontSize: 12,
                                    fill: "#9E9E9E",
                                },
                            },
                        },
                        tooltip: {
                            container: {
                                background: themeTokens.primary[900], // Màu nền mặc định của tooltip
                                color: themeTokens.grey[300], // Màu chữ
                                fontSize: "14px",
                            },
                        },
                    }}
                />
                <ResponsiveBar
                    sx={{ flex: 2 }}
                    data={data}
                    keys={["value"]}
                    indexBy="month"
                    layout="horizontal"
                    margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                    padding={0.3}
                    valueScale={{ type: "linear", max: 200 }}
                    indexScale={{ type: "band", round: false }}
                    colors={({ index }) => {
                        // Sử dụng màu sắc từ theme
                        const colors = [
                            themeTokens.blueAccent[300],
                            themeTokens.greenAccent[500],
                            themeTokens.redAccent[500],
                        ];
                        return colors[index % colors.length];
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={themeTokens.grey[300]}
                    borderRadius={5} // Bo góc cho cột
                    enableGridY={true}
                    enableLabel={false} // Ẩn nhãn trên cột
                    theme={{
                        axis: {
                            ticks: {
                                text: {
                                    fontSize: 12,
                                    fill: "#9E9E9E",
                                },
                            },
                        },
                        tooltip: {
                            container: {
                                background: themeTokens.primary[900], // Màu nền mặc định của tooltip
                                color: themeTokens.grey[300], // Màu chữ
                                fontSize: "14px",
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Line;
