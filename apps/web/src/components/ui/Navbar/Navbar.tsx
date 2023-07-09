import { Link } from 'react-router-dom'
import clsx from 'clsx'
import classes from './Navbar.module.scss'
import { type FC } from 'react'

interface NavbarProps {
  className?: string
}

export const Navbar: FC = ({ className }: NavbarProps) => {
  return (
    <div className={clsx(classes.navbar, className)}>
      <div className={classes.links}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  )
}
