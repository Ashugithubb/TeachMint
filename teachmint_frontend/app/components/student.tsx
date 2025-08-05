'use client'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hook/hook"
import { getAllStudentThunk, Student } from "../redux/slice/student.slice";
import { Box, CircularProgress, Container, Pagination, Typography } from "@mui/material";
import StudentCard from "./StudentCard";
import SearchComponent from "./SearchComponent";

export default function Students() {
    const dispatch = useAppDispatch();
    const { student = [], loading, total, page, limit } = useAppSelector((state) => state.student);




    useEffect(() => {
        const fetchStudents = async () => {
            const res = await dispatch(getAllStudentThunk({ limit: 3, page }));
        };
        fetchStudents();
    }, [dispatch, page]);


    const totalPages = Math.ceil(total / (limit || 1));

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight="bold" marginLeft={"350px"} gutterBottom>
                Student List
            </Typography>
            <Box sx={{marginLeft:"340px"}}>
            <SearchComponent  /></Box>
            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {student?.length === 0 ? (
                        <Typography align="center" mt={4}>
                            No Student found
                        </Typography>
                    ) : (
                        <Box marginLeft={"350px"} gap={1} >
                            {student?.map((cls: Student) => (
                                <Box key={cls.id}>
                                    <StudentCard {...cls} />
                                </Box>
                            ))}
                        </Box>
                    )}
                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" mt={4}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                variant="outlined"
                                shape="rounded"
                                onChange={(_, value) => {
                                    dispatch(getAllStudentThunk({ page: value, limit }));
                                }}
                            />
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

