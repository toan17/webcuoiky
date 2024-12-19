import {
    Typography,
    Box,
    useTheme,
    Select,
    MenuItem,
    Button,
    IconButton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";
import { useState } from "react";
import { mockRegistry } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DataCard from "../../components/DataCard";

function Statistics() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
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
                        <MenuItem value={0}>All time</MenuItem>
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
                            sx: { color: colors.grey[800] },
                        }}
                    >
                        <MenuItem disabled value="">
                            <em>Trung tâm: </em>
                        </MenuItem>
                        <MenuItem value={"all"}>All</MenuItem>
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
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                    </Select>
                </Box>

                <Grid container spacing={2} disableEqualOverflow>
                    <Grid container xs={12} md={6}>
                        <Grid xs={6} md={4}>
                            <Box
                                backgroundColor={colors.primary[400]}
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
                                backgroundColor={colors.primary[400]}
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
                                backgroundColor={colors.primary[400]}
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
                                backgroundColor={colors.primary[400]}
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
                                backgroundColor={colors.primary[400]}
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
                                backgroundColor={colors.primary[400]}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ height: 140 }}
                            >
                                <DataCard data="+34%" title="Doanh thu" />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <Box
                            backgroundColor={colors.primary[400]}
                            overflow="auto"
                            sx={{ height: "300px" }}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid ${colors.primary[500]}`}
                                colors={colors.grey[100]}
                                p="15px"
                            >
                                <Typography
                                    color={colors.grey[100]}
                                    variant="h5"
                                    fontWeight="600"
                                >
                                    Đăng kiểm gần đây
                                </Typography>
                            </Box>
                            {mockRegistry.map((registry, i) => (
                                <Box
                                    key={`${registry.ID}-${i}`}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    borderBottom={`4px solid ${colors.primary[500]}`}
                                    p="15px"
                                >
                                    <Box>
                                        <Typography
                                            color={colors.greenAccent[500]}
                                            variant="h5"
                                            fontWeight="600"
                                        >
                                            {registry.ID}
                                        </Typography>
                                    </Box>
                                    <Box color={colors.grey[100]}>
                                        {registry.center}
                                    </Box>
                                    <Box color={colors.grey[100]}>
                                        {registry.date}
                                    </Box>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        p="5px 10px"
                                        borderradius="4px"
                                        type="submit"
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    <Grid xs={12} md={12}>
                        <Box
                            p="0 30px"
                            backgroundColor={colors.primary[400]}
                            display="flex "
                            justifyContent="space-between"
                            alignItems="center"
                            height="50px"
                        >
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.greenAccent[500]}
                            >
                                Biểu đồ thống kê và dự báo lượng xe đăng kiểm
                                của trung tâm
                            </Typography>

                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{
                                        fontSize: "26px",
                                        color: colors.greenAccent[500],
                                    }}
                                />
                            </IconButton>
                        </Box>
                        <Box
                            height="250px"
                            m="-20px 0 0 0"
                            backgroundColor={colors.primary[400]}
                        >
                            <LineChart isDashboard={true} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Statistics;
