import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientID = '12272273462-h162hm3ubnt0fesqni5r0o5h8co6l7np.apps.googleusercontent.com';
console.log(clientID + " " + import.meta.env.CLIENT_ID)

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientID}>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
)