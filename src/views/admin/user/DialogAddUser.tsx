// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'

import DialogActions from '@mui/material/DialogActions'
import { SelectChangeEvent } from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'


// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { rows } from 'src/@fake-db/table/static-data'

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // const [users, setUsers] = useState<rows>([]);


  // Fonction pour soumettre les données
  const handleSubmit = () => {
    // Vous pouvez ici envoyer les données où vous en avez besoin
    const newUser = { firstName, lastName, position, email, phone };
    // Ajouter le nouvel utilisateur à la liste
    // setUsers([...users, newUser]);
    // Réinitialiser les champs après la soumission si nécessaire
    setFirstName('');
    setLastName('');
    setPosition('');
    setEmail('');
    setPhone('');
    // Fermer le dialogue
    setToggle(false);
  };


  return (
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
            <Icon icon='tabler:question-mark' />Ajouter Utilisateur
            </Typography>
          </Box>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Poste"
              placeholder="Poste"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Prénom"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Nom"
              placeholder="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Email"
              placeholder="johnDoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Téléphone"
              placeholder="Téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" sx={{ mr: 1 }} onClick={handleSubmit}>
          Soumettre
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setToggle(false)}>
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddUser;
