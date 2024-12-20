import React, { useState } from "react";
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector, GridToolbarColumnsButton } from "@mui/x-data-grid";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import Header from "../../components/Header";
import { tokens } from "../../theme";

const initialValues = {
    licensePlate: "",
    registryNumber: "",
    owner: "",
    registryDate: "",
    status: "",
    expiryDate: "",
    color: "",
    usage: "",
    phoneNumber: ""
};

const validationSchema = yup.object({
    licensePlate: yup.string().required("Required"),
    registryNumber: yup.string().required("Required"),
    owner: yup.string().required("Required"),
    registryDate: yup.date().required("Required"),
    status: yup.string().required("Required"),
    expiryDate: yup.date().required("Required"),
    color: yup.string().required("Required"),
    usage: yup.string().required("Required"),
    phoneNumber: yup.string().required("Required")
});

const calculateStatus = (expiryDate) => {
    const today = new Date("2024-12-20");
    const expiry = new Date(expiryDate);
    const diffTime = Math.abs(expiry - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (expiry < today) {
        return "Hết hạn";
    } else if (diffDays <= 60) {
        return "Sắp hết hạn";
    } else {
        return "Còn hạn";
    }
};

const initialVehicles = [
    { id: 1, licensePlate: "ABC123", registryNumber: "RN123", owner: "John Doe", registryDate: "2024-01-01", expiryDate: "2024-12-01", color: "Red", usage: "Personal", phoneNumber: "123456789" },
    { id: 2, licensePlate: "XYZ789", registryNumber: "RN456", owner: "Jane Smith", registryDate: "2024-06-15", expiryDate: "2024-11-15", color: "Blue", usage: "Commercial", phoneNumber: "987654321" },
    { id: 3, licensePlate: "DEF456", registryNumber: "RN789", owner: "Alice Johnson", registryDate: "2024-03-10", expiryDate: "2024-10-10", color: "Green", usage: "Personal", phoneNumber: "555555555" },
    { id: 4, licensePlate: "GHI012", registryNumber: "RN012", owner: "Bob Brown", registryDate: "2024-07-20", expiryDate: "2025-01-20", color: "Yellow", usage: "Commercial", phoneNumber: "444444444" },
    { id: 5, licensePlate: "JKL345", registryNumber: "RN345", owner: "Charlie Davis", registryDate: "2024-09-05", expiryDate: "2025-03-05", color: "Black", usage: "Personal", phoneNumber: "333333333" },
    { id: 6, licensePlate: "MNO678", registryNumber: "RN678", owner: "Diana Evans", registryDate: "2024-11-25", expiryDate: "2025-05-25", color: "White", usage: "Commercial", phoneNumber: "222222222" },
    { id: 7, licensePlate: "PQR901", registryNumber: "RN901", owner: "Eve Foster", registryDate: "2024-02-14", expiryDate: "2024-12-14", color: "Purple", usage: "Personal", phoneNumber: "111111111" },
    { id: 8, licensePlate: "STU234", registryNumber: "RN234", owner: "Frank Green", registryDate: "2024-04-18", expiryDate: "2024-11-18", color: "Orange", usage: "Commercial", phoneNumber: "666666666" }
].map(vehicle => ({ ...vehicle, status: calculateStatus(vehicle.expiryDate) }));

const VehicleManagement = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [vehicles, setVehicles] = useState(initialVehicles);
    const [open, setOpen] = useState(false);
    const [editVehicle, setEditVehicle] = useState(null);
    const [deleteVehicle, setDeleteVehicle] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailVehicle, setDetailVehicle] = useState(null);
    const [pageSize, setPageSize] = useState(10);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditVehicle(null);
    };

    const handleConfirmOpen = (vehicle) => {
        setDeleteVehicle(vehicle);
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
        setDeleteVehicle(null);
    };

    const handleDetailOpen = (vehicle) => {
        setDetailVehicle(vehicle);
        setDetailOpen(true);
    };

    const handleDetailClose = () => {
        setDetailOpen(false);
        setDetailVehicle(null);
    };

    const handleFormSubmit = (values) => {
        values.status = calculateStatus(values.expiryDate);
        if (editVehicle) {
            setVehicles(vehicles.map(veh => veh.id === editVehicle.id ? { ...veh, ...values } : veh));
            toast.success("Cập nhật phương tiện thành công");
        } else {
            setVehicles([...vehicles, { id: vehicles.length + 1, ...values }]);
            toast.success("Thêm phương tiện thành công");
        }
        handleClose();
    };

    const handleEdit = (vehicle) => {
        setEditVehicle(vehicle);
        handleOpen();
    };

    const handleDelete = () => {
        setVehicles(vehicles.filter(veh => veh.id !== deleteVehicle.id));
        toast.success("Xóa phương tiện thành công");
        handleConfirmClose();
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "licensePlate", headerName: "Biển số xe", flex: 2 },
        { field: "registryNumber", headerName: "Mã số đăng kiểm", flex: 2 },
        { field: "owner", headerName: "Chủ xe", flex: 2 },
        { field: "registryDate", headerName: "Ngày đăng kiểm", flex: 2 },
        { 
            field: "status", 
            headerName: "Trạng thái", 
            flex: 2,
            renderCell: (params) => {
                let color;
                switch (params.value) {
                    case "Còn hạn":
                        color = "green";
                        break;
                    case "Hết hạn":
                        color = "red";
                        break;
                    case "Sắp hết hạn":
                        color = "yellow";
                        break;
                    default:
                        color = "black";
                }
                return (
                    <Typography style={{ color }}>
                        {params.value}
                    </Typography>
                );
            }
        },
        {
            field: "actions",
            headerName: "Hành động",
            flex: 3,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(params.row)}
                        sx={{ mr: 1 }}
                    >
                        Sửa
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleConfirmOpen(params.row)}
                        sx={{ mr: 1 }}
                    >
                        Xóa
                    </Button>
                    <Button
                        variant="contained"
                        color="info"
                        size="small"
                        startIcon={<InfoIcon />}
                        onClick={() => handleDetailOpen(params.row)}
                    >
                        Xem chi tiết
                    </Button>
                </strong>
            ),
        },
    ];

    const CustomToolbar = () => (
        <GridToolbarContainer sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
            <GridToolbarColumnsButton sx={{ color: colors.grey[100] }} />
            <GridToolbarDensitySelector sx={{ color: colors.grey[100] }} />
            <GridToolbarExport sx={{ color: colors.grey[100] }} />
        </GridToolbarContainer>
    );

    return (
        <Box m="20px">
            <Header title="Quản lý phương tiện" subtitle="Danh sách phương tiện" />
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>Thêm phương tiện</Button>
            <Box
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
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
                }}
            >
                <DataGrid
                    rows={vehicles}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10, 50, 100]}
                    pagination
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editVehicle ? "Sửa phương tiện" : "Thêm phương tiện"}</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={editVehicle || initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="licensePlate"
                                    label="Biển số xe"
                                    fullWidth
                                    margin="normal"
                                    error={touched.licensePlate && !!errors.licensePlate}
                                    helperText={touched.licensePlate && errors.licensePlate}
                                />
                                <Field
                                    as={TextField}
                                    name="registryNumber"
                                    label="Mã số đăng kiểm"
                                    fullWidth
                                    margin="normal"
                                    error={touched.registryNumber && !!errors.registryNumber}
                                    helperText={touched.registryNumber && errors.registryNumber}
                                />
                                <Field
                                    as={TextField}
                                    name="owner"
                                    label="Chủ xe"
                                    fullWidth
                                    margin="normal"
                                    error={touched.owner && !!errors.owner}
                                    helperText={touched.owner && errors.owner}
                                />
                                <Field
                                    as={TextField}
                                    name="registryDate"
                                    label="Ngày đăng kiểm"
                                    fullWidth
                                    margin="normal"
                                    error={touched.registryDate && !!errors.registryDate}
                                    helperText={touched.registryDate && errors.registryDate}
                                />
                                <Field
                                    as={TextField}
                                    name="status"
                                    label="Trạng thái"
                                    fullWidth
                                    margin="normal"
                                    error={touched.status && !!errors.status}
                                    helperText={touched.status && errors.status}
                                />
                                <Field
                                    as={TextField}
                                    name="expiryDate"
                                    label="Ngày hết hạn"
                                    fullWidth
                                    margin="normal"
                                    error={touched.expiryDate && !!errors.expiryDate}
                                    helperText={touched.expiryDate && errors.expiryDate}
                                />
                                <Field
                                    as={TextField}
                                    name="color"
                                    label="Màu sắc"
                                    fullWidth
                                    margin="normal"
                                    error={touched.color && !!errors.color}
                                    helperText={touched.color && errors.color}
                                />
                                <Field
                                    as={TextField}
                                    name="usage"
                                    label="Mục đích sử dụng"
                                    fullWidth
                                    margin="normal"
                                    error={touched.usage && !!errors.usage}
                                    helperText={touched.usage && errors.usage}
                                />
                                <Field
                                    as={TextField}
                                    name="phoneNumber"
                                    label="Số điện thoại chủ xe"
                                    fullWidth
                                    margin="normal"
                                    error={touched.phoneNumber && !!errors.phoneNumber}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose} color="secondary">Hủy</Button>
                                    <Button type="submit" sx={{ backgroundColor: 'green', color: 'white' }}>{editVehicle ? "Cập nhật" : "Thêm"}</Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa phương tiện này?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="secondary">Hủy</Button>
                    <Button onClick={handleDelete} color="primary">Xóa</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={detailOpen} onClose={handleDetailClose}>
                <DialogTitle>Thông tin chi tiết phương tiện</DialogTitle>
                <DialogContent>
                    {detailVehicle && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Thông tin</TableCell>
                                        <TableCell>Chi tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>{detailVehicle.id}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Biển số xe</TableCell>
                                        <TableCell>{detailVehicle.licensePlate}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Mã số đăng kiểm</TableCell>
                                        <TableCell>{detailVehicle.registryNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Chủ xe</TableCell>
                                        <TableCell>{detailVehicle.owner}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Ngày đăng kiểm</TableCell>
                                        <TableCell>{detailVehicle.registryDate}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Trạng thái</TableCell>
                                        <TableCell>{detailVehicle.status}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Ngày hết hạn</TableCell>
                                        <TableCell>{detailVehicle.expiryDate}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Màu sắc</TableCell>
                                        <TableCell>{detailVehicle.color}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Mục đích sử dụng</TableCell>
                                        <TableCell>{detailVehicle.usage}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Số điện thoại chủ xe</TableCell>
                                        <TableCell>{detailVehicle.phoneNumber}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDetailClose} sx={{ backgroundColor: 'blue', color: 'white' }}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default VehicleManagement;