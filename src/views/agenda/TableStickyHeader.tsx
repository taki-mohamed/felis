import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import VisiteComponent from './visite/Visite';
import Button from '@mui/material/Button';
import Icon from 'src/@core/components/icon';
import Typography from '@mui/material/Typography'
import { AnyAaaaRecord } from 'dns';
import InfoMarshandiser from './visite/InfoMarshandiser';


export interface Visite {
  pointDeVente: PointDeVente
  h_db: string
  h_fin: string
  statut: string
  conform: boolean | null
  date: string
}

export interface MerchandiserVisite {
  merchandiser: Utilisateur
  visites: Visite[]
}

export interface Utilisateur {
  nom: string
  prenom: string
  email: string
  telephone: string;
}

export interface PointDeVente {
  nom: string;
  ville: string;
  enseigne: string;
  localisation: string;
}



function createVisite(pointDeVente: PointDeVente, h_db: string, h_fin: string, statut: string, conform: boolean | null, date: string): Visite {
  return { pointDeVente, h_db, h_fin, statut, conform, date };
}

const MarshandiserVisites: MerchandiserVisite[] = [
  {
    merchandiser: { nom: 'Soumia', prenom: 'Zahir', email: 'soumia@gmail.com', telephone: '0710458202' },
    visites: [
      createVisite({ nom: 'Morocco Mall', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "8:00", "12:00", "to do", null, "2024-11-25"),
      createVisite({ nom: 'Marjane Ain Sbaa', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "13:00", "15:00", "done", true, "2024-11-26"),
      createVisite({ nom: 'Carrefour', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "18:00", "21:00", "absent", null, "2024-11-27"),
      createVisite({ nom: 'Bim', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "8:00", "12:00", "done", false, "2024-11-28"),
    ]
  },
  {
    merchandiser: { nom: 'Jihan', prenom: 'Najam', email: 'jihan@gmail.com', telephone: '1234567890' },
    visites: [
      createVisite({ nom: 'Morocco Mall', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "8:00", "12:00", "to do", null, "2024-11-25"),
      createVisite({ nom: 'Marjane Ain Sbaa', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "13:00", "15:00", "absent", null, "2024-11-26"),
      createVisite({ nom: 'Carrefour', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "18:00", "21:00", "doing", true, "2024-11-27"),
      createVisite({ nom: 'Bim', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "8:00", "12:00", "done", false, "2024-11-28"),
    ]
  },
  {
    merchandiser: { nom: 'Aymen', prenom: 'Belkhiri', email: 'aymen@gmail.com', telephone: '0987654321' },
    visites: [
      createVisite({ nom: 'Morocco Mall', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "8:00", "12:00", "doing", null, "2024-11-25"),
      createVisite({ nom: 'Marjane Ain Sbaa', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "13:00", "15:00", "doing", true, "2024-11-26"),
      createVisite({ nom: 'Carrefour', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "18:00", "21:00", "doing", true, "2024-11-27"),
      createVisite({ nom: 'Bim', ville: 'Casa', enseigne: 'enseigne', localisation: 'localisation' }, "8:00", "12:00", "absent", null, "2024-11-28"),
    ]
  }
];




const TableStickyHeader = () => {
  const [showMarshan,setShowMarshan]=useState<boolean>(false)
  const [marshan,setMarshan]=useState<Utilisateur>()

  const setInfo =(marshan:any)=>{
  setShowMarshan(true)
  setMarshan(marshan)
}

  return (
    <>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label='customized table'>
          <TableHead sx={{ backgroundColor: "#EBDEF0" }}>
            <TableRow >
              <TableCell sx={{ color: "#9B59B6" }}>Poste</TableCell>
              <TableCell sx={{ color: "#9B59B6" }}>Visite 1</TableCell>
              <TableCell sx={{ color: "#9B59B6" }}>Visite 2</TableCell>
              <TableCell sx={{ color: "#9B59B6" }}>Visite 3</TableCell>
              <TableCell sx={{ color: "#9B59B6" }}>Visite 4</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MarshandiserVisites.map((row, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={()=>setInfo(row.merchandiser)}>
                  <Icon icon="tabler:info-circle" />
                  </Button>
                  {row.merchandiser.nom}
                  </Typography>
                </TableCell>
                {row.visites.map((singleVisite, i) => (
                  <TableCell sx={{ width: '25%' }} key={i}>
                    <VisiteComponent
                      merchandiser={row.merchandiser}
                      visite={singleVisite}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <InfoMarshandiser showMarshan={showMarshan} setShowMarshan={setShowMarshan} marshandiser={marshan}/>
    </>
  );
};

export default TableStickyHeader;
