import React, { useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import './App.css';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [editData, setEditData] = useState(null);

  const addAppointment = (newAppointment) => {
    if (editData) {
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === editData.id ? newAppointment : apt))
      );
      setEditData(null);
    } else {
      setAppointments((prev) => [
        ...prev,
        { ...newAppointment, id: Date.now() },
      ]);
    }
  };

  const handleEdit = (appointment) => {
    setEditData(appointment);
  };

  const handleDelete = (id) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Doctor Appointment Booking
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 5 }}>
          <Paper sx={{ p: 2 }}>
            <AppointmentForm
              addAppointment={addAppointment}
              editData={editData}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 7 }}>
          <AppointmentList
            appointments={appointments}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
