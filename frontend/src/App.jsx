import { useState } from 'react'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Body from './components/Body'
import HeroSection from './components/HeroSection'
import Login from './components/Login'
import NotFoundPage from './components/404'
import Signup from './components/Signup'
import Temp from './components/Temp'
import {Toaster} from 'react-hot-toast'
import LandingPage from './components/partners_component/landingPage'
import Add_Partners1 from './components/partners_component/Add_Partners_Step1'
import Add_Partners2 from './components/partners_component/Add_Partners_Step2'
import Add_Partners3 from './components/partners_component/Add_Partners_Step3'
import Services from './components/Services'
import All_partners from './components/All_partners'
import Select_partner from './components/Select_partner'


function App() {
  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <Body/>,
      children : [
        {
          path : "/",
          element : <HeroSection/>
        },
        {
          path  : "*",
          element : <NotFoundPage/>
        },
        {
          path  : "/all-partners",
          element : <All_partners/>
        },
        {
          path: "/partner/:id",
          element: <Select_partner/>
        }
      ]
    },
    {
      path  : "/login",
      element : <Login/>
    },
    {
      path  : "/signup",
      element : <Signup/>
    },
    {
      path : "/add-partners",
      element : <LandingPage/>
    },
    {
      path : "/add-partner/step-1",
      element : <Add_Partners1/>
    },
    {
      path : "/add-partner/step-2",
      element : <Add_Partners2/>
    },
    {
      path : "/add-partner/step-3",
      element : <Add_Partners3/>
    },
    {
      path : "/services",
      element : <Services/>
    },
  ])
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster/>
    </>
  )
} 

export default App