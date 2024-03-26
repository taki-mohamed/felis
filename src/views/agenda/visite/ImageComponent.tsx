import { useState } from "react";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Icon from 'src/@core/components/icon';
import Box from '@mui/material/Box';

interface Photo {
  url: string;
}

export default function ImageComponent({ url }: Photo) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <img
        src={url}
        style={{ width: "20vw", height: "auto", cursor: "pointer", borderRadius: "10px" }}
        onClick={handleClick}
      />

      <Drawer
        open={open}
        anchor='right'
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 500 },
            marginTop: '140px',
            paddingBottom: '20px',
            height: '75%',
            overflow:"hidden"
          }
        }}
      >
        <Box>
          <IconButton
            size='small'
            onClick={handleClose}
            sx={{
              p: '0.438rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
              }
            }}
          >
            <Icon icon='tabler:x' fontSize='1.125rem' />
          </IconButton>
        </Box>

        <img
          src={url}
          style={{ width: "100%", height: "auto", borderRadius: "10px" }}
        />
      </Drawer>
    </>
  );
}
