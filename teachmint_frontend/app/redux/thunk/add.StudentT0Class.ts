import { StudentAddSchema } from '@/app/schema/add.student.schema';
import { classSchema } from '@/app/schema/create.class.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import z from 'zod';

type classStudentFormData = z.infer<typeof StudentAddSchema>;

export const AddStudentToClass = createAsyncThunk(
    'add/student/class',
    async (data: classStudentFormData, thunkAPI) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/class/student',
                data,
                { withCredentials: true }
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Something went wrong'
            );
        }
    }
);


