import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Student {
    id: number;
    name: string;
    email: string;
}

interface StudentsState {
    student: Student[];
    total: number;
    page: number;
    limit: number;
    loading: boolean;
    error: string | null;
}

const initialState: StudentsState = {
    student: [],
    total: 0,
    page: 1,
    limit: 0,
    loading: false,
    error: null,
};

export interface GetStudentQuery {
    page?: number;
    limit?: number;
    searchValue?: string
    id?: number;

}

export const getAllStudentThunk = createAsyncThunk(
    'student/getFilteredstudents',
    async (query: GetStudentQuery = {}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3001/student`, {
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

const studentSlice = createSlice({
    name: 'allStudents',
    initialState,
    reducers: {
        clearStudents: (state) => {
            state.student = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllStudentThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllStudentThunk.fulfilled, (state, action: PayloadAction<StudentsState>) => {
                state.loading = false;
                console.log("addCase", action.payload);
                state.student = action.payload.student || [];
                state.total = action.payload.total || 0;
                state.page = action.payload.page || 1;
                state.limit = action.payload.limit || 0;
            })
            .addCase(getAllStudentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearStudents } = studentSlice.actions;

export default studentSlice.reducer;