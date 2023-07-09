import { Counter } from 'components/complex'
import { AppRouter } from 'providers/AppRouter'
import { Navbar } from 'components/ui'
import EditIcon from 'assets/icons/edit.svg'

import './styles/index.scss'
import { type FC } from 'react'

export const App: FC = () => (
  <div className="app">
    <Navbar/>
    <EditIcon/>
    <Counter/>
    <AppRouter/>
  </div>
)
