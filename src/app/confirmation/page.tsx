import Link from "next/link";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 bg-creme-clair">
      <div className="w-full max-w-sm text-center">
        <div className="size-16 mx-auto mb-4 rounded-full bg-vert-eau flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="size-8 text-vert">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="font-serif text-2xl font-semibold text-encre mb-2">
          Commande confirmée !
        </h1>

        <p className="text-sm text-texte mb-1">
          Merci pour votre commande. Vous recevrez un récapitulatif par email.
        </p>

        <p className="text-sm text-mute mb-6">
          Présentez-vous au point de retrait choisi à la date et au créneau indiqués.
        </p>

        {session_id && (
          <p className="text-[10px] text-mute mb-4">
            Réf. : {session_id.slice(0, 20)}…
          </p>
        )}

        <div className="space-y-2">
          <Link
            href="/boutique"
            className="block w-full rounded-full bg-vert text-creme-clair font-semibold text-sm px-6 py-2.5 transition-colors hover:bg-vert-prof"
          >
            Retour à la boutique
          </Link>
          <Link
            href="/"
            className="block w-full rounded-full border border-ligne text-texte font-medium text-sm px-6 py-2.5 transition-colors hover:bg-creme"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
