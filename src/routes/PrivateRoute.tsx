import React from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import {RoutesEnum} from 'routes/RoutesEnum'

const PrivateRoute = ({children}: { children: React.ReactNode }) => {
  const accessToken = Cookies.get('access_token')

  if (!accessToken) {
    return <Redirect to={RoutesEnum.Auth}/>
  }

  return <>{children}</>
}

export default PrivateRoute
