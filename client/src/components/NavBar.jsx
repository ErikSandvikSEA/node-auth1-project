import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
     icon: {
       marginRight: theme.spacing(0.5),
       verticalAlign: 'middle',
       fontSize: '48px'
     },
     heroContent: {
       backgroundColor: theme.palette.background.paper,
       padding: theme.spacing(8, 0, 6),
     },
     heroButtons: {
       marginTop: theme.spacing(4),
     },
     cardGrid: {
       paddingTop: theme.spacing(8),
       paddingBottom: theme.spacing(8),
     },
     footer: {
       backgroundColor: theme.palette.background.paper,
       padding: theme.spacing(6),
     },
     button: {
       margin: '2%',
     },
   }));

   
   const NavBar = () => {
     const classes = useStyles();
     const userId = localStorage.getItem('userId')


     
    const logoutHandler = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userType')
    }




        return (
          <React.Fragment>
          <CssBaseline />
          <AppBar>
            <Toolbar style={{width: '100%', justifyContent: 'space-between'}}>
              <Typography variant="h6" color="inherit">
                <Link href="/" color="inherit" style={{textDecoration: 'none'}}>
                  <EmojiPeopleIcon className={classes.icon} />
                  TechPal
                </Link>
              </Typography>
              <Typography>
                <Button 
                  // variant='contained'
                  color='inherit'
                  href='/myprofile'
                >
                  My Profile
                </Button>
                { 
                userId ? <Button color="inherit" onClick={logoutHandler} href='/login'>Logout</Button> : <Button color="inherit" href="/login">Login</Button>
                }
                <Button color="inherit" href="/register">Register</Button>
              </Typography>
            </Toolbar>
          </AppBar>
          </React.Fragment>
        )
   }

   export default NavBar