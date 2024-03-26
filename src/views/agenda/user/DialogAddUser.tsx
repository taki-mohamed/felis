// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { SelectChangeEvent } from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const DialogAddUser = ({toggle, setToggle} :{toggle: any, setToggle:any}) => {
  // ** States


  return (
    <Card>
      <Dialog
        fullWidth
        open={toggle}
        maxWidth='md'
        scroll='body'
        onClose={() => setToggle(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setToggle(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setToggle(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 8, textAlign: 'left' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
              Ajouter Un Marshendiser
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <CustomTextField fullWidth  label='Prenom' placeholder='Prenom' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomTextField fullWidth  label='Nom' placeholder='Nom' />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth  label='Poste' placeholder='Poste' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomTextField
                fullWidth
                label='Email'
                placeholder='johnDoe@email.com'
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomTextField fullWidth label='Telephone' placeholder='Telephone'  />
            </Grid>


          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 1 }} onClick={() => setToggle(false)}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={() => setToggle(false)}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogAddUser
