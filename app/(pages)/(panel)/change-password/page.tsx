"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function ChangePasswordModal() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });
  const [isOpen, setIsOpen] = useState(false);

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (newPassword !== confirmPassword) {
      setMessage("Las nuevas contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("Contraseña cambiada correctamente.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsOpen(false);
    } else {
      setMessage(data.error);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Cambiar Contraseña
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Cambiar Contraseña</h2>
              {message && <p className="text-center text-sm mb-4 text-red-500">{message}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Contraseña actual", state: oldPassword, setState: setOldPassword, field: "old" },
                  { label: "Nueva contraseña", state: newPassword, setState: setNewPassword, field: "new" },
                  { label: "Confirmar nueva contraseña", state: confirmPassword, setState: setConfirmPassword, field: "confirm" },
                ].map(({ label, state, setState, field }) => (
                  <div key={field}>
                    <label className="block text-gray-700 font-medium">{label}</label>
                    <div className="mt-2 flex items-center rounded-md bg-white px-3 border border-gray-300 focus-within:border-indigo-600">
                      <input
                        type={showPassword[field] ? "text" : "password"}
                        className="w-full py-1.5 px-1 text-base text-gray-900 placeholder-gray-400 focus:outline-none"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                      <FontAwesomeIcon
                        onClick={() => togglePasswordVisibility(field)}
                        className="ml-2 cursor-pointer"
                        icon={showPassword[field] ? faEye : faEyeSlash}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? "Cambiando..." : "Cambiar Contraseña"}
                </button>
                <button onClick={() => setIsOpen(false)} type="button" className="w-full mt-2 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
                  Cancelar
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}