import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useNavigate, useLocation } from "react-router-dom";
import parkingData from "../data/parkingData";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

function ParkingMap() {
  const navigate = useNavigate();
  const locationHook = useLocation();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [selected, setSelected] = useState(null);

  const MAPTILER_KEY = "PrvqpBlOxWXo2tomfOzV";

  // ✅ Get searched area from ParkrPage
  const searchArea = locationHook.state?.searchArea || "";

  // ✅ Filter parkingData based on searched area
  const filteredParking = parkingData.filter(
    (spot) => spot.area?.toLowerCase() === searchArea.toLowerCase()
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (map.current) return;

    // Default center if no parking spots
    const defaultCenter = filteredParking.length
      ? [filteredParking[0].longitude, filteredParking[0].latitude]
      : [77.5946, 12.9716];

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/winter-v2/style.json?key=${MAPTILER_KEY}`,
      center: defaultCenter,
      zoom: filteredParking.length ? 15 : 12,
    });

    if (filteredParking.length > 0) {
      const bounds = new maplibregl.LngLatBounds();

      filteredParking.forEach((spot) => {
        const marker = new maplibregl.Marker({ color: "#fb1717ff" })
          .setLngLat([spot.longitude, spot.latitude])
          .setPopup(new maplibregl.Popup().setText(spot.name))
          .addTo(map.current);

        marker.getElement().addEventListener("click", () => {
          setSelected(spot);
        });

        markers.current.push(marker);
        bounds.extend([spot.longitude, spot.latitude]);
      });

      map.current.fitBounds(bounds, { padding: 100 });
    }
  }, [filteredParking]);

  return (
    <div style={{ display: "flex", height: "100vh"}}>
      {/* Sidebar */}
      <div
        style={{
          width: "350px",
          padding: "20px",
          background: "#fff",
          flexShrink: 0,
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          {searchArea ? `${searchArea} Parking` : "Parking"}
        </h2>

        <button
          onClick={() => navigate("/parkrpage")}
          style={{
            width: "100%",
            padding: "12px",
            background: "#1a1919ff",
            border: "1px solid #ddd",
            color: "#fff",
            cursor: "pointer",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            fontWeight: "500",
          }}
        >
          Back to PARKr
        </button>

        <div style={{ marginTop: "auto" }}>
          <button
            onClick={() => navigate("/profile")}
            style={{
              width: "100%",
              padding: "12px",
              background: "#e6f2ff",
              border: "1px solid #ddd",
              cursor: "pointer",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              fontWeight: "500",
            }}
          >
            <FaUser style={{ marginRight: "10px" }} />
            Profile
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            style={{
              width: "100%",
              padding: "12px",
              background: "#f5f5f5",
              border: "1px solid #ddd",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              fontWeight: "500",
            }}
          >
            <FaSignOutAlt style={{ marginRight: "10px" }} />
            Logout
          </button>
        </div>
      </div>

      {/* Map and Parking Details */}
      <div style={{ flexGrow: 1, padding: "10px", display: "flex", flexDirection: "column" }}>
        <div
          ref={mapContainer}
          style={{ width: "100%", height: "50%", borderRadius: "12px", overflow: "hidden" }}
        />

        <div style={{ marginTop: "10px", flexGrow: 1, overflowY: "auto" }}>
          {filteredParking.length > 0 ? (
            filteredParking.map((spot, i) => (
              <div
                key={i}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  background: selected?.name === spot.name ? "#e6f2ff" : "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelected(spot);
                  map.current.flyTo({
                    center: [spot.longitude, spot.latitude],
                    zoom: 16,
                  });
                }}
              >
                <div>
                  <strong>{spot.name}</strong>
                  <p style={{ margin: "2px 0", fontSize: "12px" }}>
                    📍 Lat: {spot.latitude}, Lng: {spot.longitude}
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${spot.latitude},${spot.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    background: "#4285F4",
                    padding: "6px 10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {/* Google Maps SVG Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14"
                    viewBox="0 0 512 512"
                    width="14"
                    fill="white"
                  >
                    <path d="M256 0C114.836 0 0 114.836 0 256c0 141.165 114.836 256 256 256s256-114.835 256-256C512 114.836 397.164 0 256 0zM154.8 422.7c-35.1-25.2-59.7-65.6-65.9-111.7l95.6-73.8c15.7 27.6 35.6 56.7 59.6 86.2l-89.3 99.3zm166.1-5.2c-36.6-11.3-71.9-35.2-106.1-70.7l89.4-99.4c25.3 28.8 51.6 55.6 79.4 80.1-13.9 33.1-36.3 63.3-62.7 90zm42.9-136.8c-25.6-22.9-50.8-48.4-75.2-76.1l96.6-74.5c18.1 32.3 27.9 69.2 27.9 108.3 0 13.7-1.4 27.1-4 40.1-14.1 1.4-28.8 2-45.3 2.2zM256 61.1c40.2 0 77.8 11.4 109.3 31.1L268 166.9c-28.6-33.1-53.2-66.2-75.3-98.3 19.3-5.6 40-8.5 63.3-8.5zm-98.6 35.3c19.5 27.5 43.5 58.3 72.6 92.4L116.3 262c-6.5-21-10.2-43.4-10.2-66 0-36.9 9.7-71.7 27.3-101.2z" />
                  </svg>
                  Google Maps
                </a>
              </div>
            ))
          ) : (
            <p>No parking results found for "{searchArea}"</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ParkingMap;
