"use client";

import { logout } from "@/app/admin/actions";

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="text-xs text-creme/70 hover:text-creme-clair transition-colors"
    >
      Déconnexion
    </button>
  );
}
