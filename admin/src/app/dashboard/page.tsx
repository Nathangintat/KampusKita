"use client";

import { useEffect, useState } from "react";

interface UserData {
  id: number; // Diisi dengan index
  email: string;
  username: string;
  verify_id?: string;
  nim: string;
  kampus: string;
  prodi: string;
  is_verified: boolean;
  imgType: string;
}

interface ApiVerifyResponseItem {
  UserID: number;
  Nim: string;
  ImgType: string;
  IsVerified: boolean;
  KpID: number;
  Email: string;
  Username: string;
}

export default function App() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedKtm, setSelectedKtm] = useState<string | null>(null);
  const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

  useEffect(() => {
    if (!API) {
      console.error("API endpoint belum diset di .env");
      return;
    }

    fetch(`${API}/api/dashboard/verify`)
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Respons bukan JSON. Cek endpoint atau server.");
        }
        return res.json();
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          const transformed = response.data.map(
            (item: ApiVerifyResponseItem, index: number): UserData => ({
              id: index + 1,
              email: item.Email,
              username: item.Username,
              nim: item.Nim,
              kampus: "Belum tersedia",
              prodi: "Belum tersedia",
              is_verified: item.IsVerified,
              imgType: item.ImgType,
            })
          );
          setUsers(transformed);
        }
      })
      .catch((err) => console.error("Gagal mengambil data:", err));
  }, [API]);

  const handleAcc = async (nim: string) => {
    try {
      await fetch(`${API}/api/dashboard/verify/${nim}`, {
        method: "POST",
      });
      setUsers((prev) =>
        prev.map((u) => (u.nim === nim ? { ...u, is_verified: true } : u))
      );
    } catch (err) {
      console.error("Gagal ACC:", err);
    }
  };

  const handleTolak = async (nim: string) => {
    try {
      await fetch(`${API}/api/dashboard/verify/${nim}`, {
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((u) => u.nim !== nim));
    } catch (err) {
      console.error("Gagal Tolak:", err);
    }
  };

  const openKTMModal = (nim: string, imgType = "jpg") => {
    setSelectedKtm(`/public/${nim}.${imgType}`);
  };

  const closeModal = () => {
    setSelectedKtm(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard Validasi - KampusKita</h1>
        <button
          onClick={() => {
            // Hapus cookie dan redirect ke /login
            document.cookie =
              "logged_in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/";
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="rounded-xl border border-gray-700 bg-gray-800 shadow-md overflow-auto">
        <table className="min-w-full text-sm divide-y divide-gray-700">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="px-2 py-3">ID</th>
              <th className="px-4 py-3">NIM</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Kampus</th>
              <th className="px-4 py-3">Prodi</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">KTM</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.nim} className="hover:bg-gray-700">
                <td className="px-2 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.nim}</td>
                <td className="px-4 py-3">{user.username || "-"}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.kampus}</td>
                <td className="px-4 py-3">{user.prodi}</td>
                <td className="px-4 py-3">
                  {user.is_verified ? (
                    <span className="text-green-400">Verified</span>
                  ) : (
                    <span className="text-yellow-400">Pending</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => openKTMModal(user.nim, user.imgType)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                  >
                    Lihat KTM
                  </button>
                </td>
                <td className="px-4 py-3 flex justify-center gap-2">
                  {!user.is_verified && (
                    <>
                      <button
                        onClick={() => handleAcc(user.nim)}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs"
                      >
                        ACC
                      </button>
                      <button
                        onClick={() => handleTolak(user.nim)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-xs"
                      >
                        Tolak
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal KTM */}
      {selectedKtm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-4 max-w-md w-full relative">
            <h2 className="text-xl mb-2 text-center">Kartu Tanda Mahasiswa</h2>
            <img src={selectedKtm} alt="KTM" className="w-full rounded" />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-xl font-bold hover:text-red-500"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
