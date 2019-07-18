import './LoginForm.css';

import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


// to reinforce proptype
// must be able to handle onSubmit and 
// here define LoginForm as a function instead of class to simplify
const LoginForm = ({
	onSubmit,
	onChange,
	error,
}) => (
	<div className="login-panel">
		 <Paper className="paper">
			 <Typography component="h1" variant="h4">
				 Sign in
			 </Typography>
			 <form onSubmit={onSubmit}>
			   {error && <p className="error-message">{error}</p>}
				 <FormControl margin="normal" required fullWidth>
					 <InputLabel htmlFor="email">Email Address</InputLabel>
					 <Input id="email" name="email" autoComplete="email" autoFocus onChange={onChange} />
				 </FormControl>
				 <FormControl margin="normal" required fullWidth>
					 <InputLabel htmlFor="password">Password</InputLabel>
					 <Input name="password" type="password" id="password" autoComplete="current-password" onChange={onChange} />
				 </FormControl>
				 <br/>
				 <br/>
				 <Button
					 type="submit"
					 fullWidth
					 variant="contained"
					 color="primary">
					 Sign in
				 </Button>
			 </form>
		 </Paper>
	 </div>
);

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
}

export default LoginForm;


