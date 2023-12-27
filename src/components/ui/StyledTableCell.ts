import {styled, tableCellClasses} from "@mui/material";
import TableCell from "@mui/material/TableCell";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor:  "#202124",
        color: "#A1A1AA",
        // font-family: Roboto;
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '18px',
        letterSpacing: '0.10000000149011612px',
        textAlign: 'left',
        minWidth: '110px'

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '0 0 0 12px'
    },
}));