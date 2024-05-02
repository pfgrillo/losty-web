import Divider from "../common/components/Divider";
import SignInForm from "../features/authentication/components/SigInForm";

const SignIn = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-center text-lg p-5">
          Create a new account
        </div>
        <Divider />
        <SignInForm />
      </div>
    </>
  );
};

export default SignIn;
