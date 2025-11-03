import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const baseForm = {
  patientName: '',
  doctorName: '',
  date: null,
  time: null,
  notes: '',
};

function AppointmentForm({ addAppointment, editData }) {
  const [form, setForm] = useState(baseForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        date: editData.date ? dayjs(editData.date) : null,
        time: editData.time ? dayjs(editData.time) : null,
      });
    } else {
      setForm(baseForm);
    }
    setErrors({});
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addAppointment(form);
      setForm(baseForm);
    }
  };

  const validate = () => {
    const temp = {};
    if (!form.patientName) temp.patientName = 'Required';
    if (!form.doctorName) temp.doctorName = 'Required';
    if (!form.date) temp.date = 'Required';
    if (!form.time) temp.time = 'Required';
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Patient Name"
          name="patientName"
          value={form.patientName}
          onChange={handleChange}
          error={!!errors.patientName}
          helperText={errors.patientName}
          fullWidth
        />
        <TextField
          label="Doctor Name"
          name="doctorName"
          value={form.doctorName}
          onChange={handleChange}
          error={!!errors.doctorName}
          helperText={errors.doctorName}
          fullWidth
        />
        <DesktopDatePicker
          label="Appointment Date"
          value={form.date}
          onChange={(newValue) => setForm((prev) => ({ ...prev, date: newValue }))}
          slotProps={{
            textField: { error: !!errors.date, helperText: errors.date, fullWidth: true },
          }}
        />
        <TimePicker
          label="Appointment Time"
          value={form.time}
          onChange={(newValue) => setForm((prev) => ({ ...prev, time: newValue }))}
          slotProps={{
            textField: { error: !!errors.time, helperText: errors.time, fullWidth: true },
          }}
        />
        <TextField
          label="Notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          multiline
          rows={2}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          {editData ? 'Update Appointment' : 'Book Appointment'}
        </Button>
      </Stack>
    </form>
  );
}

export default AppointmentForm;
