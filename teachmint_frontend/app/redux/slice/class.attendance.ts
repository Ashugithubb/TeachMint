import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface attendanceQuery {
    classId: number,
    subjectId: number
}
export const getClassAttendanceThunk = createAsyncThunk(
    'class/getClassAttendanceThunk',
    async (query: attendanceQuery , { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3001/attendance/`, {
                withCredentials: true,
                params: query,
            });
            console.log("res", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
        }
    }
);
const TeacherClassInfo = createSlice({
    name: 'classAttendance',
    initialState: {
        attendance: [],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClassAttendanceThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClassAttendanceThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.attendance = action.payload;
            })
            .addCase(getClassAttendanceThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default TeacherClassInfo.reducer;