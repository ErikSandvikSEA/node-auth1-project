import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

//styling imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

//form validation imports

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/bw-use-my-tech-stuff-one/front-end/blob/master/LICENSE" target="_blank">
        TechPal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//material UI styling function
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url('https://source.unsplash.com/random')`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
    fontWeight: 'bold'
  },
  border: {
       border: '1px black solid'
  }
}));

// -------- Initial Form Values -------- 
const initialFormErrors = {
  username: '',
  password: ''
}

const initialFormValues = {
  username: '',
  password: ''
}

const initialDisabled = true;
// -------- Initial Form Values End -------- 

export default function Login() {
  const classes = useStyles();
    //useHistory for .push
    let history = useHistory()
  // -------- State -------- 
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [users, setUsers] = useState(null)
  const [ isLoggingIn, setIsLoggingIn ] = useState(false)
  // -------- State Ends -------- 

  const fetchUsers = () => {
     axios
          .get('http://localhost:8000/api/users')
          .then(response => {
               console.log(response)
               setUsers(response.data.users)
          })
          .catch(err => {
               console.log(err)
          })
}

  // -------- Handlers -------- 
  function loginHandler(event) {
    event.preventDefault();
    setIsLoggingIn(true)
         // make a POST request to the login endpoint
         // _if_ the creds match what's in the database, the server will return a JSON web token
         // set the token to localStorage (sessions)
         // navigate the user to the "/protected" route
    axios
      .post('http://localhost:8000/api/auth/login', formValues)
      .then(response => {
           console.log(response)
          //response.data.payload is the key(token) that comes from server.js
          // localStorage.setItem('token', response.data.token)
          // localStorage.setItem('userId', response.data.data.id)
          // localStorage.setItem('userType', response.data.data.type)
          setIsLoggingIn(false)
          alert(response.data.message)
          fetchUsers()
      })
      .catch(err => {
        console.log(err, 'there was an error')
        setIsLoggingIn(false)
      })
    setFormValues(initialFormValues)
  }

  function inputHandler(event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  // -------- Handlers End -------- 

  // ---------------------------------------- 
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {/* -------- Login Errors Render --------  */}
          <Typography className={classes.error} component="p">
            {formErrors.username}
          </Typography>
          <Typography className={classes.error} component="p">
            {formErrors.password}
          </Typography>
          {/* -------- Login Errors Render Ends --------  */}

          <form className={classes.form} onSubmit={loginHandler} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formValues.username}
              autoFocus
              onInput={inputHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formValues.password}
              onInput={inputHandler}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginHandler}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

            {isLoggingIn && <CircularProgress />}
            
            <Box mt={5}>
              {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
              Visit our project repo below.
        </Typography>
        <Link href="https://github.com/bw-use-my-tech-stuff-one" target="_blank" style={{textDecoration: 'none', color: 'inherit'}}>
              <GitHubIcon style={{fontSize: '45px'}}></GitHubIcon>
        </Link>
        <Copyright />
        {    users ? 
      <div className={classes.border}>
               {users.map((user) => (
                    <div  className={classes.border} key={user.username}>
                         <h3>{user.username}</h3>
                         <h3>{user.jobTitle_name}</h3>

                    </div>
               )
               )}
      </div> : null
}
      </footer>
      {/* End footer */}
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}