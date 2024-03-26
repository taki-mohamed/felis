

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PageHeader from 'src/@core/components/page-header';
import Button from '@mui/material/Button';
import Icon from 'src/@core/components/icon';
import CardContent from '@mui/material/CardContent';

// Make sure these imports are correct
import TableStickyHeader from '../../views/agenda/TableStickyHeader';
import PickersBasic from 'src/views/agenda/picker/PickersBasic';
import DialogAddCard from 'src/views/agenda/visite/DialogAddCard';
import Filter from 'src/views/agenda/Filter';

function Index() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12}>
          <PageHeader title={<Typography variant='h1'>Agenda</Typography>} />
        </Grid>
        <Grid item xs={12}>
          <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
              variant='contained'
              onClick={() => {
                setShow(true);
              }}
              startIcon={<Icon fontSize='1.25rem' icon='tabler:plus' />}
              sx={{ marginTop: '15px' }}

            >
              Nouvelle Visite
            </Button>
            <Box sx={{ gap:4,display: 'flex', alignItems: 'center' }}>
              <PickersBasic/>
              <Filter />
            </Box>
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          <TableStickyHeader />
        </Grid>
      </Grid>
      <DialogAddCard show={show} setShow={setShow} />
    </Box>
  );
}

export default Index;
