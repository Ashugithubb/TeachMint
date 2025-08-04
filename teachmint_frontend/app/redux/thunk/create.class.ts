
import { classSchema } from '@/app/schema/create.class.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';

type classFormDate = z.infer<typeof classSchema>;

export const createClass = createAsyncThunk(
  'class/create',
  async (data:classFormDate, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/class',
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);
