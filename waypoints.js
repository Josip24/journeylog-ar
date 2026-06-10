const WAYPOINTS = [
  { name: 'Mensa',          icon: '🍽',  lat: 48.74190, lng: 9.10010 },
  { name: 'Würfel',         icon: '🎲',  lat: 48.74150, lng: 9.10050 },
  { name: 'Vorlesungssaal', icon: '🎓',  lat: 48.74170, lng: 9.09950 },
  { name: 'Lernwelt',       icon: '📚',  lat: 48.74220, lng: 9.10020 },
];

// Distance in meters between two GPS coordinates
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const f1 = lat1 * Math.PI / 180;
  const f2 = lat2 * Math.PI / 180;
  const df = (lat2 - lat1) * Math.PI / 180;
  const dl = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(df/2) ** 2 + Math.cos(f1) * Math.cos(f2) * Math.sin(dl/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Compass bearing (degrees, 0=North, clockwise) from point 1 to point 2
function gpsBearing(lat1, lon1, lat2, lon2) {
  const f1 = lat1 * Math.PI / 180;
  const f2 = lat2 * Math.PI / 180;
  const dl = (lon2 - lon1) * Math.PI / 180;
  const y = Math.sin(dl) * Math.cos(f2);
  const x = Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl);
  return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}

// Convert GPS bearing + compass heading to A-Frame XZ position
// displayDistance: how far in front of user (meters) to place the arrow
function waypointToXRPosition(bearingDeg, headingDeg, displayDistance = 4) {
  const rel = (bearingDeg - headingDeg + 360) % 360;
  const rad = rel * Math.PI / 180;
  return {
    x: Math.sin(rad) * displayDistance,
    y: 1.6,
    z: -Math.cos(rad) * displayDistance,
  };
}
