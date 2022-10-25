import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader } from '../components'
import { PrivateRoute } from './PrivateRoute'
import { RouterList } from './routerList'

const GamePage = lazy(() => import('../pages/Game'))
const SignInPage = lazy(() => import('../pages/SignIn'))
const SignUpPage = lazy(() => import('../pages/SignUp'))
const ForumPage = lazy(() => import('../pages/Forum'))
const ProfilePage = lazy(() => import('../pages/Profile'))
const LeaderBoardPage = lazy(() => import('../pages/LeaderBoard'))
const ServerErrorPage = lazy(() => import('../pages/ServerError'))
const NotFoundPage = lazy(() => import('../pages/NotFound'))

export function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={RouterList.HOME}>
          <Route path={RouterList.SIGN_IN} element={<SignInPage />} />
          <Route path={RouterList.SIGN_UP} element={<SignUpPage />} />
          <Route path={RouterList.SERVER_ERROR} element={<ServerErrorPage />} />
          <Route path={RouterList.NOT_FOUND} element={<NotFoundPage />} />
          <Route path={RouterList.FORUM} element={<ForumPage />} />
          <Route path={RouterList.FORUM_ID} element={<ForumPage />} />
          <Route
            index
            element={
              <PrivateRoute>
                <GamePage />
              </PrivateRoute>
            }
          />
          <Route
            path={RouterList.GAME}
            element={
              <PrivateRoute>
                <GamePage />
              </PrivateRoute>
            }
          />
          <Route
            path={RouterList.PROFILE}
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path={RouterList.PROFILE_EDIT}
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path={RouterList.LEADER_BOARD}
            element={
              <PrivateRoute>
                <LeaderBoardPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  )
}
