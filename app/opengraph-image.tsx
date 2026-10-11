import { ImageResponse } from "next/og";
import {
  LOGO_HEIGHT,
  LOGO_LETTERS,
  LOGO_MARK,
  LOGO_WIDTH,
} from "@/components/logo";
import { SHARE_ALT } from "@/lib/seo";

export const alt = SHARE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BLUE = "#115aa9";
const ORANGE = "#eb6834";
const INK = "#1d1d1f";
const BASELINE = 150;

// A Wi-Fi channel: flat-topped, standing on the baseline.
const channel = (x: number) =>
  `M${x - 70} ${BASELINE} L${x - 61} 44 Q${x - 60} 30 ${x - 50} 30 H${x + 50} Q${x + 60} 30 ${x + 61} 44 L${x + 70} ${BASELINE} Z`;

// The card shown when a page is shared: the logo, what the company makes,
// and the spectrum drawing from the site's footer.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px 0",
        background: "#ffffff",
        color: INK,
      }}
    >
      <svg
        width={LOGO_WIDTH * 0.8}
        height={LOGO_HEIGHT * 0.8}
        viewBox={`0 0 ${LOGO_WIDTH} ${LOGO_HEIGHT}`}
        fill={BLUE}
      >
        {LOGO_MARK.map((d) => (
          <path key={d} d={d} />
        ))}
        <path fillRule="evenodd" d={LOGO_LETTERS} />
      </svg>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
          }}
        >
          <span>Better wireless</span>
          <span>starts in the lab.</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#515154" }}>
          Wi-Fi 7 client emulators · Interference generators · RF test systems
        </div>
      </div>

      <svg width={1040} height={160} viewBox="0 0 1040 160" fill="none">
        <path
          d={channel(110)}
          fill="rgba(25,136,255,0.16)"
          stroke={BLUE}
          strokeWidth={3}
        />
        {[230, 256, 348, 374].map((x) => (
          <rect
            key={x}
            x={x - 4}
            y={48}
            width={8}
            height={BASELINE - 48}
            rx={4}
            fill={ORANGE}
          />
        ))}
        <path
          d={`M276 ${BASELINE} C292 ${BASELINE} 290 56 302 56 C314 56 312 ${BASELINE} 328 ${BASELINE} Z`}
          fill="rgba(235,104,52,0.14)"
          stroke={ORANGE}
          strokeWidth={3}
        />
        <path
          d={channel(520)}
          fill="rgba(25,136,255,0.1)"
          stroke={BLUE}
          strokeWidth={3}
        />
        {[630, 650, 670, 690, 710].map((x) => (
          <rect
            key={x}
            x={x - 4}
            y={40}
            width={8}
            height={BASELINE - 40}
            rx={4}
            fill={ORANGE}
          />
        ))}
        <path
          d={channel(822)}
          fill="rgba(25,136,255,0.1)"
          stroke={BLUE}
          strokeWidth={3}
        />
        <path
          d={channel(968)}
          fill="rgba(25,136,255,0.1)"
          stroke={BLUE}
          strokeWidth={3}
        />
        <path d={`M0 ${BASELINE} H1040`} stroke="#c7c7cc" strokeWidth={2} />
      </svg>
    </div>,
    size,
  );
}
