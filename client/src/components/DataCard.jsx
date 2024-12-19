import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const DataCard = ({ data, title }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography
                        variant="h4"
                        sx={{ color: colors.greenAccent[500] }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100], paddingY: 2 }}
                    >
                        {data}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default DataCard;
