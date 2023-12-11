import { LoginForm } from "./components/login-form";
import { LoginIllustration } from "./components/login-illustration";

const LoginPage = () => {
    return (
        <section className="w-full h-full px-6 flex items-center justify-between">
            <LoginIllustration />
            <LoginForm />
        </section>
    );
};

export default LoginPage;
