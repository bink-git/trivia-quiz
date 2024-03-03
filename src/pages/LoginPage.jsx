import LoginForm from "@/LoginForm";
import GuestAuth from "@/components/GuestAuth";

const LoginPage = () => {
  return (
    <div>
      <h2 className="mb-5 text-center text-xl font-bold text-white">
        To start the game, enter your email, please
      </h2>
      <LoginForm />
      <GuestAuth />
    </div>
  );
};

export default LoginPage;
