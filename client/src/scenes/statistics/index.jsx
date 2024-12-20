import { Box, useTheme, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useState } from "react";
import { mockRegistry } from "../../data/mockData";
import DataCard from "../../components/DataCard";
import PieChart from "../../components/PieChart";
import { ResponsiveBar } from "@nivo/bar";

const data = [
    { month: "JAN", value: 120 },
    { month: "FEB", value: 200 },
    { month: "MAR", value: 150 },
    { month: "APR", value: 220 },
    { month: "MAY", value: 300 },
    { month: "JUN", value: 250 },
    { month: "JUL", value: 180 },
    { month: "AUG", value: 280 },
    { month: "SEP", value: 320 },
    { month: "OCT", value: 350 },
    { month: "NOV", value: 400 },
    { month: "DEC", value: 420 },
];

function Statistics() {
    const theme = useTheme();
    const themeTokens = tokens(theme.palette.mode);
    const [time, setTime] = useState();
    const [center, setCenter] = useState("all");
    const [line, setLine] = useState(0);
    console.log(mockRegistry);

    return (
        <Box>
            {/* Thống kê tổng quát */}
            <Box m="20px" sx={{ paddingBottom: 4 }}>
                <Header title="Thống kê" subtitle="Số liệu đăng kiểm" />

                <Box
                    sx={{
                        display: "flex",
                        // flexDirection: "row",
                        paddingBottom: 2,
                        placeContent: "space-between",
                    }}
                >
                    <Select
                        sx={{ width: "30%" }}
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
                        sx={{ width: "30%" }}
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
                    <Select
                        sx={{ width: "30%" }}
                        id="line"
                        value={line}
                        defaultValue={0}
                        onChange={(e) => {
                            setLine(e.target.value);
                        }}
                        label="Dây chuyền"
                    >
                        <MenuItem disabled value={-1}>
                            <em>Dây chuyền: </em>
                        </MenuItem>
                        <MenuItem value={0}>Dây chuyền: All</MenuItem>
                        <MenuItem value={20}>Dây chuyền Hà Đông</MenuItem>
                        <MenuItem value={21}>Dây chuyền Đống Đa</MenuItem>
                        <MenuItem value={22}>Dây chuyền Đông Anh</MenuItem>
                        <MenuItem value={22}>Dây chuyền Long Biên</MenuItem>
                    </Select>
                </Box>

                <Grid container spacing={2} disableEqualOverflow>
                    <Grid container xs={12} md={6}>
                        <Grid xs={6} md={4}>
                            <Box
                                backgroundColor={themeTokens.primary[400]}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ height: 140 }}
                            >
                                <DataCard data="12,362" title="Khách hàng" />
                            </Box>
                        </Grid>

                        <Grid xs={6} md={4}>
                            <Box
                                backgroundColor={themeTokens.primary[400]}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ height: 140 }}
                            >
                                <DataCard data="27,362" title="Xe đăng kiểm" />
                            </Box>
                        </Grid>

                        <Grid xs={6} md={4}>
                            <Box
                                backgroundColor={themeTokens.primary[400]}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ height: 140 }}
                            >
                                <DataCard data="27,362" title="Av. Đăng kiểm" />
                            </Box>
                        </Grid>

                        <Grid xs={6} md={4}>
                            <Box
                                backgroundColor={themeTokens.primary[400]}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ height: 140 }}
                            >
                                <DataCard data="95%" title="Tỉ lệ thành công" />
                            </Box>
                        </Grid>

                        <Grid xs={6} md={4}>
                            <Box
                                backgroundColor={themeTokens.primary[400]}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ height: 140 }}
                            >
                                <DataCard data="15%" title="Tăng trưởng" />
                            </Box>
                        </Grid>

                        <Grid xs={6} md={4}>
                            <Box
                                backgroundColor={themeTokens.primary[400]}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ height: 140 }}
                            >
                                <DataCard data="+34%" title="Doanh thu" />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid height="40vh" xs={12} md={6}>
                        <ResponsiveBar
                            data={data}
                            keys={["value"]}
                            indexBy="month"
                            margin={{
                                top: 50,
                                right: 50,
                                bottom: 50,
                                left: 50,
                            }}
                            padding={0.3}
                            valueScale={{ type: "linear" }}
                            indexScale={{ type: "band", round: true }}
                            themeTokens={({ index }) => {
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
                    </Grid>
                </Grid>
            </Box>

            {/* Biểu đồ tròn */}
            <Box m="20px">
                <Header
                    title="Thống kê phân loại"
                    subtitle="Phân loại xe đã đăng kiểm theo mục đích sử dụng"
                />
                <Box height="75vh">
                    <PieChart />
                </Box>
            </Box>
        </Box>
    );
}

export default Statistics;
