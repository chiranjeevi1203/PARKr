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
        const marker = new maplibregl.Marker({ color: "#ff214d" })
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
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
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
            background: "#e6f2ff",
            border: "1px solid #ddd",
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
              navigate("/login");
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
                  }}
                >
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
