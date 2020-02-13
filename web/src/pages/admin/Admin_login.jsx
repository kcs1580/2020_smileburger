import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            Sola C
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Admin_login = ({ setCan }) => {
    const classes = useStyles();

    const [id, setId] = useState('');
    const [password, setPw] = useState('');

    const loginsubmit = () => {

        console.log(`id는 : ${id} \n pw는 : ${password}`);

        if (id == "admin" && password == "pw123") {
            console.log('**#@Admin_login의 정해진 id와 password를 입력했어@#**');
            setCan(true);
        }
        else {
            console.log('**#@Admin_login의 id랑 pw는 지멋대로 입력되었다 @#**')
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper} >
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="adminid"
                        label="Admin Id"
                        value={id}
                        onChange={({ target: { value } }) => setId(value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={({ target: { value } }) => setPw(value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={loginsubmit}
                    >
                        Login
                     </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={1}>
                <Copyright />
            </Box>
        </Container>
    );
}
export default Admin_login;