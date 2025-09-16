import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import maplibregl from "maplibre-gl";

const center = [77.5946, 12.9716]; // [lng, lat] → Bengaluru

function ParkrPage() {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [location, setLocation] = useState(center);
  const [vehicleType, setVehicleType] = useState("CAR");
  const [searchInput, setSearchInput] = useState("");

  const MAPTILER_KEY = "PrvqpBlOxWXo2tomfOzV";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (map.current) return; // initialize only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=${MAPTILER_KEY}`,
      center: location,
      zoom: 12,
    });

    new maplibregl.Marker().setLngLat(location).addTo(map.current);
  }, [MAPTILER_KEY, location]);

  // 🔍 Handle Search restricted to Bengaluru
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput) return;

    try {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          searchInput
        )}.json?key=${MAPTILER_KEY}&bbox=77.460,12.834,77.772,13.139`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setLocation([lng, lat]);

        // Update map position
        map.current.flyTo({ center: [lng, lat], zoom: 14 });

        // Add marker
        new maplibregl.Marker().setLngLat([lng, lat]).addTo(map.current);
      } else {
        alert("No results found within Bengaluru 🚫");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Location:", location);
    console.log("Vehicle Type:", vehicleType);
    // → Send to backend API
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Panel */}
      <div
        style={{
          width: "350px",
          padding: "20px",
          background: "#fff",
          flexShrink: 0,
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Find a Space</h2>

        {/* Search Bar */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter Bengaluru location"
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#000",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            Search
          </button>
        </form>

        {/* Vehicle Selector */}
        <form onSubmit={handleSubmit}>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          >
            <option value="CAR">CAR</option>
            <option value="BIKE">BIKE</option>
            <option value="OTHER">OTHER</option>
          </select>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#000",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            background: "#f5f5f5",
            border: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Map Panel */}
      <div style={{ flexGrow: 1 }}>
        <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}

export default ParkrPage;
