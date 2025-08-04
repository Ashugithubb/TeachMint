'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Button,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Link as MuiLink,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';

import { useAppDispatch } from '@/app/redux/hook/hook';
import { signupUser } from '@/app/redux/thunk/signup.user';
import { classSchema } from '../schema/create.class.schema';
import { createClass } from '../redux/thunk/create.class';

type classFormData = z.infer<typeof classSchema>;

export default function CreateClassForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<classFormData>({
        resolver: zodResolver(classSchema),
        defaultValues: {
            name: '',
            description: '',
            acadmicYear: '',
        },
    });

    const onSubmit = async (data: classFormData) => {
        try {
            console.log("hanji");
            dispatch(createClass(data));
            toast.success("Class Created successfully!");
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { message } = error.response.data;
                toast.error(message);
            } else {
                toast.error("Something went wrong");
            }
            console.log(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
            >
                <Paper elevation={3} sx={{ padding: 4, width: 450 }}>
                    <Typography variant="h5" gutterBottom>
                        Crete a New Class
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <TextField
                            label="First Name"
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Class Description"
                            {...register('description')}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            fullWidth
                            margin="normal"
                        />
                         <TextField
                           label="Give Academic Year"
                            {...register('acadmicYear')}
                            error={!!errors.acadmicYear}
                            helperText={errors.acadmicYear?.message}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Create Class
                        </Button>

                    </form>
                </Paper>
            </Box>
        </>
    );
}