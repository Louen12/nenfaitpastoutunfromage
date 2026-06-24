"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 bg-creme-clair">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl text-encre font-semibold">
            Back-office
          </h1>
          <p className="text-mute text-sm mt-1">
            N&apos;en fais pas tout un fromage
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-texte mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-ligne bg-off px-3 py-2.5 text-sm text-encre placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-vert/30 focus:border-vert"
              placeholder="artisan@fromage.fr"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-texte mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-ligne bg-off px-3 py-2.5 text-sm text-encre placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-vert/30 focus:border-vert"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-rouge text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-vert text-creme-clair font-semibold text-sm px-6 py-2.5 transition-colors hover:bg-vert-prof disabled:opacity-50"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
