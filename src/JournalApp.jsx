 

import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme/AppTheme'
 
export const JournalApp = () => {
  return (
   <>
   {/* usamos el AppTheme */}
  <AppTheme>
   {/* sistema de rutas principal */}
   <AppRouter />
  </AppTheme>
 
   
   </>

   
   
  )
}
