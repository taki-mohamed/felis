// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'

const Home = () => {
  const homeState = useSelector<RootState>(state => state.home)
  console.log(homeState)
  return (
    <Grid container spacing={6}>
      hello world
    </Grid>
  )
}

export default Home
