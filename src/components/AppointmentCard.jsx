import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import ConfirmDialog from './ConfirmDialog';

function AppointmentCard({ appointment, handleEdit, handleDelete }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDeleteConfirm = () => {
    handleDelete(appointment.id);
    setOpenConfirm(false);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div>
              <Typography variant="h6">{appointment.patientName}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Doctor: {appointment.doctorName}
              </Typography>
              <Typography variant="body2">
                Date: {appointment.date?.format('DD MMM YYYY')}
              </Typography>
              <Typography variant="body2">
                Time: {appointment.time?.format('hh:mm A')}
              </Typography>
              {appointment.notes && (
                <Typography variant="body2">Notes: {appointment.notes}</Typography>
              )}
            </div>

            <Stack direction="row" spacing={1}>
              <IconButton color="primary" onClick={() => handleEdit(appointment)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => setOpenConfirm(true)}>
                <Delete />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default AppointmentCard;
