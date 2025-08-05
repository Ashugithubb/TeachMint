'use client';
import { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '@/app/redux/hook/hook';
import { toast } from 'react-toastify';
import { getTeacherClassThunk } from '@/app/redux/slice/teacher.classes.slice';
import { CleaningServices } from '@mui/icons-material';
import { getClassAttendanceThunk } from '@/app/redux/slice/class.attendance';



const sessionCount = 30;
const statusOptions = ['Present', 'Absent', 'Unmarked'];

export default function AttendanceTable() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<{ [sessionNumber: string]: string[] }>({});

  const handleStatusChange = (studentId: number, sessionIndex: number, value: string) => {
    setAttendance((prev) => {
      const updated = prev[studentId] ? [...prev[studentId]] : Array(sessionCount).fill('Unmarked');
      updated[sessionIndex] = value;
      return { ...prev, [studentId]: updated };
    });
  };
  const classes = useAppSelector((state) => state.teacherclass.teacherClassInfo);
  const dispatch = useAppDispatch();
  const attendancelist = useAppSelector((state) => state.classattendance.attendance as any)
  console.log("attendence list,", attendancelist)


  const handleSave = () => {
    console.log('Saving attendance:', {
      className: selectedClass,
      data: attendance,
    });
  };
  useEffect(() => {
    const classInfo = async () => {
      const res = await dispatch(getTeacherClassThunk());
      if (res.meta.requestStatus === 'fulfilled') {
      } else {
        toast.error(res.payload || "Failed to add student");
      }
    }

    classInfo();

  }, [])

  const handelSelectedClass = (cls: any) => {
    setSelectedClass(cls.class.name + " Subject " + cls.subject.name);
    console.log(cls);

    const classId = cls.class.id;

    const subjectId = cls.subject.id;
    console.log(subjectId)
    dispatch(getClassAttendanceThunk({ classId, subjectId }))
  }



  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer variant="permanent" anchor="left">
        <Box sx={{ width: 200 }}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Classes
          </Typography>
          <List>
            {classes.map((cls: any) => (
              <ListItem key={cls.id} disablePadding>
                <ListItemButton onClick={() => handelSelectedClass(cls)}>
                  <ListItemText primary={cls.class.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>


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
                  <TableCell>NAME</TableCell>
                  {Array.from({ length: sessionCount }, (_, i) => (
                    <TableCell key={i}>Session {i + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {attendancelist.map((s: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell>{s.student.id}</TableCell>
                    <TableCell>{s.student.name}</TableCell>
                    {Array.from({ length: sessionCount }, (_, i) => (
                      <TableCell key={i}>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            value={attendance[s.student.id]?.[i] || 'Unmarked'}
                            onChange={(e) =>
                              handleStatusChange(s.student.id, i, e.target.value)
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
