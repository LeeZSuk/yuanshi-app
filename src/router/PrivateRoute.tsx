import React, { JSX, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import type { AccessType } from './routes.type';
import Login from '@/pages/Login';

type PrivateRouteProps = {
  element: React.ReactNode;
  access: AccessType;
};

const PrivateRoute = (props: PrivateRouteProps) => {
  
  const [canAccess, setCanAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const fn = (result: AccessType) => {
  console.log('3123123',typeof result,result);
      if (typeof result === 'boolean') {
        // boolean
        setCanAccess(result);
      } else if (typeof result === 'object' && typeof result.then === 'function') {
        // Promise<boolean>
        result.then((res) => {
          console.log('res',res);
          setCanAccess(res);
        });
      } else {
        throw new Error('access must be a function or boolean');
      }
    };
    if (typeof props.access === 'function') {      
      fn(props.access());
    } else {
      fn(props.access);
    }
  }, []);

  if ( canAccess === false) {
    return <Navigate to='/login' />
  } 
  return props.element as JSX.Element;
};

export default PrivateRoute;
