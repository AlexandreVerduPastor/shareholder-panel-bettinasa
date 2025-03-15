"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";

const LoginPage = () => {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <LoginContent />
        </Suspense>
    );
};

const LoginContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const error = searchParams.get("error");
        if (error) {
            const message = process.env[`NEXT_PUBLIC_${error}`] || "Error desconocido";
            setErrorMessage(message);
        }
    }, []);

    useEffect(() => {
        if (errorMessage) {
            showToast("error", errorMessage);
        }
    }, [errorMessage]);

    const showToast = (type: "success" | "error", message: string) => {
        toast.custom(
            <div className={`p-4 rounded-md shadow-md ${type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
                {message}
            </div>,
            { position: "top-right", duration: 5000 }
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        const res = await signIn("credentials", { email, password, redirect: false });

        if (res?.error) {
            router.push(`/login?error=CredentialsSignin`);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="hidden lg:flex items-center justify-center flex-1 bg-black bg-opacity-50 relative">
                <div className="absolute inset-0 bg-[url('/images/_DSC0629-min.jpg')] bg-cover bg-center opacity-30"></div>
            </div>

            {/* Formulario de login */}
            <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-2 text-black text-center">Bettinasa</h1>
                    <p className="text-sm text-gray-500 text-center">Accede al panel de control</p>

                    <form onSubmit={handleSubmit} className="mt-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="text" id="email" name="email"
                                className="bg-white text-black mt-1 p-2 w-full border rounded-md focus:border-gray-300 focus:ring-2 focus:ring-gray-200"/>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input type="password" id="password" name="password"
                                className="bg-white text-black mt-1 p-2 w-full border rounded-md focus:border-gray-300 focus:ring-2 focus:ring-gray-200"/>
                        </div>

                        <div className="mt-6">
                            <button type="submit"
                                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors duration-300">
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default LoginPage;
