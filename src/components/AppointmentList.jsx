import React from 'react';
import { Stack, Typography } from '@mui/material';
import AppointmentCard from './AppointmentCard';

function AppointmentList({ appointments, handleEdit, handleDelete }) {
  if (appointments.length === 0) {
    return <Typography>No appointments yet.</Typography>;
  }

  return (
    <Stack spacing={2}>
      {appointments.map((apt) => (
        <AppointmentCard
          key={apt.id}
          appointment={apt}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </Stack>
  );
}

export default AppointmentList;
