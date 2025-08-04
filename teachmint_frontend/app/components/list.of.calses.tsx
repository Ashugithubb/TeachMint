'use client'
import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { getClassThunk } from "../redux/slice/class.list.slice";
import { useEffect, useState } from "react";

export default function AllClassesList() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getClassThunk())
    },[])
    const { classlist, loading, error } = useAppSelector((state) => state.classlist)
    return (
        <>
          

            {classlist.map((c: any, index) => (
                <Box key={index} >
                    <Typography > {c.id} {c.name} {c.acadmicYear}</Typography>

                </Box>
            ))}


        </>
    )
}