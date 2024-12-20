import { Box, Button, Typography, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";

const AddRegistry = () => {
    const handleFormSubmit = (values) => {
        console.log("Form values:", values);
        toast.success("Cập nhật thành công");
    };

    return (
        <Box m="20px">
            <Header
                title="Thêm đăng kiểm mới"
                subtitle="Ghi nhận kết quả đăng kiểm mới cho trung tâm"
            />

            <Formik
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({ values, errors, touched, handleBlur, handleChange }) => (
                    <form>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateRows: "repeat(3, 1fr)",
                                gap: "10px",
                            }}
                        >
                            <Box gap="10px" display="grid" sx={{ mb: 3 }}>
                                <Typography
                                    variant="h3"
                                    color="#ffffff"
                                    fontWeight="700"
                                >
                                    Thông tin đăng kiểm
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Nơi đăng kiểm"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.centerName}
                                    name="centerName"
                                    error={
                                        !!touched.centerName &&
                                        !!errors.centerName
                                    }
                                    helperText={
                                        touched.centerName && errors.centerName
                                    }
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="Ngày đăng kiểm"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.startDate}
                                    name="startDate"
                                    error={
                                        !!touched.startDate &&
                                        !!errors.startDate
                                    }
                                    helperText={
                                        touched.startDate && errors.startDate
                                    }
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="Ngày hết hạn"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.endDate}
                                    name="endDate"
                                    error={
                                        !!touched.endDate && !!errors.endDate
                                    }
                                    helperText={
                                        touched.endDate && errors.endDate
                                    }
                                />
                            </Box>
                            <Box gap="10px" display="grid" sx={{ mb: 3 }}>
                                <Typography
                                    variant="h3"
                                    color="#ffffff"
                                    fontWeight="700"
                                >
                                    Thông tin ô tô
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Biển số xe"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.carID}
                                    name="carID"
                                    error={!!touched.carID && !!errors.carID}
                                    helperText={touched.carID && errors.carID}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Màu sắc"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.carColor}
                                    name="carColor"
                                    error={
                                        !!touched.carColor && !!errors.carColor
                                    }
                                    helperText={
                                        touched.carColor && errors.carColor
                                    }
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Mục đích sử dụng"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.carPurpose}
                                    name="carPurpose"
                                    error={
                                        !!touched.carPurpose &&
                                        !!errors.carPurpose
                                    }
                                    helperText={
                                        touched.carPurpose && errors.carPurpose
                                    }
                                />
                            </Box>
                            <Box gap="10px" display="grid" sx={{ mb: 3 }}>
                                <Typography
                                    variant="h3"
                                    color="#ffffff"
                                    fontWeight="700"
                                >
                                    Thông tin chủ xe
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Tên chủ xe"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.ownerName}
                                    name="ownerName"
                                    error={
                                        !!touched.ownerName &&
                                        !!errors.ownerName
                                    }
                                    helperText={
                                        touched.ownerName && errors.ownerName
                                    }
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Số căn cước"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.ownerID}
                                    name="ownerID"
                                    error={
                                        !!touched.ownerID && !!errors.ownerID
                                    }
                                    helperText={
                                        touched.ownerID && errors.ownerID
                                    }
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Số điện thoại"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.ownerPhone}
                                    name="ownerPhone"
                                    error={
                                        !!touched.ownerPhone &&
                                        !!errors.ownerPhone
                                    }
                                    helperText={
                                        touched.ownerPhone && errors.ownerPhone
                                    }
                                />
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button
                                onClick={handleFormSubmit}
                                type="submit"
                                color="secondary"
                                variant="contained"
                                size="large"
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    centerName: yup.string().required("Bắt buộc"),
    startDate: yup.date().required("Bắt buộc"),
    endDate: yup.date().required("Bắt buộc"),
    carID: yup.string().required("Bắt buộc"),
    carPurpose: yup.string().required("Bắt buộc"),
    carColor: yup.string().required("Bắt buộc"),
    ownerName: yup.string().required("Bắt buộc"),
    ownerID: yup.string().required("Bắt buộc"),
    ownerPhone: yup
        .string()
        .matches(phoneRegExp, "Số điện thoại không hợp lệ")
        .required("Bắt buộc"),
});
const initialValues = {
    centerName: "",
    startDate: "",
    endDate: "",
    carID: "",
    carPurpose: "",
    carColor: "",
    ownerName: "",
    ownerID: "",
    ownerPhone: "",
};
export default AddRegistry;
