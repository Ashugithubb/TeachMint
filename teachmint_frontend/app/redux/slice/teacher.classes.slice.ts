import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTeacherClassThunk = createAsyncThunk(
    'class/getTeacherClass',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:3001/teacher/class`);
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

const TeacherClassInfo = createSlice({
    name: 'classInfo',
    initialState: {
        teacherClassInfo: [],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTeacherClassThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTeacherClassThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.teacherClassInfo = action.payload;
            })
            .addCase(getTeacherClassThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default TeacherClassInfo.reducer;