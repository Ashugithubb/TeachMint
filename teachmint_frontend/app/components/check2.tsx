import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function BasicExampleDataGrid() {
  const { data, loading } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid {...data} loading={loading} showToolbar />
    </div>
  );
}

//import React, { useEffect } from 'react';
//import { DataGrid } from '@mui/x-data-grid';
//import { useSelector, useDispatch } from 'react-redux';
//import { fetchTableData } from '../store/dataSlice'; // update path
//import { RootState } from '../store/store'; // your root state

//export default function BasicExampleDataGrid() {
 // const dispatch = useDispatch();
 // const { rows, columns, loading } = useSelector((state: RootState) => state.data);

 // useEffect(() => {
  //  dispatch(fetchTableData());
  //}, [dispatch]);

  //return (
   // <div style={{ height: 400, width: '100%' }}>
   //   <DataGrid rows={rows} columns={columns} loading={loading} checkboxSelection />
 //   </div>
 // );
//}
