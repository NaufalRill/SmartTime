import React from "react";

export default function UbahProgres() {
  return (
    <div className="w-full min-h-screen bg-white p-4 font-sans">
      {/* Header */}
      <h1 className="text-4xl font-bold text-indigo-700">Ubah Progres</h1>
      <div className="w-full h-[2px] bg-indigo-200 mt-2" />

      {/* Notifikasi Card */}
      <div className="mt-6 bg-indigo-700 text-white rounded-3xl p-6 shadow-md">
        <div className="flex items-center gap-2 text-xl font-semibold mb-4">
          <span>🔔</span>
          <p>Notifikasi</p>
        </div>

        {/* List */}
        <div className="flex justify-between items-center py-2">
          <p>Rekayasa Interaksi</p>
          <span className="text-green-400 text-xl">✔</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <p>Pra Skripsi</p>
          <span className="text-green-400 text-xl">✔</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <p>Praktikum PKPL</p>
          <span className="text-green-400 text-xl">✔</span>
        </div>

        {/* Button */}
        <button className="w-full bg-white text-indigo-700 font-semibold py-2 rounded-full mt-4 shadow">
          Simpan
        </button>
      </div>

      {/* Statistik */}
      <h2 className="text-center text-2xl font-semibold text-gray-700 mt-8">
        Stastistik Tugas
      </h2>

      <div className="mt-4 text-gray-800 text-lg">
        <div className="flex justify-between py-1">
          <p>Tugas Selesai</p>
          <p>2</p>
        </div>
        <div className="flex justify-between py-1">
          <p>Tugas Berjalan</p>
          <p>3</p>
        </div>
        <div className="flex justify-between py-1">
          <p>Tugas Belum Dimulai</p>
          <p>1</p>
        </div>
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center mt-6">
        <div className="relative w-40 h-40">
          <div className="w-full h-full rounded-full border-8 border-gray-300" />
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-indigo-700 border-t-transparent rotate-[140deg]" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-gray-700">
            40%
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="w-full fixed bottom-0 left-0 bg-white shadow-inner py-3 flex justify-around text-3xl">
        <span>🏠</span>
        <span>💼</span>
        <span className="text-4xl">➕</span>
        <span>🔔</span>
        <span>⚙️</span>
      </div>
    </div>
  );
}
