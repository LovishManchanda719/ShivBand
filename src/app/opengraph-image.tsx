import { ImageResponse } from "next/og";

// Shareable preview card for WhatsApp, Facebook and Google Discover (1200x630).
export const alt = "Shiv Band & Light House — Wedding Band, Ghodi, Baggi, Dhol & Lights, Krishna Nagar, Delhi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          background: "#5A1520",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #B8893B",
            borderRadius: 28,
            color: "#F8F4EE",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 8, color: "#D9B66F", textTransform: "uppercase" }}>
            Since 1996 · Krishna Nagar, Delhi
          </div>
          <div style={{ fontSize: 120, marginTop: 24, fontFamily: "serif", lineHeight: 1 }}>Shiv Band</div>
          <div style={{ fontSize: 56, marginTop: 8, fontFamily: "serif", fontStyle: "italic", color: "#F1E4C8" }}>
            &amp; Light House
          </div>
          <div style={{ fontSize: 24, marginTop: 40, letterSpacing: 5, textTransform: "uppercase", color: "#F8F4EE" }}>
            Wedding Band · Ghodi · Baggi · Dhol · Lights
          </div>
          <div style={{ fontSize: 26, marginTop: 28, color: "#D9B66F" }}>+91 98186 26259</div>
        </div>
      </div>
    ),
    size
  );
}
