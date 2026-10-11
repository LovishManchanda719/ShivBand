import { ImageResponse } from "next/og";

// Google Search requires favicons to be a multiple of 48px square (48x48, 96x96, 144x144, or 192x192)
export const size = {
  width: 192,
  height: 192,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #7f1d1d 100%)",
          borderRadius: "42px",
          border: "10px solid #fbbf24",
          color: "#fde047",
          fontFamily: "Georgia, serif",
          fontSize: 102,
          fontWeight: 900,
          letterSpacing: "-4px",
        }}
      >
        SB
      </div>
    ),
    {
      ...size,
    }
  );
}
