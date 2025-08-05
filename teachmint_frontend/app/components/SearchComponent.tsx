'use client'
import { useEffect, useState } from "react"
import { useAppDispatch } from "../redux/hook/hook";
import { getAllStudentThunk } from "../redux/slice/student.slice";
import { TextField } from "@mui/material";
export default function SearchComponent() {
    const [searchValue, setsearchValue] = useState('');
    const dispatch = useAppDispatch()
    useEffect(() => {
        const debounce = setTimeout(async () => {
            if (searchValue.trim() === '') {
                return;
            }
            try {
                dispatch(getAllStudentThunk({ searchValue }))

            } catch (error) {
                console.log("Fetch error:", error);
            }
        }, 2000);

        return () => clearTimeout(debounce);
    }, [searchValue]);
    return (
        <>
            <TextField label="Search By name or Email " margin="normal"
                value={searchValue}
                onChange={(e) => setsearchValue(e.target.value)} />
        </>
    )
}