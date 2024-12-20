import React, { useState } from "react";
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector, GridToolbarColumnsButton } from "@mui/x-data-grid";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../../components/Header";
import { tokens } from "../../theme";

const initialValues = {
    centerName: "",
    address: "",
    phoneNumber: "",
    email: ""
};

const validationSchema = yup.object({
    centerName: yup.string().required("Required"),
    address: yup.string().required("Required"),
    phoneNumber: yup.string().required("Required"),
    email: yup.string().email("Invalid email format").required("Required")
});

const initialCenters = [
    { id: 1, centerName: "Trung tâm đăng kiểm A", address: "123 Đường A, Quận 1, TP.HCM", phoneNumber: "0123456789", email: "a@example.com" },
    { id: 2, centerName: "Trung tâm đăng kiểm B", address: "456 Đường B, Quận 2, TP.HCM", phoneNumber: "0987654321", email: "b@example.com" },
    { id: 3, centerName: "Trung tâm đăng kiểm C", address: "789 Đường C, Quận 3, TP.HCM", phoneNumber: "0123456780", email: "c@example.com" },
    { id: 4, centerName: "Trung tâm đăng kiểm D", address: "101 Đường D, Quận 4, TP.HCM", phoneNumber: "0987654320", email: "d@example.com" },
    { id: 5, centerName: "Trung tâm đăng kiểm E", address: "112 Đường E, Quận 5, TP.HCM", phoneNumber: "0123456781", email: "e@example.com" },
    { id: 6, centerName: "Trung tâm đăng kiểm F", address: "131 Đường F, Quận 6, TP.HCM", phoneNumber: "0987654322", email: "f@example.com" },
    { id: 7, centerName: "Trung tâm đăng kiểm G", address: "415 Đường G, Quận 7, TP.HCM", phoneNumber: "0123456782", email: "g@example.com" },
    { id: 8, centerName: "Trung tâm đăng kiểm H", address: "161 Đường H, Quận 8, TP.HCM", phoneNumber: "0987654323", email: "h@example.com" }
];

const RegistryCenterManagement = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [centers, setCenters] = useState(initialCenters);
    const [open, setOpen] = useState(false);
    const [editCenter, setEditCenter] = useState(null);
    const [deleteCenter, setDeleteCenter] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pageSize, setPageSize] = useState(10);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditCenter(null);
    };

    const handleConfirmOpen = (center) => {
        setDeleteCenter(center);
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
        setDeleteCenter(null);
    };

    const handleFormSubmit = (values) => {
        if (editCenter) {
            setCenters(centers.map(center => center.id === editCenter.id ? { ...center, ...values } : center));
            toast.success("Cập nhật trung tâm đăng kiểm thành công");
        } else {
            setCenters([...centers, { id: centers.length + 1, ...values }]);
            toast.success("Thêm trung tâm đăng kiểm thành công");
        }
        handleClose();
    };

    const handleEdit = (center) => {
        setEditCenter(center);
        handleOpen();
    };

    const handleDelete = () => {
        setCenters(centers.filter(center => center.id !== deleteCenter.id));
        toast.success("Xóa trung tâm đăng kiểm thành công");
        handleConfirmClose();
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "centerName", headerName: "Tên trung tâm", flex: 2 },
        { field: "address", headerName: "Địa chỉ", flex: 3 },
        { field: "phoneNumber", headerName: "Số điện thoại", flex: 2 },
        { field: "email", headerName: "Email", flex: 2 },
        {
            field: "actions",
            headerName: "Hành động",
            flex: 2,
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
                    >
                        Xóa
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
            <Header title="Quản lý trung tâm đăng kiểm" subtitle="Danh sách trung tâm đăng kiểm" />
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>Thêm trung tâm</Button>
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
                    rows={centers}
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
                <DialogTitle>{editCenter ? "Sửa trung tâm đăng kiểm" : "Thêm trung tâm đăng kiểm"}</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={editCenter || initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="centerName"
                                    label="Tên trung tâm"
                                    fullWidth
                                    margin="normal"
                                    error={touched.centerName && !!errors.centerName}
                                    helperText={touched.centerName && errors.centerName}
                                />
                                <Field
                                    as={TextField}
                                    name="address"
                                    label="Địa chỉ"
                                    fullWidth
                                    margin="normal"
                                    error={touched.address && !!errors.address}
                                    helperText={touched.address && errors.address}
                                />
                                <Field
                                    as={TextField}
                                    name="phoneNumber"
                                    label="Số điện thoại"
                                    fullWidth
                                    margin="normal"
                                    error={touched.phoneNumber && !!errors.phoneNumber}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                />
                                <Field
                                    as={TextField}
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    error={touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose} color="secondary">Hủy</Button>
                                    <Button type="submit" sx={{ backgroundColor: 'green', color: 'white' }}>{editCenter ? "Cập nhật" : "Thêm"}</Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa trung tâm đăng kiểm này?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="secondary">Hủy</Button>
                    <Button onClick={handleDelete} color="primary">Xóa</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RegistryCenterManagement;