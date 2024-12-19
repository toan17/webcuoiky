import Header from "../../components/Header";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PopUp from "../../components/PopUp";
import { ToastContainer } from 'react-toastify';
import { Box, Button, Typography, useTheme, Card, CardContent, CardMedia, Grid } from "@mui/material";
import Battery90OutlinedIcon from '@mui/icons-material/Battery90Outlined';
import BatteryAlertOutlinedIcon from '@mui/icons-material/BatteryAlertOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { tokens } from "../../theme";
const RegistryDetail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [registries, setRegistry] = useState([]);

    
    useEffect(() => {
        (async () => {
          const fetchData = await fetch(
             "https://6426461f556bad2a5b4cadb3.mockapi.io/registry"
          );
          const registries = await fetchData.json();
          setRegistry(registries);
        })();
        }, []);
    
    //Handle print
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'In giấy chứng nhận đăng kiểm',
    }) 
    


    //tim kiem theo id
    const { registryId } = useParams();
    const registry = registries.find((registry) => registry.id === registryId)
    const {id, car_id, area, center, end_date, status } = registry || {};

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Thông tin đăng kiểm" subtitle="Thông tin chi tiết của ô tô đã đăng kiểm" />
                <Box>     
                    <PopUp/>   
                    <ToastContainer theme='colored' position='top-center'></ToastContainer>      
                </Box>
            </Box>
        
            {/* Registry Info*/}
            
            
            <Card sx={{ borderRadius: '15px', backgroundColor: colors.primary[400] }} >
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} >
                    <CardMedia
                        component="img"
                        alt="car"
                        image="https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.jpg?b=1&s=170667a&w=0&k=20&c=m2g-wU5m2tbqC7C_nWAgu7txHzeEnXKSFuby01V4dtI="
                        sx={{ maxWidth: '100%', height: 500 }}
                    />
                </Grid>
                <Grid item xs={12} md={4} >
                    <CardContent sx={{ height: 500, backgroundColor: colors.primary[400]}}>
                        <Typography gutterBottom variant="h3" component="div"  color={colors.grey[100]}
                            fontWeight="bold"
                            sx={{ p: 2}}>
                        Mercedes-Benz s450
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}}>
                            Biển số xe: {car_id}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}}>
                            Mã đăng kiểm: {id}
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}}>
                            Mục đích sử dụng: Xe con - xe cá nhân
                        </Typography>
                        <div className="color" style={{ display: 'flex' , paddingBottom: '10px'}}>
                            <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}}>
                                Màu sắc : 
                            </Typography>
                            <div style={{ display:'inline-block', borderRadius: '50%', backgroundColor: 'white', width: '50px', height:'50px', marginLeft: '5px'}}></div>
                        </div>
                        <div className="color" style={{ display: 'flex'}}>
                            <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}}>
                                Trạng thái :
                            </Typography>
                            <Button variant="contained" 
                            startIcon={ status === "normal" ? <Battery90OutlinedIcon /> : <BatteryAlertOutlinedIcon/>} 
                            style={{color: "#ffffff", marginLeft: '5px', borderRadius:'10px' }}
                            color={ status === "normal" ? "success" : "error"}
                            >
                                {status}
                            </Button>
                        </div>
                        <Box sx={{ p: 2}}>
                            <Button
                                onClick={handlePrint}
                                sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "12px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                }}
                            >
                                <PrintOutlinedIcon sx={{ mr: "10px" }} />
                                In giấy chứng nhận 
                            </Button>
                        </Box>
        
                
                    </CardContent>
                </Grid>
            </Grid>
            </Card>
            
            
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                align="center"
                sx={{ m: "25px 0 45px 0" }}
            >
                Thông tin chi tiết
            </Typography>

            

            <Box sx={{ backgroundColor: colors.primary[400], borderRadius: '15px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} >
                        <Box>
                        <Typography
                            variant="h3"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            align="center"
                            sx={{ p:2 }}
                        >
                            Thông tin chủ xe
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            Họ và tên : Nguyễn Văn A
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            CMMD: 001209083738
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            Số điện thoại: 0987654321
                        </Typography>
                
                        </Box>
                        
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                        <Typography
                            variant="h3"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            align="center"
                            sx={{ p:2 }}
                        >
                            Thông tin đăng kiểm
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            Nơi đăng kiểm : Trung tâm Hà Nội 1
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            Ngày đăng kiểm : 15/04/2023
                        </Typography>
                        <Typography variant="h5" color={colors.grey[100]} sx={{ p: 2}} align="center">
                            Ngày hết hạn : 15/09/2024
                        </Typography>
                        </Box>
                    </Grid>
                    
                </Grid>
                
            </Box> 
            {/* Printing document */}
            <Box sx={{display:'none'}}>
                <Box ref={componentRef}>
                <Typography
                    variant="h1"
                    color="black"
                    fontWeight="bold"
                    align="center"
                    textTransform={"uppercase"}
                    sx={{ m: "25px 0 45px 0" }}
                >
                    Giấy chứng nhận đăng kiểm
                </Typography>

                <Typography
                    variant="h2"
                    color="black"
                    fontWeight="bold"
                    textTransform={"uppercase"}
                    align="center"
                    sx={{ p:2 }}
                >
                    Thông tin đăng kiểm
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Tên chủ xe:  
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Dòng xe:  
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Biển số: 
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Mã đăng kiểm:
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Nơi đăng kiểm:  
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Ngày đăng kiểm:  
                </Typography>
                <Typography variant="h3" color="black" sx={{ mb: 2, ml: 5}}>
                    Ngày hết hạn:  
                </Typography>
                <Grid container sx={{ mt: 5}}>
                    <Grid item xs={6} md={6}>
                        <Typography variant="h3" color="black" align="center" >
                            Chữ ký chủ xe  
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Typography variant="h3" color="black" align="center">
                            Xác nhận của nơi đăng kiểm  
                        </Typography>
                    </Grid>
                </Grid>
                </Box>   
            </Box>
            
            
        </Box>
           
    );
};

export default RegistryDetail;