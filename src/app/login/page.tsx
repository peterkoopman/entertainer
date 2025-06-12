'use client';

import { login, signup } from './actions';
import { Button, TextField, ThemeProvider } from '@mui/material';
import { theme } from '@/utils/muiThemes';

export default function LoginPage() {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <div className="utility-page">
          <h2>Log in or Sign up</h2>
          <form className="login-form">
            <TextField name="email" type="email" required label="Email">
              Email
            </TextField>
            <TextField
              name="password"
              type="password"
              required
              label="Password">
              Password
            </TextField>
            <Button type="submit" variant="contained" formAction={login}>
              Log in
            </Button>
            <Button type="submit" variant="contained" formAction={signup}>
              Sign up
            </Button>
          </form>
        </div>
      </ThemeProvider>
    </main>
  );
}
