import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const drawerWidth = 280;

export default function PermanentDrawerRight() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Permanent drawer
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="right"
            >
                <Toolbar />
                <Divider />
                <Card sx={{ maxWidth: 345}}>
                    <div className={"cardMain"}>
                        <div className={"cardContent"}>
                            <CardContent className={"mr-0 pr-0"}>
                                <div className={"productDetails"}>
                                    <Typography variant="body2" sx={{color: 'text.primary', textAlign: 'left'}}>
                                        product name
                                    </Typography>
                                    <div className={"productDetailsSubSection"}>
                                        <div className={"productPriceAndDeleteButton"}>
                                        <Typography variant="body2" color="text.primary">
                                            product price
                                        </Typography>
                                            <IconButton aria-label="delete" size="small">
                                                <DeleteIcon fontSize="inherit"
                                                            style={{fontSize: 16, marginTop: '-3px'}}/>
                                            </IconButton>
                                        </div>
                                        <div className="addRemoveDeleteBtn">

                                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                                <IconButton aria-label="add" size="small">
                                                    <AddCircleOutlineIcon fontSize="inherit"
                                                             style={{fontSize: 16, marginTop: '-10px'}}/>
                                                </IconButton>
                                                <IconButton aria-label="remove" size="small">
                                                    <RemoveCircleOutlineIcon fontSize="inherit"
                                                                style={{fontSize: 16, marginTop: '-10px'}}/>
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </CardContent>
                        </div>

                    </div>
                </Card>
            </Drawer>
        </Box>
    );
}
