import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import { mockRegistry } from "../../data/mockData";
import Header from "../../components/Header";
import Grid from "@mui/material/Unstable_Grid2";
import StatBox from "../../components/StatBox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "../../components/LineChart";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Header title="Trang chủ" subtitle="Xin chào admin" />

            {/* Static */}
            <Grid container spacing={2} disableEqualOverflow>
                <Grid container xs={12} md={6}>
                    <Grid xs={6} md={6}>
                        <Box
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ height: 140 }}
                        >
                            <StatBox
                                stat="12,362"
                                title="Tháng 3"
                                subtitle="Xe đăng kiểm mới"
                                progress="0.14"
                                increase="+14%"
                            />
                        </Box>
                    </Grid>

                    <Grid xs={6} md={6}>
                        <Box
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ height: 140 }}
                        >
                            <StatBox
                                stat="27,362"
                                title="Quý 1"
                                subtitle="Xe đăng kiểm mới"
                                progress="0.35"
                                increase="+35%"
                            />
                        </Box>
                    </Grid>

                    <Grid xs={6} md={6}>
                        <Box
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ height: 140 }}
                        >
                            <StatBox
                                stat="27,362"
                                title="Năm 2023"
                                subtitle="Xe đăng kiểm mới"
                                progress="0.35"
                                increase="+35%"
                            />
                        </Box>
                    </Grid>

                    <Grid xs={6} md={6}>
                        <Box
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ height: 140 }}
                        >
                            <StatBox
                                stat="1,362"
                                title="Thống kê"
                                subtitle="Xe sắp hết hạn đăng kiểm"
                                progress="0.05"
                                increase="5%"
                            />
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
                            Biểu đồ thống kê và dự báo lượng xe đăng kiểm của
                            trung tâm
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
    );
};

export default Dashboard;
