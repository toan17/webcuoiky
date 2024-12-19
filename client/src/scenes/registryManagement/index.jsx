import {Box, Typography, useTheme } from "@mui/material";
import Confirm from "../../components/Confirm";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import Grid from '@mui/material/Unstable_Grid2';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useState, useEffect } from "react";
const RegistryManagement = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [open, setOpen] = useState(false);
   const [data, setData] = useState([]);
   const handleClickOpen = () => {
    setOpen(true);
  };

    const handleClose = () => {
        setOpen(false);
    };

   useEffect(() => {
    (async () => {
      const fetchData = await fetch(
         "https://6426461f556bad2a5b4cadb3.mockapi.io/registry"
      );
      const data = await fetchData.json();
      setData(data);
    })();
    }, []);
    console.log(data);

   const columns = [
    { field: "id", 
      headerName: "Mã số kiểm định",
      renderCell: ({row : {id}}) => (
        <Link style={{ textDecoration: 'none', color: colors.grey[100] }} 
        to={`/registryManagement/${id}`}>{id}</Link>
      ),
     },
    {
      field: "car_id",
      headerName: "Biển số xe",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "area",
      headerName: "Khu vực",
      headerAlign: "left",
      align: "left",
    },
    
    {
      field: "center",
      headerName: "Trung tâm đăng kiểm",
      flex: 1,
    },
    {
      field: "end_date",
      headerName: "Ngày hết hạn",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          
          <Typography color={status === "normal" ? colors.greenAccent[400]: '#fff207'}>{status}</Typography>
        );
      },
    },
    {
      field: "Hành động",
      flex: 1,
      renderCell: () => {
        return (
          <Confirm />  
        );
      },
    },
  ];
  
   return (
    <Box m="20px">
        <Header title="Quản lý đăng kiểm" subtitle="Quản lý danh sách xe đã đăng kiểm của trung tâm" />

        {/* Static */}
        <Grid container spacing={2} >
            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}>
                <StatBox
                    stat="12,362"
                    title="Tháng 3"
                    subtitle="Xe đăng kiểm mới"
                    progress="0.14"
                    increase="+14%"
                />
                </Box>
            </Grid>

            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}
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

            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}
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

            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}
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

        {/* Table List */}

        <Box
        m="40px 0 0 0"
        height="75vh"
        width="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
        >
            <DataGrid
            rows={data}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            />
        </Box>

    </Box>
        
    
   );
};

export default RegistryManagement;