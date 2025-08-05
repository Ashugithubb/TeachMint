'use client'
import { useState } from "react";
import CreateClassForm from "../components/create.class";
import Navbar from "../components/navbar";
import { Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AllClassesList from "../components/list.of.calses";
import Students from "../components/student";

import SearchComponent from "../components/SearchComponent"
import AddStudentComponent from "../components/AddStudentToClass";

export default function Home() {
    const [addClass, setAddClass] = useState(false);
    const [showClass, setShowClass] = useState(false);
    const [AddStudent, setAddStudent] = useState(false);
    const [listOfStudents,setListOfStudent] = useState(false);


    const handelAddClick = () => {
        setAddClass(!addClass)
    }
    const handelShowClassClick = () => {
        setShowClass(!showClass);
    }

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", gap: 13 }}>
                <Button variant="contained" onClick={handelAddClick}>Create Class<AddIcon /></Button>
                <Button onClick={handelShowClassClick} variant="contained">Show Availabe classes</Button>
                <Button  onClick={() => setListOfStudent(!listOfStudents)} variant="contained">See List of Students</Button>
                <Button onClick={() => setAddStudent(!AddStudent)} variant="contained">Add Student to a class<AddIcon /></Button>
            </Box>

            {showClass && <Box sx={{ marginLeft: "270px", marginTop: "30px" }}><AllClassesList /></Box>}
            {addClass && <Box display={"flex"}><CreateClassForm /></Box>}
           
            {listOfStudents && <Students/> }
            {AddStudent && <AddStudentComponent/>}

        </>
    )
}