import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Error from './pages/Error';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import More from './pages/More';
import ViewDetails from './pages/ViewDetails';
import SearchResults from './pages/SearchResults';

function App() {

const router = createBrowserRouter(
	createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/view-details/:id" element={<ViewDetails/>} />
      <Route path="/:id/view-more" element={<More />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
)

  return <RouterProvider router={router}/>
}

export default App
