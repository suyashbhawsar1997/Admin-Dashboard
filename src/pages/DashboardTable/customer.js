import "../../assets/css/Main.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CircularProgress, Dialog, IconButton } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeletIcon from "../../assets/globle-icon/delete.png"
import EditIcon from "../../assets/globle-icon/copy.png"
import Header from "../Header/header"
import {
    Paper,
    Box,
    Button,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import AddCustomer from "./AddCustomer";

const DashboardTable = () => {
    const [customer, setCustomer] = useState([]);
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState({
        page: 1,
        rowsPerPage: 5,
    });

    // model open and close
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const fetchData = async () => {
        setLoading(true);
        const url = `http://13.201.109.71:3024/admin/customer?pageSize=${controller.rowsPerPage}&pageNumber=${controller.page}&sorting[0][direction]=DESC&sorting[0][key]=id`;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                },
            });

            if (response.status === 200) {
                const { data } = response;
                setCustomer(data);
            } else {
                throw new Error("Request failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [controller.rowsPerPage, controller.page]);

    const handlePageChange = (event, newPage) => {
        setController((prevState) => ({
            ...prevState,
            page: newPage,
        }));
    };

    //   copy function
    const handleCopyRow = (rowData) => {
        const displayedData = [
            ["Name", rowData.name],
            ["Position", rowData.position],
            ["Bio", rowData.bio],
            ["Phone Number", rowData.phone],
            ["WhatsApp Number", rowData.whatsApp],
            ["Email", rowData.email],
            ["LinkedIn", rowData.linkedin],
            ["Industry", rowData.industry],
            ["Message", rowData.message]
        ];

        // Creating a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.opacity = 0;

        // Constructing tabular data
        const tableData = displayedData.map(row => row.join(": ")).join("\n");
        textarea.value = tableData;

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            // Copying the displayed data to clipboard
            document.execCommand('copy');
            toast.success('data copied successfully!');
        } catch (error) {
            console.error('Error copying data:', error);
            toast.error('Failed to copy data!');
        } finally {
            document.body.removeChild(textarea);
        }
    };

    const columns = [
        {
            name: "sno",
            label: "S.No.",
            options: {
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    return dataIndex + 1;
                },
            },
        },
        {
            name: "profileImage",
            label: "Profile Image",
            options: {
                minWidth: 100,
                align: "center",
                customBodyRenderLite: (dataIndex) => {
                    const imageUrl = customer[dataIndex].profileImage;
                    return imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="img"
                            style={{ width: 50, height: 50, borderRadius: "50%" }}
                        />
                    ) : null;
                },
            },
        },

        { name: "name", label: "Name", options: { minWidth: 100, align: "center" } },
        { name: "position", label: "Position", options: { minWidth: 100, align: "center" } },
        { name: "bio", label: "Bio", options: { minWidth: 100, align: "center" } },
        { name: "phone", label: "Phone Number", options: { minWidth: 100, align: "center" } },
        { name: "whatsApp", label: "whatsApp Number", options: { minWidth: 100, align: "center" } },
        { name: "email", label: "Email", options: { minWidth: 100, align: "center" } },
        {
            name: "linkedin",
            label: "LinkedIn",
            options: {
                minWidth: 100,
                align: "center",
                customBodyRenderLite: (dataIndex) => {
                    const linkedInUrl = customer[dataIndex].linkedin;
                    return (
                        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                            {linkedInUrl}
                        </a>
                    );
                },
            },
        },
        { name: "industry", label: "Industry", options: { minWidth: 100, align: "center" } },
        { name: "message", label: "Message", options: { minWidth: 100, align: "center" } },
        { name: "amount", label: "Amount", options: { minWidth: 100, align: "center" } },
        {
            name: "copy",
            label: "Copy",
            options: {
                minWidth: 100,
                align: "center",
                customBodyRenderLite: (dataIndex) => {
                    const rowData = customer[dataIndex];
                    return (
                        <div style={{ display: "flex" }}>
                            <IconButton onClick={() => handleCopyRow(rowData)}>
                                <img src={EditIcon} alt="Copy" />
                            </IconButton>
                            <IconButton >
                                <img src={DeletIcon} alt="Delete" />
                            </IconButton>
                        </div>
                    );
                },
            },
        },
    ];

    const options = {
        selectableRows: false,
        search: true,
        searchPlaceholder: "Search",
        searchFieldAlignment: "left",
        responsive: "vertical",
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 25, 50, 100, 500],
        tableBodyMaxHeight: "calc(100vh - 300px)",
        fixedHeader: true,
        fixedSelectColumn: false,
        pagination: true,
        print: true,
        viewColumns: true,
        download: true,
        filter: true,
        sort: true,
        rowHover: true,
    };

    return (
        <>
            <Header />

            <div className="all-rides">
                <style>
                    {`
    .all-rides {
      width: 100%;
      margin: 0 auto;
    }

    .all-rides .MuiTable-root {
      display: table;
      overflow: 'auto';
      width: 100%;
      border-collapse: collapse;
    }
    .tss-1akey0g-MUIDataTableHeadCell-data{
      color: black
    }
    .all-rides .MuiTableHead-root .MuiTableCell-root {
      text-align: center  !important;
      background-color: rgba(245, 237, 255, 1) !important;
      color: black;
    }
    .tss-178gktx-MUIDataTableHeadCell-contentWrapper{
      place-content: center;
    }
    
    .all-rides .MuiTableHead-root th,
    .all-rides .MuiTableBody-root .MuiTableCell-root {
      text-align: center;
      border: 1px solid #747474;
      padding: 10px;
    }

    .tss-1vd39vz-MUIDataTableBodyCell-stackedCommon{
        width: 180px;
        height: 90px;
        overflow: auto;
    }

    .all-rides .custom-row {
      border-bottom: 1px solid #747474;
    }

    .all-rides .MuiTableHead-root {
      background-color: #1F2F4B;
      color: white;
    }

    .all-rides .MuiTableCell-root {
      border: 1px solid #747474;
      padding: 10px;
      text-align: center; / Center align table data /
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 900px) {
      .all-rides .MuiTableHead-root th,
      .all-rides .MuiTableBody-root .MuiTableCell-root {
        display: block;
        width: 100%;
        padding: 8px;
      }

      .all-rides .MuiTableBody-root .MuiTableCell-root {
        text-align: center; / Center align table data in responsive mode /
      }
     
    }
  `}
                </style>
                <Box p={2} style={{ marginTop: "20px", display: "flex", justifyContent: "end" }} >
                    <Link style={{ textDecoration: "none" }}>
                        <Button variant="outlined" onClick={handleOpenModal} style={{ backgroundColor: "rgba(142, 96, 204, 1)", color: 'white' }}>
                            Create
                        </Button>
                    </Link>
                </Box>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <MUIDataTable
                            title={"Dashboard"}
                            data={customer}
                            columns={columns}
                            options={options}
                        />
                    )}
                </Paper>
                {openModal && (
                    <Dialog open={openModal} onClose={handleCloseModal}>
                        <AddCustomer />
                    </Dialog>
                )}
                <ToastContainer />
            </div>
        </>
    );
};

export default DashboardTable;
