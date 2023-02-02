import { AutoFixNormal } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// le pongo un sobrenombre para q no me haga conflicto con el otro Link
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from "../../hook";
import { checkingAuthentication, startCreatingUserWithEmailPassword } from "../../store/auth";
import { AuthLayout } from "../layout/AuthLayout"; // donde tengo el codigo reutilizable de las pantallas
// import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

const formData = {

  displayName: '',
  email: '',
  password: '',
}





export const RegisterPage = () => {

  // para hacer el disparo de las acciones 
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  // para leer algo del store usamos useselector
  // en la otra parte es el nombre del principal q sale en la extencion de redux
  // // dentro del parentecis va lo q quiero regresar
  // ocupamos para mostrar los errores de firebase en pantalla
  const { status, errorMessage } = useSelector(state => state.auth)



  //  para disparar el reinicio de los msj de alerta
  const checkError = () => {
    dispatch(chechingErrors())
  }

  // para memorizar el status por si cambia o no usamos usememo funciona para bloquear los botones
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])


  // de manera dinamica mandamos nuestras validaciones
  // Validacion de formulario Parte 1
  const formValidations = {
    // tiene que ir los mmismo nombres del objeto del formulario
    // aca validamos si el campo email tiene una @
    email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    // para ver si el campo password tieene mas de 6 caracteres
    password: [(value) => value.length >= 6, 'La contraseña debe de tener mas de 6 letras'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
  }


  //  del formulario vamos a tomar
  const {
    formState, displayName, email, password, onInputChange, onResetForm,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);



  //  funcion para recibir datos dl formulario
  const onSubmit = (event) => {
    // dispatch(checkingAuthentication());
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return; // por si mandan el formulario vacio
    // Para registrar usuario Paso 3
    dispatch(startCreatingUserWithEmailPassword(formState)) // le mando el formState xk tiene toda la data
  }

  // acceder con cuenta google
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }



  return (
    // para utilizar la funcion dsd otra pagina



    <AuthLayout title="Crear cuenta" >
    
      {/* <h1> FormValid: {isFormValid ? 'Válido' : 'Incorrecto'} </h1> */}
      <form onSubmit={onSubmit}



      // className="animate__animated animate__fadeIn animate__faster"

      >
        <Grid container
         className="animate__animated animate__fadeIn animate__faster"
        >
          {/* Grid de nombre completo */}
          {/* 12 es el tamaño total */}
          <Grid item xs={12} sx={{ mt: 2 }} >
            {/* me va a permitir escribir */}
            <TextField label='Nombre'
              name="displayName"
              type='text'
              placeholder="Nombre Completo"
              // para que tome todo el espacio disponible
              fullWidth
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted} // error de material ui           
              helperText={displayNameValid}    // muestra el msj de alerta
            />
          </Grid>
          {/* Grid de correo */}
          {/* 12 es el tamaño total */}
          <Grid item xs={12} sx={{ mt: 2 }} >
            {/* me va a permitir escribir */}
            <TextField label='Correo'
              name="email"
              type='email'
              placeholder="ingrese su correo"
              // para que tome todo el espacio disponible
              fullWidth
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted} // error de material ui
              helperText={emailValid} // muestra el msj de alerta
            />
          </Grid>

          {/* Grid de contraseña */}
          <Grid item xs={12} sx={{ mt: 2 }} width='100%' >
            {/* me va a permitir escribir */}
            <TextField label='Contraseña'
              name="password"
              type='password'
              placeholder="ingrese su contraseña"
              fullWidth
              value={password}
              onChange={onInputChange}

              error={!!passwordValid && formSubmitted} // error de material ui
              display={!!errorMessage ? '' : 'none'}

              helperText={passwordValid} // muestra el msj de alerta
            />

          </Grid>

          {/* Grid de botones  */}

          <Grid container spacing={2} sx={{ mb: 2 }} >
            {/* sm son pantallas mas grandes y solo tomaria la mitad por eso el 6 */}
            <Grid item xs={12} sx={{ mt: 1, mb: 1 }}
              // para mostrar el msj de alerta de forma condicional
              display={!!errorMessage ? '' : 'none'}
            >
              {/* alert importado desd materia */}
              <Alert severity="error"> {errorMessage} </Alert>
            </Grid>
            <Grid item xs={12} >
              {/* Button importados desd materia */}
              <Button
                type="submit" variant="contained" sx={{ mb: 2, mt: 2 }} fullWidth disabled={isCheckingAuthentication}>
                Crear Cuenta
              </Button>
            </Grid>

          </Grid>

          <Button onClick={onResetForm} >
            <AutoFixNormal />
            Limpiar
          </Button>


          {/* para ir a otra pagina */}
          <Grid container direction='row' justifyContent='end' >
            <Typography sx={{ mr: 1 }}>  ¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login" onClick={checkError} >
              Ingresar

            </Link>
          </Grid>
        </Grid>
      </form>

   
    </AuthLayout >
  )
}
