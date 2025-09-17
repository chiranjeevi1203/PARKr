import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import maplibregl from "maplibre-gl";
import {
  FaCar,
  FaMotorcycle,
  FaUser,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import parkingData from "../data/parkingData";

const DEFAULT_CENTER = [77.5946, 12.9716]; // Bengaluru

function ParkrPage() {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  const [location, setLocation] = useState(DEFAULT_CENTER);
  const [vehicleType, setVehicleType] = useState("CAR");
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [filteredParking, setFilteredParking] = useState([]);

  const MAPTILER_KEY = "PrvqpBlOxWXo2tomfOzV";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // Initialize map
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/winter-v2/style.json?key=${MAPTILER_KEY}`,
      center: location,
      zoom: 12,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    map.current.addControl(new maplibregl.ScaleControl(), "bottom-left");
  }, [MAPTILER_KEY, location]);

  const clearMarkers = () => {
    markers.current.forEach((m) => m.remove());
    markers.current = [];
  };

  // Clear everything (input + map markers)
  const handleClear = () => {
    setSearchInput("");
    setSuggestions([]);
    setFilteredParking([]);
    setShowViewDetails(false);
    clearMarkers();

    // Reset map to default Bengaluru center
    map.current.flyTo({ center: DEFAULT_CENTER, zoom: 12 });
  };

  // MapTiler autocomplete with relevance sorting
  useEffect(() => {
    if (searchInput.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(
            searchInput
          )}.json?key=${MAPTILER_KEY}&autocomplete=true&bbox=77.460,12.834,77.772,13.139`
        );
        const data = await response.json();
        const sorted = (data.features || []).sort(
          (a, b) => (b.relevance || 0) - (a.relevance || 0)
        );
        setSuggestions(sorted);
      } catch (err) {
        console.error("Autocomplete error:", err);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const handleSelect = (place) => {
    const [lng, lat] = place.center;
    setLocation([lng, lat]);
    setSearchInput(place.place_name);
    setSuggestions([]);
    clearMarkers();

    map.current.flyTo({ center: [lng, lat], zoom: 14 });

    const marker = new maplibregl.Marker({ color: "#ff214d" })
      .setLngLat([lng, lat])
      .setPopup(new maplibregl.Popup().setText(place.place_name))
      .addTo(map.current);
    markers.current.push(marker);

    setShowViewDetails(true);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    clearMarkers();

    if (!searchInput) return;

    const normalizedSearch = searchInput.trim().toLowerCase();

    // 1️⃣ Check local parkingData first
    const results = parkingData.filter(
      (spot) => spot.area?.toLowerCase() === normalizedSearch
    );

    if (results.length > 0) {
      setFilteredParking(results);
      const bounds = new maplibregl.LngLatBounds();

      results.forEach((spot) => {
        const marker = new maplibregl.Marker({ color: "#ff214d" })
          .setLngLat([spot.longitude, spot.latitude])
          .setPopup(new maplibregl.Popup().setText(spot.name))
          .addTo(map.current);
        markers.current.push(marker);
        bounds.extend([spot.longitude, spot.latitude]);
      });

      map.current.fitBounds(bounds, { padding: 100 });
      setShowViewDetails(true);
      return;
    }

    // 2️⃣ If no local data, fallback to autocomplete API
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
      return;
    }

    // 3️⃣ If no matches at all
    setFilteredParking([]);
    setShowViewDetails(false);
  };

  const vehicleIcon = {
    CAR: <FaCar style={{ marginRight: "8px" }} />,
    BIKE: <FaMotorcycle style={{ marginRight: "8px" }} />,
    OTHER: <FaQuestionCircle style={{ marginRight: "8px" }} />,
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
        <h2 style={{ marginBottom: "20px" }}>Find a Space</h2>

        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search places in Bengaluru"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            outline: "none",
            marginBottom: "10px",
            fontSize: "14px",
          }}
        />

        {suggestions.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 10px 0",
              maxHeight: "200px",
              overflowY: "auto",
              border: "1px solid #ddd",
              background: "#fff",
              zIndex: 1000,
            }}
          >
            {suggestions.map((place) => (
              <li
                key={place.id}
                onClick={() => handleSelect(place)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {place.text || place.place_name}
              </li>
            ))}
          </ul>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            border: "1px solid #ddd",
            padding: "5px 10px",
          }}
        >
          {vehicleIcon[vehicleType]}
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            style={{ flex: 1, padding: "10px", border: "none", outline: "none" }}
          >
            <option value="CAR">CAR</option>
            <option value="BIKE">BIKE</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>

        {/* Search + Clear buttons */}
        <button
          onClick={handleSearch}
          style={{
            width: "100%",
            padding: "12px",
            background: "#000",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Search
        </button>

        <button
          onClick={handleClear}
          style={{
            width: "100%",
            padding: "12px",
            background: "#f5f5f5",
            color: "#000",
            border: "1px solid #ddd",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Clear
        </button>

        {/* View Details button */}
        {showViewDetails && (
          <button
            onClick={() =>
              navigate("/parkingmap", { state: { filteredParking, searchArea: searchInput } })
            }
            style={{
              width: "100%",
              padding: "12px",
              background: "#e6f2ff",
              color: "#000",
              border: "1px solid #ddd",
              cursor: "pointer",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            View Details
          </button>
        )}

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

      {/* Map */}
      <div style={{ flexGrow: 1, padding: "10px" }}>
        <div
          ref={mapContainer}
          style={{ width: "100%", height: "100%", borderRadius: "12px", overflow: "hidden" }}
        />
      </div>
    </div>
  );
}

export default ParkrPage;
