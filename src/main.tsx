import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './global.css'
import Home from './pages'
import Preview from './pages/preview'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      {/* All pages are going to be in the /preview path for the time being,
          will be moved outside to the index path after the app is usable.*/}
      <Route path='/preview'>
        <Route index element={<Preview />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
