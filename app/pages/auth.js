import React, { useEffect, useState } from 'react';
import fetch from 'universal-fetch';
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  const { verificationToken } = router.query;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`/api/auth/${verificationToken}`, {
        method: 'PATCH',
      });
      setStatus(response.status);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading
        ? 'Loading...'
        : (() => {
          switch (status) {
            case 406: {
              return <div>Verification token expired</div>;
            }
            case 404: {
              return <div>Verification token not found</div>;
            }
            case 204: {
              return <div>Session verified</div>;
            }
            default:
            case 500: {
              return <div>Interal server error ;_;</div>;
            }
          }
        })()}
    </>
  );
};

export default Auth;
