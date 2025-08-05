/*
##  1. Setup: Redux Slice with Thunk

###  `dataSlice.ts` (Redux Toolkit)

```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTableData = createAsyncThunk('data/fetch', async () => {
  const res = await axios.get('http://localhost:3000/api/employees'); // your backend
  return res.data; // should return array of objects
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    rows: [],
    columns: [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'rating', headerName: 'Rating', width: 100 },
      { field: 'country', headerName: 'Country', width: 120 },
      { field: 'dateCreated', headerName: 'Date Created', width: 150 },
      { field: 'isAdmin', headerName: 'Admin', width: 100 },
    ],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.rows = action.payload;
        state.loading = false;
      })
      .addCase(fetchTableData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dataSlice.reducer;
```

---

##  2. Add it to Store

###  `store.ts`

```ts
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Wrap your app in `<Provider store={store}>` in `main.tsx` or `index.tsx`.

---

##  3. Update the Component

###  `BasicExampleDataGrid.tsx`

```tsx
import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTableData } from '../store/dataSlice'; // update path
import { RootState } from '../store/store'; // your root state

export default function BasicExampleDataGrid() {
  const dispatch = useDispatch();
  const { rows, columns, loading } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} loading={loading} checkboxSelection />
    </div>
  );
}
```

---

## ✅ 4. Backend Response Example

Make sure your backend returns:

```json
[
  {
    "id": 1,
    "name": "John",
    "rating": 4.2,
    "country": "India",
    "dateCreated": "2023-01-01",
    "isAdmin": true
  },
  ...
]
```

---

## ✅ Recap

| Step                                  | Done |
| ------------------------------------- | ---- |
| Created thunk to fetch data           | ✅    |
| Stored rows & columns in Redux        | ✅    |
| Replaced `useDemoData` with real data | ✅    |
| Hooked up `DataGrid` to backend       | ✅    |

Let me know if you want to **add filtering**, **pagination**, or **server-side sorting** next!
*/