"use client"

export function CountryMap() {
  return (
    <div className="rounded-lg bg-[#0f1f3a] p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Goal 2 Completions by Country</h3>
        <p className="text-sm text-[#8b9bb3]">last 30 days</p>
      </div>
      <div className="relative h-[300px]">
        {/* World Map SVG */}
        <svg viewBox="0 0 1000 500" className="h-full w-full">
          {/* Simplified world map paths with color coding */}
          {/* North America - High activity */}
          <path
            d="M150,80 L180,70 L220,75 L240,90 L250,110 L240,130 L220,140 L200,145 L180,140 L160,130 L150,110 Z"
            fill="#ff6b9d"
            opacity="0.8"
          />
          <path
            d="M160,150 L180,145 L200,150 L210,165 L205,180 L190,185 L170,180 L160,165 Z"
            fill="#ff8fb3"
            opacity="0.7"
          />

          {/* South America - Medium activity */}
          <path
            d="M220,200 L235,195 L245,205 L250,225 L245,250 L235,270 L225,280 L215,275 L210,255 L215,230 Z"
            fill="#ffb3cc"
            opacity="0.6"
          />

          {/* Europe - High activity */}
          <path
            d="M480,90 L500,85 L520,90 L530,100 L525,115 L510,120 L490,115 L480,105 Z"
            fill="#ff6b9d"
            opacity="0.8"
          />

          {/* Africa - Medium activity */}
          <path
            d="M490,140 L510,135 L530,145 L540,165 L535,190 L520,210 L500,220 L485,215 L480,190 L485,165 Z"
            fill="#ffb3cc"
            opacity="0.6"
          />

          {/* Asia - Very High activity */}
          <path
            d="M600,80 L650,75 L700,85 L720,100 L710,125 L680,135 L650,130 L620,120 L600,105 Z"
            fill="#ff4d7d"
            opacity="0.9"
          />
          <path
            d="M620,140 L660,135 L690,145 L700,165 L690,185 L660,190 L630,180 L620,160 Z"
            fill="#ff6b9d"
            opacity="0.8"
          />

          {/* Australia - Low activity */}
          <path
            d="M750,280 L780,275 L800,285 L805,305 L795,320 L770,325 L750,315 L745,295 Z"
            fill="#ffd9e6"
            opacity="0.5"
          />

          {/* Grid lines for reference */}
          <line x1="0" y1="250" x2="1000" y2="250" stroke="#1a2f4a" strokeWidth="1" opacity="0.3" />
          <line x1="500" y1="0" x2="500" y2="500" stroke="#1a2f4a" strokeWidth="1" opacity="0.3" />
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 rounded bg-gradient-to-r from-[#ffd9e6] to-[#ff4d7d]"></div>
            <div className="flex gap-8 text-xs text-[#8b9bb3]">
              <span>0</span>
              <span>200</span>
              <span>400</span>
              <span>600</span>
            </div>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded bg-[#1a2f4a] text-white hover:bg-[#2a3f5a]">
            +
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded bg-[#1a2f4a] text-white hover:bg-[#2a3f5a]">
            −
          </button>
        </div>
      </div>
    </div>
  )
}
