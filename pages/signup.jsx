import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../hooks';

function SignUp() {
  const router = useRouter();
  const { authenticate } = useContext(UserContext);

  const login = () => {
    authenticate(() => {
      router.back();
    });
  };

  return (
    <div>
      <button type="button" onClick={login}>
        Log in
      </button>
    </div>
  );
}

export default SignUp;
