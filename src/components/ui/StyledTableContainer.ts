import {styled} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    '&': {
        background: "#202124", height: "100vh"
    }
}));