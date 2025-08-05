import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getClassThunk = createAsyncThunk(
  'class/getClass',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3001/class`);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const ClasslistsSlice = createSlice({
  name: 'classList',
  initialState: {
    classlist: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.classlist = action.payload;
      })
      .addCase(getClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ClasslistsSlice.reducer;