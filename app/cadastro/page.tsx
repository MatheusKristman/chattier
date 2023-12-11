import { RegisterForm } from "./components/register-form";
import { RegisterIllustration } from "./components/register-illustration";

const RegisterPage = () => {
    return (
        <section className="w-full h-full px-6 flex items-center justify-between">
            <RegisterForm />
            <RegisterIllustration />
        </section>
    );
};

export default RegisterPage;
