import React, { useState } from "react";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const initialValues = {
    username: "",
    email: "",
    role: ""
};

const validationSchema = yup.object({
    username: yup.string().required("Required"),
    email: yup.string().email("Invalid email format").required("Required"),
    role: yup.string().required("Required")
});

const AccountManagement = () => {
    const [accounts, setAccounts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editAccount, setEditAccount] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditAccount(null);
    };

    const handleFormSubmit = (values) => {
        if (editAccount) {
            setAccounts(accounts.map(acc => acc.id === editAccount.id ? { ...acc, ...values } : acc));
            toast.success("Cập nhật tài khoản thành công");
        } else {
            setAccounts([...accounts, { id: accounts.length + 1, ...values }]);
            toast.success("Thêm tài khoản thành công");
        }
        handleClose();
    };

    const handleEdit = (account) => {
        setEditAccount(account);
        handleOpen();
    };

    const handleDelete = (id) => {
        setAccounts(accounts.filter(acc => acc.id !== id));
        toast.success("Xóa tài khoản thành công");
    };

    return (
        <Box m="20px">
            <Typography variant="h4">Quản lý tài khoản</Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>Thêm tài khoản</Button>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên tài khoản</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Vai trò</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell>{account.id}</TableCell>
                                <TableCell>{account.username}</TableCell>
                                <TableCell>{account.email}</TableCell>
                                <TableCell>{account.role}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(account)}>Sửa</Button>
                                    <Button onClick={() => handleDelete(account.id)}>Xóa</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editAccount ? "Sửa tài khoản" : "Thêm tài khoản"}</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={editAccount || initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="username"
                                    label="Tên tài khoản"
                                    fullWidth
                                    margin="normal"
                                    error={touched.username && !!errors.username}
                                    helperText={touched.username && errors.username}
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
                                <Field
                                    as={TextField}
                                    name="role"
                                    label="Vai trò"
                                    fullWidth
                                    margin="normal"
                                    error={touched.role && !!errors.role}
                                    helperText={touched.role && errors.role}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose} color="secondary">Hủy</Button>
                                    <Button type="submit" color="primary">{editAccount ? "Cập nhật" : "Thêm"}</Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AccountManagement;