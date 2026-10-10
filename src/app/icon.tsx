import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
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
          borderRadius: "8px",
          border: "2px solid #fbbf24",
          color: "#fde047",
          fontFamily: "Georgia, serif",
          fontSize: 17,
          fontWeight: 900,
          letterSpacing: "-1px",
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
