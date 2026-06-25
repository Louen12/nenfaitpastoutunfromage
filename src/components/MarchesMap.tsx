"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type Tables } from "@/utils/supabase/database.types";
import { jourLabel } from "@/lib/utils";

type Marche = Tables<"marches">;

function makeIcon(type: string) {
  const color = type === "local_fixe" ? "#b5651d" : "#1d5b3a";
  return L.divIcon({
    className: "",
    iconSize: [28, 38],
    iconAnchor: [14, 38],
    popupAnchor: [0, -34],
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38">
      <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.27 21.73 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="13" r="6" fill="#f4ecd8"/>
    </svg>`,
  });
}

function FitBounds({ marches }: { marches: Marche[] }) {
  const map = useMap();
  const fitted = useRef(false);

  useEffect(() => {
    if (fitted.current) return;
    const pts = marches
      .filter((m) => m.latitude && m.longitude)
      .map((m) => [m.latitude!, m.longitude!] as [number, number]);
    if (pts.length === 0) return;
    fitted.current = true;
    if (pts.length === 1) {
      map.setView(pts[0], 13);
    } else {
      map.fitBounds(L.latLngBounds(pts), { padding: [40, 40] });
    }
  }, [map, marches]);

  return null;
}

export default function MarchesMap({
  marches,
  onSelectForRetrait,
}: {
  marches: Marche[];
  onSelectForRetrait?: (id: string) => void;
}) {
  const geoMarches = marches.filter((m) => m.latitude && m.longitude);

  if (geoMarches.length === 0) {
    return (
      <div className="mx-4 rounded-xl bg-vert-eau/30 h-[70vh] flex items-center justify-center">
        <p className="text-sm text-mute">Aucun marché géolocalisé.</p>
      </div>
    );
  }

  const center: [number, number] = [
    geoMarches[0].latitude!,
    geoMarches[0].longitude!,
  ];

  return (
    <div className="mx-4 rounded-xl overflow-hidden" style={{ height: "70vh" }}>
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds marches={geoMarches} />

        {geoMarches.map((m) => (
          <Marker
            key={m.id}
            position={[m.latitude!, m.longitude!]}
            icon={makeIcon(m.type)}
          >
            <Popup minWidth={200} maxWidth={260}>
              <div style={{ fontFamily: "Inter, sans-serif" }}>
                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 14, color: "#1a1a17" }}>
                  {m.nom}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "#6b6b5f" }}>
                  {m.commune}
                  {m.departement ? ` (${m.departement})` : ""}
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b6b5f" }}>
                  {m.jour_semaine !== null ? jourLabel(m.jour_semaine) : ""}
                  {m.heure_debut && m.heure_fin
                    ? ` · ${m.heure_debut.slice(0, 5)}–${m.heure_fin.slice(0, 5)}`
                    : ""}
                </p>
                {m.adresse && (
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#9b9b8f" }}>
                    {m.adresse}
                  </p>
                )}
                <p style={{ margin: "6px 0 0" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 600,
                      background: m.type === "local_fixe" ? "#b5651d20" : "#d7ebe0",
                      color: m.type === "local_fixe" ? "#b5651d" : "#145230",
                    }}
                  >
                    {m.type === "local_fixe" ? "Local fixe" : "Itinérant"}
                  </span>
                </p>
                {m.point_retrait && onSelectForRetrait && (
                  <button
                    onClick={() => onSelectForRetrait(m.id)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: 8,
                      padding: "6px 0",
                      borderRadius: 999,
                      border: "none",
                      background: "#1d5b3a",
                      color: "#f4ecd8",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Commander pour ce retrait
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
