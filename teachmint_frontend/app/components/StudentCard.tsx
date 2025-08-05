
import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box,
    Button,
} from '@mui/material';

interface StudentCardProps {
    id: number,
    name: string;
    email: string;
}
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
const StudentCard: React.FC<StudentCardProps> = ({ id, name, email }) => {
    return (

        <>
    <Box sx={{ border: "2px solid skyblue",width:"190px"}}>
            <Typography  >
                {id}
            </Typography>
            <Typography >
                {name}
            </Typography>

            <Typography >
                {email}
            </Typography>

</Box>

        </>

    );
};

export default StudentCard;