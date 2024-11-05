import { useEffect } from 'react'

export const useInitialize = (initialCallBack: () => void) => {//inicializa lo que mando por parametro (peticion al back)
  useEffect(() => {
    initialCallBack() //aca esta la funcion a inicializar (es generico)
  }, [])
}
