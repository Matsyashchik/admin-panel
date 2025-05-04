import {Redirect, Route, Switch} from 'react-router-dom'

import {ConnectedRouter} from 'connected-react-router'
import AuthorsPage from 'pages/AuthorsPage'
import LoginPage from 'pages/LoginPage'
import PostsPage from 'pages/PostsPage'
import TagsPage from 'pages/TagsPage'
import NotFoundPage from 'pages/NotFoundPage'

import AdminPanel from 'components/adminPanel/AdminPanel.tsx'

import PrivateRoute from 'routes/PrivateRoute.tsx'
import {RoutesEnum} from 'routes/RoutesEnum'
import {useAppSelector} from 'store/store'
import {history} from 'store/store'

const publicRoutes = [
  {
    path: RoutesEnum.Auth,
    component: LoginPage,
    exact: true,
  },
]

const privateRoutes = [
  {
    path: RoutesEnum.Posts,
    component: PostsPage,
    exact: true,
  },
  {
    path: RoutesEnum.Authors,
    component: AuthorsPage,
    exact: true,
  },
  {
    path: RoutesEnum.Tags,
    component: TagsPage,
    exact: true,
  },
]

const RootRouter = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Redirect to={RoutesEnum.Posts}/> : <Redirect to={RoutesEnum.Auth}/>}
        </Route>

        {publicRoutes.map(({path, component: Component, exact}) => (
          <Route key={path} path={path} exact={exact}>
            <Component/>
          </Route>
        ))}

        {privateRoutes.map(({path, component: Component, exact}) => (
          <Route key={path} path={path} exact={exact}>
            <PrivateRoute>
              <AdminPanel>
                <Component/>
              </AdminPanel>
            </PrivateRoute>
          </Route>
        ))}

        <Route path={RoutesEnum.Another}>
          <PrivateRoute>
            <AdminPanel>
              <NotFoundPage/>
            </AdminPanel>
          </PrivateRoute>
        </Route>
      </Switch>
    </ConnectedRouter>
  )
}

export default RootRouter
