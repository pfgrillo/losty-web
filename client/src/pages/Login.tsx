import Divider from "../common/components/Divider";
import LoginForm from "../features/authentication/components/LoginForm";

const Login = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-center text-3xl font-bold">Welcome back!</div>
        <div className="text-center text-lg p-5">
          Log in to your account
        </div>
        <Divider />
        <LoginForm />
        <div className="text-center p-5">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:text-indigo-500">
            Register now
          </a>
          </div>
      </div>
    </>
  );
};

export default Login;
