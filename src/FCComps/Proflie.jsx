import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';

export default function Proflie(props) {

    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        props.LoggedIn(false);
    }
    if (props.changeDetailsFromApp) {
        currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    }
    //- פונקציה המקבלת את כתובת המייל של משתמש מסויים ובודקת אם הוא
    //אכן משתמש המחובר
    const logoutUser = () => {
        sessionStorage.clear();
        props.LoggedIn(false);
    }

    const editDetail = () => {
        props.showEditDetail(true);
    }

    return (
        <Grid container >
            <Grid item xs={12} ></Grid>
            <Card style={{ width: "100%" }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={currentUser.photoUser}
                    title="green iguana"
                />
                <Typography gutterBottom variant="h5" component="div" style={{ padding: "20px" }}>
                    {currentUser.userName}
                </Typography>
                <CardContent style={{ direction: "rtl", textAlign: "right" }}>
                    <Typography variant="body2" color="text.secondary">
                        <EmailIcon></EmailIcon >{currentUser.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <HomeIcon></HomeIcon>{currentUser.streetName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <CakeIcon></CakeIcon>{currentUser.dateUser}
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "center" }}>
                    <Button size="small" color="error" onClick={logoutUser} >התנתק</Button >
                    <a href="https://games.yo-yoo.co.il/games_play.php?game=1836" target="_blank"
                        rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Button size="small" color="secondary">למשחק</Button>
                    </a>
                    <Button size="small" color="primary" onClick={editDetail}>עדכון פרטים</Button>
                </CardActions >

            </Card >
        </Grid >
    );


};

