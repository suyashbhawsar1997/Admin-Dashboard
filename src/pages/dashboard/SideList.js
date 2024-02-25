import { Menu } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
// import CatIcon from "../../assets/sidebar-img/Catergories.svg"
import MuiDrawer from '@mui/material/Drawer';
import { useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useValue } from '../../components/context/ContextProvider';
// import SideLogo from '../../assets/sidebar-img/SideLogo.svg';
import '../../assets/css/Sidebar.css'
import Categories from '../category/Categorys';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const SideList = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [open, setOpen] = useState(true);
  const [selectedLink, setSelectedLink] = useState('');

  const list = useMemo(
    () => [
      {
        title: 'Catergories',
        // icon: <img src={CatIcon} />,
        link: 'categories',
      },
    ],
    []
  );

  const navigate = useNavigate();

  const handleItemClick = (link) => {
    setSelectedLink(link);
    navigate(link);
  };

  const handleLogout = () => {
    dispatch({ type: 'UPDATE_USER', payload: null });
    navigate('/');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer variant="permanent" open={open} classes={{
          paper: 'MuiDrawer-paper', // Assign a custom class name
        }}>
        <DrawerHeader>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            <Menu className='iconcolor'/>
          </IconButton>
        </DrawerHeader>
        <Box sx={{ mx: 'auto'}}>
          {/* <img src={SideLogo} style={{ width: open ? 200 : 160, height: open ? 100 : 80,marginLeft:"9px" }} alt="" /> */}
        </Box>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding  sx={{
              display: 'block',
              color: '#ffffff',
              backgroundColor: selectedLink === item.link ? '#262626' : 'inherit', // Change the background color for the activated item
            }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleItemClick(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: selectedLink === item.link ? '#ffffff' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: selectedLink === item.link ? '#ffffff' : 'inherit',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/categories" element={<Categories/>}/>
        </Routes>
      </Box>
    </>
  );
};

export default SideList;
