import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'providers/AppRouter/routeConfig'
import { type FC } from 'react'

export const AppRouter: FC = () => {
  return (
    <Routes>
      {
        Object.values(routeConfig).map(({ element, path }) => (
          <Route key={path} path={path} element={element}/>
        ))
      }
    </Routes>
  )
}
