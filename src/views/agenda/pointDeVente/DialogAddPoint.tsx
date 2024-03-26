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

const DialogAddPoint = ({togglePoint, setTogglePoint} :{togglePoint: any, setTogglePoint:any}) => {
  // ** States


  return (
    <Card>
      <Dialog
        fullWidth
        open={togglePoint}
        maxWidth='md'
        scroll='body'
        onClose={() => setTogglePoint(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setTogglePoint(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setTogglePoint(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 8, textAlign: 'left' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
              Ajouter Un Point De Vente
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item  xs={12}>
              <CustomTextField fullWidth  label='Nom du Point de Vente' placeholder='Nom du Point de Vente' />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth label='Localisation' placeholder='Localisation' >
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth label='Ville' placeholder='Ville' select>
                <MenuItem value='Paris'>Paris</MenuItem>
                <MenuItem value='New York'>New York</MenuItem>
                <MenuItem value='London'>London</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth label='Enseigne' placeholder='Enseigne' select>
                <MenuItem value='Enseigne 1'>Enseigne 1</MenuItem>
                <MenuItem value='Enseigne 2'>Enseigne 2</MenuItem>
                <MenuItem value='Enseigne 3'>Enseigne 3</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth label='Région' placeholder='Région' select>
                <MenuItem value='Île-de-France'>Île-de-France</MenuItem>
                <MenuItem value='New York'>New York</MenuItem>
                <MenuItem value='London'>London</MenuItem>
              </CustomTextField>
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
          <Button variant='contained' sx={{ mr: 1 }} onClick={() => setTogglePoint(false)}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={() => setTogglePoint(false)}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogAddPoint
