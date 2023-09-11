import React, { type FC } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import classes from './navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC = ({ className }: NavbarProps) => {
  return (
    <div className={clsx(classes.navbar, className)}>
      <div className={classes.links}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};
