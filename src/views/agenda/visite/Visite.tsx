import React, { useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Icon from 'src/@core/components/icon'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { MerchandiserVisite, PointDeVente, Visite } from '../TableStickyHeader'
import DialogEditVisite from './DialogEditVisit'
import SidebarProduit from './ProduitVisite'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material'
import InfoPDV from './InfoPDV'


interface VisitesStatusesColors {
  'to do': string
  doing: string
  done: string
  absent: string
  default: string
}

const visitesStatusesColors: VisitesStatusesColors = {
  'to do': '#E0F2FE',
  doing: '#FFEDD5',
  done: '#D1FAE5',
  absent: '#f74033',
  default: '#fff'
}

const CustomIconButton = styled(IconButton)({
  padding: 0, // Supprimer le rembourrage
  margin: 0, // Supprimer la marge
});

function VisiteComponent({
  visite,
  merchandiser
}: {
  visite: Visite
  merchandiser: MerchandiserVisite['merchandiser']}) {
  const visiteBgColor =
    visitesStatusesColors[visite.statut as keyof typeof visitesStatusesColors] || visitesStatusesColors.default

  const [show, setShow] = useState(false)
  const [showProduit, setShowProduit] = useState(false)
  const [showPDV,setShowPDV]=useState(false)
  const [PDV,setPDV]=useState<PointDeVente>()

  const handleShow =(pdv:any)=>{
    setShowPDV(true)
    setPDV(pdv)
  }

  return (
    <>
      <Card sx={{ backgroundColor: visiteBgColor, alignItems: 'center', position: 'relative' }}>
        {visite.statut === 'done' || visite.statut === 'doing' ? (
          visite.conform ? (
            <Card sx={{ position: 'absolute', left: 0, top: 0, bottom: 0 ,paddingLeft:'0%', backgroundColor: '#BEF264', width: '18px' }}>
              <p
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  color: 'white',
                  position: 'absolute',
                  bottom:"30%",
                  left:"-80%",
                }}
              >
                Conforme
              </p>
            </Card>
          ) : (
            <Card sx={{ position: 'absolute', top: 0, bottom: 0, backgroundColor: '#F11C1C', width: '18px' }}>
              <p
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  color: 'white',
                  left:"-80%",
                  position: 'absolute',
                  bottom:"28%",
                }}
              >
                Non Conforme
              </p>
            </Card>
          )
        ) : null}
        <Grid container sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <CustomIconButton >
          <dfn title='Modifier Visite'><Icon
            icon='tabler:edit'
            fontSize='1.625rem'
            color={visite.statut === 'absent' ? 'white' : '#860C90'}
            onClick={() => setShow(true)}
          /></dfn>
        </CustomIconButton>
        <CustomIconButton>
          <dfn title='Detail Produit'><Icon
            icon='tabler:slideshow'
            fontSize='1.625rem'
            color={visite.statut === 'absent' ? 'white' : '#860C90'}
            onClick={() => setShowProduit(true)}
          />
          </dfn>
          </CustomIconButton>
        </Grid>
        <CardHeader
        title={
          <Typography style={{ color: visite.statut === 'absent' ? 'white' : undefined,display:"flex",justifyContent:"flex-start" }}>
            <Icon icon="tabler:info-circle"
            style={{ color: visite.statut === 'absent' ? 'white' : "#800080",cursor:"pointer" }}
            onClick={()=>handleShow(visite.pointDeVente)}
             />
            {visite.pointDeVente.nom}
          </Typography>
        }
      />
        <CardContent>
          <Typography variant='body2' sx={{ marginBottom: 3.25, color: visite.statut === 'absent' ? 'white' : null }}>
            {visite.h_db} - {visite.h_fin}
          </Typography>
          <Typography variant='body2'  sx={{ display: 'flex', gap: '10px' }}>
            <img src='/images/agenda/calendar.png' width={25} height={25}/>
            <img src='/images/agenda/calendar.png' width={25} height={25}/>
            <img src='/images/agenda/calendar.png' width={25} height={25}/>
            <img src='/images/agenda/calendar.png' width={25} height={25}/>
            <img src='/images/agenda/calendar.png' width={25} height={25}/>
            <img src='/images/agenda/calendar.png' width={25} height={25}/>
          </Typography>
        </CardContent>

        <DialogEditVisite merchandiser={merchandiser} visite={visite} setShow={setShow} show={show} />
        <SidebarProduit showProduit={showProduit} setShowProduit={setShowProduit} visite={visite}/>
      </Card>
      <InfoPDV showPDV={showPDV} setShowPDV={setShowPDV} PDV={PDV}/>
    </>
  )
}

export default VisiteComponent
