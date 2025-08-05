'use client';
import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@mui/material';

const classes = ['Class 1', 'Class 2'];

const students = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
]; // Replace with real data

const sessionCount = 30;
const statusOptions = ['Present', 'Absent', 'Unmarked'];

export default function AttendanceTable() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<{ [studentId: number]: string[] }>({});

  const handleStatusChange = (studentId: number, sessionIndex: number, value: string) => {
    setAttendance((prev) => {
      const updated = prev[studentId] ? [...prev[studentId]] : Array(sessionCount).fill('Unmarked');
      updated[sessionIndex] = value;
      return { ...prev, [studentId]: updated };
    });
  };

  const handleSave = () => {
    console.log('Saving attendance:', {
      className: selectedClass,
      data: attendance,
    });

    // TODO: Replace with API call like:
    // await axios.post('/api/attendance', { classId, attendance });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer variant="permanent" anchor="left">
        <Box sx={{ width: 200 }}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Classes
          </Typography>
          <List>
            {classes.map((cls) => (
              <ListItem key={cls} disablePadding>
                <ListItemButton onClick={() => setSelectedClass(cls)}>
                  <ListItemText primary={cls} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, ml: '200px' }}>
        <Typography variant="h5" gutterBottom>
          {selectedClass ? `Attendance for ${selectedClass}` : 'Select a class'}
        </Typography>

        {selectedClass && (
          <>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  {Array.from({ length: sessionCount }, (_, i) => (
                    <TableCell key={i}>Session {i + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    {Array.from({ length: sessionCount }, (_, i) => (
                      <TableCell key={i}>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            value={attendance[student.id]?.[i] || 'Unmarked'}
                            onChange={(e) =>
                              handleStatusChange(student.id, i, e.target.value)
                            }
                          >
                            {statusOptions.map((opt) => (
                              <MenuItem key={opt} value={opt}>
                                {opt}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box
              sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1000,
              }}
            >
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Attendance
              </Button>
            </Box>

          </>
        )}
      </Box>
    </Box>
  );
}
