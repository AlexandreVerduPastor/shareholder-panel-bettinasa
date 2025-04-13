"use client";

import { useEffect, useState } from "react";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CTRDashboardPdf() {
  const [files, setFiles] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastYear, setLastYear] = useState(0);

  useEffect(() => {
    setLastYear(new Date(Date.now()).getFullYear() - 1);

    const fetchPDFs = async () => {
      try {
        const res = await fetch("/api/pdf/list-files");
        const data = await res.json();
        if (data.files) setFiles(data.files);
      } catch (error) {
        console.error("Error al obtener los PDFs", error);
      } finally {
       
        setLoading(false);
      }
    };

    fetchPDFs();
  }, []);

  const downloadPDF = async (fileName: string) => {
    const res = await fetch(`/api/pdf/download?file=${fileName}`);
    const data = await res.json();
    if (data.url) window.open(data.url, "_blank");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">
        Documentos Bettinasa <strong>{lastYear}</strong>
      </h1>

      {loading ? (
        <p className="text-center">Cargando archivos...</p>
      ) : files.length === 0 ? (
        <p className="text-center text-gray-500">No hay archivos disponibles</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
          {files.map((file) => (
            <div
              key={file.name}
              className="bg-white cursor-pointer shadow-lg rounded-xl p-4 flex flex-col items-center 
                         transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div className="relative group w-full">
                  <h2 className="text-lg font-semibold truncate w-full text-center">
                    {file.name}
                  </h2>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-max bg-gray-800 text-white text-xs rounded px-2 py-1 group-hover:block">
                    {file.name}
                  </span>
                </div>
            
              <button
                onClick={() => downloadPDF(file.name)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 
                           hover:bg-red-600 transition-all active:scale-95"
              >
                Descargar{" "}
                <FontAwesomeIcon
                  icon={faFilePdf}
                  className="transition-transform hover:rotate-12"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
