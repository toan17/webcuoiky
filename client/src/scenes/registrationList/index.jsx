// import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { sampleRegistrationData } from "../../data/mockData";
import { tokens } from "../../theme";

const RegistrationList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "car", headerName: "Car", flex: 6 },
        {
            field: "customer",
            headerName: "Customer",
            flex: 6,
        },
        { field: "date", headerName: "Date", flex: 5 },
        { field: "amount", headerName: "Amount", flex: 5 },
        { field: "payment-mode", headerName: "Payment Mode", flex: 5 },
        { field: "status", headerName: "Status", flex: 6 },
        {
            field: "action",
            headerName: "Action",
            flex: 5,
            renderCell: (params) => (
                <Box>
                    <Button variant="contained" color="primary" size="small">
                        Edit
                    </Button>
                    <Button variant="contained" color="primary" size="small">
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    const rows = sampleRegistrationData;

    return (
        <Box m="20px">
            <Header title="Thống kê" subtitle="Số liệu đăng kiểm" />
            <Button
                variant="outlined"
                sx={{ marginBottom: 2, color: colors.grey[100] }}
            >
                + Add Customer
            </Button>
            <DataGrid
                rows={rows} // Dữ liệu hàng
                columns={columns} // Cấu trúc cột
                pageSize={5} // Số hàng mỗi trang
                rowsPerPageOptions={[5, 10, 20]} // Các tùy chọn số hàng mỗi trang
            />
        </Box>
    );
};

export default RegistrationList;
