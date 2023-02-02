import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"



export const NothingSelectedView = () => {
    return (
        <Grid
    className="animate__animated animate__fadeIn animate__faster"

            container
            // para el espacio
            spacing={0}
            // esto es como el flexbox
            direction="column"
            alignItems="center"
            justifyContent="center"
            // sx es el style 
            sx={{
                minHeight: 'calc(100vh - 110px)',
                backgroundColor: 'primary.main',
                borderRadius: 3,
            }}
        >

<Grid item xs={12}>
    {/* este es un icono */}
    <StarOutline sx={{fontSize: 100, color:'white'}} />
</Grid>
<Grid item xs={12}>
    <Typography color='white'variant="h5" >
        Selecciona o Crea una entrada
    </Typography>
</Grid>


        </Grid>



    )
}
