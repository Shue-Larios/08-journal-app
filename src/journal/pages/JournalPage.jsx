import { AddOutlined } from '@mui/icons-material';
import {  IconButton } from '@mui/material';
 
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
NothingSelectedView
export const JournalPage = () => {

  const dispatch = useDispatch();

  //       para leer algo del store usamos useselector
  // en la otra parte es el nombre del principal q sale en la extencion de redux
  // dentro del parentecis va lo q quiero regresar
  // ocupamos para mostrar los errores de firebase en pantalla
  const { isSaving, active  } = useSelector(state => state.journal);
 
  const onClickNewNote = () => {

    dispatch(startNewNote());
  }


  return (

    <JournalLayout>
      {/* <Typography>Amet ex elit eiusmod tempor eiusmod ipsum in. Elit exercitation ad elit aliqua aliqua minim ipsum velit culpa. Veniam reprehenderit aute consequat proident consequat aliqua sint dolor enim. Reprehenderit officia commodo Lorem do tempor ut in laboris. Ex aute sunt eu ullamco Lorem nisi ipsum irure id sit Lorem et nisi occaecat. Aute adipisicing ex amet minim officia magna velit Lorem adipisicing amet mollit duis. Cillum Lorem proident eu sit non eiusmod nisi voluptate Lorem do ut.Lorem fugiat do non ut laborum occaecat laborum culpa exercitation deserunt.</Typography> */}

      {/* Cuando no hay ninguna nota seleccionada muestro ese componente */}
      {/* <NothingSelectedView /> */}

      {/* si hay nota seleecionada */}
      { ( !!active) // de esta manera lo traformamos a boleano primero es null y luego un objeto
        ? <NoteView />
        : <NothingSelectedView />
      }


      {/* <NoteView /> */}

      {/* icono flotante */}
       <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        {/* icono */}
        <AddOutlined  

         sx={{ fontSize: 30 }}
        />
      </IconButton>

 
    </JournalLayout>


  )
}
