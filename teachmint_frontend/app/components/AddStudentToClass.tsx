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
import { StudentAddSchema } from '../schema/add.student.schema';
import { AddStudentToClass } from '../redux/thunk/add.StudentT0Class';

type ClassStudentFormData = z.infer<typeof StudentAddSchema>;

export default function AddStudentComponent() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClassStudentFormData>({
        resolver: zodResolver(StudentAddSchema),
    });

    const onSubmit = async (data: ClassStudentFormData) => {
        const res = await dispatch(AddStudentToClass(data));
        if (res.meta.requestStatus === 'fulfilled') {
            toast.success("Student added successfully!");
        } else {
            toast.error(res.payload || "Failed to add student");
        }
    };


    return (
        <>
            <ToastContainer />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor="#f5f5f5"
            >
                <Paper elevation={3} sx={{ padding: 4, width: 450 }}>
                    <Typography variant="h5" gutterBottom>
                        Enter StudentId and ClassId
                    </Typography>


                    <form onSubmit={handleSubmit(onSubmit)} noValidate>

                        <TextField
                            label="Enter ClassId"
                            type="number"
                            {...register('classId', { valueAsNumber: true })}
                            error={!!errors.classId}
                            helperText={errors.classId?.message}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Enter StudentId"
                            type="number"
                            {...register('studentId', { valueAsNumber: true })}
                            error={!!errors.studentId}
                            helperText={errors.studentId?.message}
                            fullWidth
                            margin="normal"
                        />


                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Add Student
                        </Button>
                    </form>
                </Paper>
            </Box>
        </>
    );
}