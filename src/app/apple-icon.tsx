import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#7A1F2B",
          borderRadius: "38px",
          border: "6px solid #B8893B",
          color: "#F1E4C8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 86,
            fontWeight: 900,
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          SB
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "2px",
            marginTop: 4,
            color: "#fef08a",
          }}
        >
          SHIV BAND
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
