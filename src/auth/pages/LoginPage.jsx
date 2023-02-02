import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// le pongo un sobrenombre para q no me haga conflicto con el otro Link
import { Link as RouterLink } from 'react-router-dom';

import { useForm } from "../../hook";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout"; // donde tengo el codigo reutilizable de las pantallas


const formData ={
  email: '',
  password: '',
};


export const LoginPage = () => {

  //  para disparar el reinicio de los msj de alerta
const checkError = () =>{
  dispatch( chechingErrors() )
}



  // para leer algo del store usamos useselector
  // en la otra parte es el nombre del principal q sale en la extencion de redux
  // // dentro del parentecis va lo q quiero regresar
  const { status, errorMessage } = useSelector(state => state.auth);




  // para memorizar el status por si cambia o no usamos usememo funciona para bloquear los botones
  const isAuthenticating = useMemo(() => status === 'checking', [status]);


  // para hacer el disparo de las acciones 
  const dispatch = useDispatch();

  //  del formulario vamos a tomar
  const { email, password, onInputChange } = useForm(formData)



  //  funcion para recibir datos dl formulario
  const onSubmit = (event) => {
    event.preventDefault();

    // ingresar con email y contraseña paso 3
    // lo q voy a mandar es lo d los parentecis
    dispatch(startLoginWithEmailPassword({ email, password }));
  }

  // acceder con cuenta google
  const onGoogleSignIn = () => {
    //  dispatch para autenticarme con google paso 3
    dispatch(startGoogleSignIn());  // este es un thunks para q sea disparado 

  }


  return (
    // para utilizar la funcion dsd otra pagina
    <AuthLayout title="Login">


      <form onSubmit={onSubmit} 
    className="animate__animated animate__fadeIn animate__faster"

      
      >
        <Grid container>
          {/* Grid de correo */}

          {/* 12 es el tamaño total */}
          <Grid item xs={12} sx={{ mt: 2 }} >
            {/* me va a permitir escribir */}
            <TextField label='Correo'
              type='email'
              placeholder="ingrese su correo"
              // para que tome todo el espacio disponible
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange} />
          </Grid>

          {/* Grid de contraseña */}
          <Grid item xs={12} sx={{ mt: 2 }} width='100%' >
            {/* me va a permitir escribir */}
            <TextField label='Contraseña'
              type='password'
              placeholder="ingrese su contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange} />
          </Grid>


          <Grid container
            // para mostrar el msj de alerta de forma condicional   
            display={!!errorMessage ? '' : 'none'}  
            sx={ { mt:1, mb:1 } }
            >

            <Grid item xs={12} >
              {/* alert importado desd materia */}
              <Alert severity="error"> {errorMessage} </Alert>
            </Grid>
          </Grid>




          {/* Grid de botones  */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} >
            {/* sm son pantallas mas grandes y solo tomaria la mitad por eso el 6 */}
            <Grid item xs={12} sm={6} >
              {/* Button importados desd materia */}
              <Button
                // como el isAuthenticating esta igualando a true entoncs es como q dice disabled=true
                disabled={isAuthenticating}
                type="submit" variant="contained" fullWidth >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} >
              {/* Button importados desd materia */}
              <Button
                disabled={isAuthenticating}
                onClick={onGoogleSignIn} variant="contained" fullWidth >
                <Google />
                {/* sx es un atajo para definir estilos personalizados que tienen acceso al tema. */}
                <Typography sx={{ ml: 1 }}>Google </Typography>

              </Button>
            </Grid>
          </Grid>


          {/* para ir a otra pagina */}
          <Grid container direction='row' justifyContent='end' >
            <Link component={RouterLink} color="inherit" to="/auth/register" onClick={checkError} >
              Crear una cuenta

            </Link>
          </Grid>
        </Grid>
      </form>

    </AuthLayout>

  )
}
