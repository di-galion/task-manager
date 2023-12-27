import {styled} from "@mui/material";
import TableRow from "@mui/material/TableRow";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&': {
        backgroundColor: "#202124",

        '.css-1bfj3mu-MuiTableCell-root': {
            padding: 11.25
        },

        th: {
            border: 'none',
            borderBottom: '1px solid #414144',
            height: '41px',
            color: '#FFFFFF',
            // fontFamily: Roboto,
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '18px',
            letterSpacing: '0.10000000149011612px',
            textAlign: 'left',
        },
        td: {
            border: 'none',
            borderBottom: "1px solid #414144",
            height: '41px',
            color: '#FFFFFF',
            // fontFamily: Roboto,
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '18px',
            letterSpacing: '0.10000000149011612px',
            textAlign: 'left',
        }
    },
}));
