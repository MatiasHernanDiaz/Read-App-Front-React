import { useRouteError } from "react-router-dom"


export default function ErrorScreen() {
  const error = useRouteError() as { statusText: string, message: string };
  

  return (
    <div id="error-page">
      <h1>Captura de error</h1>
      <p>Por favor, tomar captura del error y enviarlo a los desarrolladores.</p>
      <p>
        <i>{(error.statusText || error.message) as string}</i>
      </p>
    </div>
  );
}