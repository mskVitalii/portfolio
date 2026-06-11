"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WORK_LOCATIONS = [
  {
    name: "Dresden, Germany",
    coordinates: [13.74, 51.05] as [number, number],
    company: "Infineon Technologies",
    period: "2024 – present",
    countryId: "276",
  },
  {
    name: "Remote (Germany)",
    coordinates: [10.0, 51.5] as [number, number],
    company: "onlineTours",
    period: "2023 – 2024",
    countryId: "276",
  },
  {
    name: "Moscow, Russia",
    coordinates: [37.62, 55.75] as [number, number],
    company: "OZON Tech",
    period: "2021 – 2023",
    countryId: "643",
  },
  {
    name: "Remote (Russia)",
    coordinates: [40.0, 56.5] as [number, number],
    company: "WeDo.agency",
    period: "2020 – 2021",
    countryId: "643",
  },
];

const HIGHLIGHTED_COUNTRIES = new Set(["276", "643"]);

export function ProjectsMap() {
  const [active, setActive] = useState<string | null>(null);
  const activeLocation = WORK_LOCATIONS.find((l) => l.name === active);

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-2">Work geography</h2>
      <p className="text-sm text-muted-foreground mb-4">
        5+ years across Russia and Germany — Moscow enterprise scale, then German engineering.
      </p>

      <div className="rounded-2xl border overflow-hidden bg-muted/30 relative">
        <ComposableMap
          projectionConfig={{ center: [35, 52], scale: 380 }}
          width={800}
          height={340}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const highlighted = HIGHLIGHTED_COUNTRIES.has(geo.id as string);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={highlighted ? "#6366f1" : "var(--muted)"}
                    fillOpacity={highlighted ? 0.3 : 1}
                    stroke="var(--border)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {WORK_LOCATIONS.map((loc) => (
            <Marker
              key={loc.name}
              coordinates={loc.coordinates}
              onMouseEnter={() => setActive(loc.name)}
              onMouseLeave={() => setActive(null)}
            >
              <circle
                r={active === loc.name ? 7 : 5}
                fill="#6366f1"
                stroke="white"
                strokeWidth={1.5}
                className="cursor-pointer transition-all"
              />
            </Marker>
          ))}
        </ComposableMap>

        {/* Tooltip */}
        {activeLocation && (
          <div className="absolute bottom-4 left-4 bg-background border rounded-lg px-3 py-2 shadow-lg text-sm">
            <p className="font-semibold">{activeLocation.company}</p>
            <p className="text-muted-foreground text-xs">{activeLocation.name} · {activeLocation.period}</p>
          </div>
        )}
      </div>

      {/* Location legend */}
      <div className="flex flex-wrap gap-4 mt-3">
        {WORK_LOCATIONS.map((loc) => (
          <div key={loc.name} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary inline-block shrink-0" />
            <span><span className="font-medium text-foreground">{loc.company}</span> — {loc.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
