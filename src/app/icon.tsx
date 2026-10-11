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
          background: "#7A1F2B",
          borderRadius: "42px",
          border: "10px solid #B8893B",
          color: "#F1E4C8",
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
