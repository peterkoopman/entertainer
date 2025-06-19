'use client';

import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/muiThemes';
import Link from 'next/link';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';
import { useParams } from 'next/navigation';
import style from './personnel.module.css';

export default function PersonnelPage() {
  const { slug } = useParams<{ slug: string }>();
  const personnel = [
    {
      id: 1,
      name: 'Peter Koopman',
      slug: 'peter-koopman',
      avatar: '/PK_profile_pic.jpg',
      phone: '021-247-3480',
      email: 'peter@scribbledesign.co.nz',
    },
    {
      id: 2,
      name: 'Remy Sharp',
      slug: 'remy-sharp',
      avatar: '/static/images/avatar/2.jpg',
      phone: '021-123-4567',
      email: 'remy@sharp.com',
    },
  ];

  const person = personnel.find((person) => person.slug == slug);

  return (
    <ThemeProvider theme={theme}>
      {slug ? (
        <>
          <h1>{person?.name}</h1>
          <Box component="form" className={style.form}>
            <TextField name="name" label="Name" />
            <TextField name="email" label="Email" />
            <TextField name="phone" label="Phone" />
            <TextField name="address" label="Address" multiline rows={3} />
            <TextField name="notes" label="Notes" multiline rows={3} />
            {/* TODO: add password change */}
          </Box>
        </>
      ) : (
        <>
          <h1>Personnel</h1>
          <Box>
            <List className={style.list}>
              {personnel.map((listPerson) => (
                <ListItem key={listPerson.slug} className={style.listItem}>
                  <ListItemAvatar>
                    <Avatar alt={listPerson.name} src={listPerson.avatar} />
                  </ListItemAvatar>
                  <Link href={`/personnel/${listPerson.slug}`}>
                    <ListItemText primary={listPerson.name} />
                  </Link>
                  <ListItemText primary={listPerson.phone} />
                  <ListItemText primary={listPerson.email} />
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )}
    </ThemeProvider>
  );
}
