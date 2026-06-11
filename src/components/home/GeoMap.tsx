"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type LocationTier = "current" | "ideal" | "open" | "ask";

const COUNTRY_FILLS: Record<string, LocationTier> = {
  "276": "ideal",   // Germany
  "826": "open",    // United Kingdom
  "840": "open",    // United States
  "250": "open",    // France
  "528": "open",    // Netherlands
  "40":  "open",    // Austria
  "756": "open",    // Switzerland
  "784": "open",    // UAE (Dubai)
  "616": "open",    // Poland
  "203": "open",    // Czech Republic
};

const TIER_COLORS: Record<LocationTier, string> = {
  current: "#6366f1",
  ideal:   "#10b981",
  open:    "#6366f133",
  ask:     "#f59e0b22",
};

const MARKERS = [
  { name: "Chemnitz", coordinates: [12.93, 50.83] as [number, number], tier: "current" as LocationTier, label: "📍 Now" },
  { name: "Berlin", coordinates: [13.4, 52.52] as [number, number], tier: "ideal" as LocationTier, label: "🎯 Ideal" },
  { name: "Dubai", coordinates: [55.3, 25.2] as [number, number], tier: "open" as LocationTier, label: "✓ Open" },
];

const LEGEND = [
  { tier: "current" as LocationTier, label: "Current location (Chemnitz)" },
  { tier: "ideal" as LocationTier, label: "Ideal destination (Germany)" },
  { tier: "open" as LocationTier, label: "Also open to (EU · UK · US · UAE)" },
];

export function GeoMap() {
  return (
    <section className="py-20 px-4 border-t">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Open to opportunities</h2>
          <p className="mt-2 text-muted-foreground">
            Based in Chemnitz, Germany — targeting roles in Germany, open to EU · UK · US · UAE
          </p>
        </div>

        <div className="rounded-2xl border overflow-hidden bg-muted/30">
          <ComposableMap
            projectionConfig={{ center: [20, 45], scale: 420 }}
            width={800}
            height={380}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const tier = COUNTRY_FILLS[geo.id as string];
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={tier ? TIER_COLORS[tier] : "var(--muted)"}
                      stroke="var(--border)"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: tier ? TIER_COLORS[tier] : "var(--muted-foreground)/20" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {MARKERS.map(({ name, coordinates, tier, label }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle r={5} fill={TIER_COLORS[tier]} stroke="white" strokeWidth={1.5} />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{ fontSize: "9px", fill: "var(--foreground)", fontFamily: "inherit" }}
                >
                  {label}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mt-4">
          {LEGEND.map(({ tier, label }) => (
            <div key={tier} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span
                className="w-3 h-3 rounded-sm inline-block shrink-0"
                style={{ background: TIER_COLORS[tier] }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
