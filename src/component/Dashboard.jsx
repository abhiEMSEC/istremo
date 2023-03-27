import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';

import { Pagination, Button } from '@mui/material';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';


const columns = [
    { id: "Date", label: "Date" },
    { id: "Day Installs", label: "Day Installs" },
    { id: "Plateform", label: "Plateform" },
    { id: "Day Uninstalls", label: "Day Uninstalls" },
    { id: "Plateform", label: "Plateform" },
    { id: "Churn Rate", label: "Churn Rate" },
    { id: "Churn Plateform", label: "Churn Plateform" }
];

const Dashboard = () => {

    const [data, setdata] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, settotalPages] = useState(10)

    const [tabledata, settabledata] = useState([]);
    const [pagelimit, setPagelimit] = useState(50);

    const [startdate, setstartdate] = useState(new Date());
    const [enddate, setenddate] = useState(new Date());

    const [filterdata, setfilterdata] = useState([])
    const [calender, setcalender] = useState(false)

    const [formatstartdate, setformatstartdate] = useState("2022-04-01");
    const [formatenddate, setformatenddate] = useState("2022-08-24")


    async function fetchTopbar() {
        const response = await fetch(`https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount?fromdate=${formatstartdate}&todate=${formatenddate}&page=1&limit=10 `);
        const data = await response.json();
        setdata(data.data);
    }
    async function fetchtabledata() {
        const response = await fetch(`https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=${formatstartdate}&todate=${formatenddate}&page=${page}&limit=${pagelimit} `);
        const data = await response.json();
        settotalPages(data.data.pages)
        settabledata(data.data.data)
        setfilterdata(data.data.data)
    }


    useEffect(() => {
        fetchTopbar();
        fetchtabledata();
        setcalender(false);

    }, [page, pagelimit]);

    useEffect(() => {
        fetchTopbar()
        fetchtabledata();

    }, [formatenddate, formatstartdate]);


    const handleChange = (event) => {
        setPagelimit(event.target.value);
    };

    const selectionRange = {
        startDate: startdate,
        endDate: enddate,
        key: 'selection',
    }
    let filtered
    const handleSelect = (date) => {
        filtered = filterdata.filter((product) => {
            let productDate = new Date(product.created_At);  //createdAt
            return (
                productDate >= date.selection.startDate &&
                productDate <= date.selection.endDate

            )
        })
        setstartdate(date.selection.startDate);
        setenddate(date.selection.endDate)
        settabledata(filtered)
        const year = startdate.getFullYear();
        const month = String(startdate.getMonth() + 1).padStart(2, '0');
        const day = String(startdate.getDate()).padStart(2, '0');
        const formattedstartDate = `${year}-${month}-${day}`;
        setformatstartdate(formattedstartDate)


        const eyear = enddate.getFullYear();
        const emonth = String(enddate.getMonth() + 1).padStart(2, '0');
        const eday = String(enddate.getDate()).padStart(2, '0');
        const formattedendDate = `${eyear}-${emonth}-${eday}`;
        setformatenddate(formattedendDate)


    }
    const showcalender = () => {
        if (calender === false) {
            setcalender(true)
        }
        else {
            setcalender(false)
            fetchtabledata();
        }
    }




    return (
        <>
            <div className="main">
                <div className="sidebar">
                    <div className='logo' >
                        WOW
                    </div>
                    <div className='dashbord'>
                        <DashboardIcon /> Dashboard
                    </div>
                    <div >
                        <PersonIcon /> WOW User
                    </div>
                    <div>
                        <VideocamIcon /> Video Clips
                    </div>
                    <div>
                        <ReportProblemIcon /> Reported  Content
                    </div>
                    <div>
                        <CategoryIcon /> Category
                    </div>
                    <div>
                        <InfoIcon /> Info Page
                    </div>
                    <div>
                        <QuestionAnswerIcon />FAQ
                    </div>
                    <div>
                        <CircleNotificationsIcon />Push Notification
                    </div>
                    <div>
                        <PersonAddIcon />Internal User
                    </div>
                </div>
                <div className="content">
                    <div className='dashbord'>
                        <DashboardIcon /> Dashboard
                    </div>
                    <div className="headbar">
                        <div>
                            <DownloadIcon /> {data.totalInstall} <br /> App Installed
                        </div>
                        <div>
                            <DirectionsRunIcon />{data.activeinstall} <br />Active Installs
                        </div>
                        <div>
                            <CompareArrowsIcon /> {data.churn} <br /> Churn Rate
                        </div>
                        <div>
                            <FileDownloadOffIcon />{data.totaluninstall}  <br /> App Un-Installed
                        </div>
                        <div>
                            <AccessibilityIcon /> {data.aliveappusers}  <br /> Alive App User
                        </div>
                        <div>
                            <CompareArrowsIcon /> {data.alivechurn} <br /> Alive Churn Rate
                        </div>

                    </div>


                    <div className="table">
                        <FormControl variant="standard" style={{ color: 'white', paddingLeft: '2%' }} >
                            <InputLabel id="demo-customized-select-label" style={{ color: 'white', paddingLeft: '2%' }} > </InputLabel>
                            <Select
                                style={{ color: 'white' }}
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={pagelimit}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10} >10 entries</MenuItem>
                                <MenuItem value={50}>50 entries</MenuItem>
                                <MenuItem value={500}>500 entries</MenuItem>
                                <MenuItem value={1000}>1000 entries</MenuItem>
                            </Select>
                        </FormControl>

                        <Button variant="contained" color="success" onClick={showcalender}
                            sx={{ marginTop: '1%', marginLeft: '1%' }}>
                            {formatstartdate} TO {formatenddate}
                        </Button>
                        {
                            calender &&

                            <DateRangePicker
                                className='date-range-picker'
                                ranges={[selectionRange]}
                                onChange={handleSelect}
                            />
                        }
                        <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#283046' }}>
                            <TableContainer sx={{ maxHeight: 450 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                            {columns.map((column) => (
                                                <TableCell

                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                    sx={{ backgroundColor: '#283046', color: 'white' }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            tabledata.map((current) => (
                                                <>
                                                    <TableRow>
                                                        <TableCell key={current.name} sx={{ fontSize: "1rem", padding: "10px", color: 'white' }} > {current.created_At.split('T')[0]} </TableCell>
                                                        <TableCell key={current.ip} sx={{ fontSize: "1rem", padding: "10px", color: 'white' }} > {current.totalinstall}</TableCell>
                                                        <TableCell key={current.type} sx={{ fontSize: "1rem", padding: "10px", color: 'white' }} > <AndroidIcon /> {current.android_install} <br /> <AppleIcon /> {current.ios_install} </TableCell>
                                                        <TableCell key={current.region} sx={{ fontSize: "1rem", padding: "10px", color: 'white' }} >{current.totaluninstall}</TableCell>
                                                        <TableCell key={current.region} sx={{ fontSize: "1rem", padding: "10px", color: 'white' }} > <AndroidIcon /> {current.android_uninstall}<br /> <AppleIcon /> {current.ios_uninstall}</TableCell>
                                                        <TableCell key={current.region} sx={{ fontSize: "1rem", padding: "10px", color: 'white' }} >50</TableCell>
                                                        <TableCell key={current.region} sx={{ fontSize: "1rem", padding: "10px", color: 'white' }} > <AndroidIcon /> {current.android_churn}<br /> <AppleIcon /> {current.ios_churn}</TableCell>
                                                    </TableRow>

                                                </>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>
                        <Pagination
                            className='pagination'
                            page={page}
                            size="large"
                            count={totalPages}
                            variant="outlined"
                            onChange={(event, value) => setPage(value)}
                        />

                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard