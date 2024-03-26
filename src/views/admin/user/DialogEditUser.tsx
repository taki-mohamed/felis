// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent } from 'react'

//**Buutoons Imports */

//**Picker Import */
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** MUI Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'


//**form import */
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'



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

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface User {
  poste: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

interface DialogEditUserProps {
  user: User;
  show: boolean;
  setShow: (value: boolean) => void;
}

const DialogEditUser = ({ user, show, setShow }: DialogEditUserProps) => {
  const [firstName, setFirstName] = useState(user.prenom);
  const [lastName, setLastName] = useState(user.nom);
  const [poste, setPoste] = useState(user.poste);
  const [userEmail, setUserEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.telephone);

  // Fonction pour soumettre les données
  const handleSubmit = () => {
    // Réinitialiser les champs après la soumission
    setFirstName('');
    setLastName('');
    setPoste('');
    setUserEmail('');
    setPhone('');
    // Fermer le dialogue
    setShow(false);
  };

  return (
    <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setShow(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 8, textAlign: 'left' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
            <Icon icon='tabler:question-mark' />Éditer Utilisateur
            </Typography>
          </Box>
        <CustomTextField
          fullWidth
          label="Poste"
          value={user.poste}
          onChange={(e) => setPoste(e.target.value)}
        />
        <CustomTextField
          fullWidth
          label="Prénom"
          value={user.prenom}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <CustomTextField
          fullWidth
          label="Nom"
          value={user.nom}
          onChange={(e) => setLastName(e.target.value)}
        />

        <CustomTextField
          fullWidth
          label="Email"
          value={user.email}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <CustomTextField
          fullWidth
          label="Téléphone"
          value={user.telephone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Sauvegarder
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setShow(false)}>
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEditUser;
