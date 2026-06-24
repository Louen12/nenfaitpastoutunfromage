"use client";

import { useState } from "react";

export default function ImageUpload({
  name = "image",
  currentUrl,
}: {
  name?: string;
  currentUrl?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div>
      <span className="block text-sm font-medium text-texte mb-1">Photo</span>

      {preview && (
        <img
          src={preview}
          alt="Aperçu"
          className="w-full h-40 object-cover rounded-lg mb-2"
        />
      )}

      <label className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-ligne bg-off px-4 py-3 cursor-pointer hover:border-vert/40 transition-colors">
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 text-mute">
          <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614z" />
          <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
        </svg>
        <span className="text-sm text-mute">
          {preview ? "Changer la photo" : "Ajouter une photo"}
        </span>
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleChange}
          className="sr-only"
        />
      </label>

      {currentUrl && (
        <input type="hidden" name="old_image_url" value={currentUrl} />
      )}
    </div>
  );
}
