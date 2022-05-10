import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const Map = () => {
  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFrZXQiLCJhIjoiY2wycTZ5bmVtMDNlbzNubnM2YW5rM3J0aSJ9.BJyV0xNP08sXipMK5SX-HQ`}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />
      <Marker position={[40.8054, -74.0241]} draggable={true} animate={true}>
        <Popup>Hey ! I live here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;


// import { MapContainer, TileLayer,FeatureGroup, Marker, Map, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
// import "leaflet-defaulticon-compatibility";
// import {EditControl} from "react-leaflet-draw"
// import {useRef, useState} from 'react'

// const Box = () => {
//     const [center, setCenter]=useState({lat: 40.8054, lon: 74.0241})
//     const ZOOM_LEVEL = 14
//     const mapRef = useRef();


//     const _onCreated = (e) =>{
//         console.log(e);
//     }
//     const _onDeleted = (e) =>{
//         console.log(e);
//     }
//     const _onEdited = (e) =>{
//         console.log(e);
//     }
//   return (
//     <Map
//       center={center}
//     //   scrollWheelZoom={false}
//       zoom={ZOOM_LEVEL}
//       ref={mapRef}
//       style={{ height: "100vh", width: "60vw" }}
//     >
//         <FeatureGroup>
//             <EditControl
//             position="topright"
//             onCreated={_onCreated}
//             onEdited={_onEdited}
//             onDeleted={_onDeleted}
//             draw={{ 
//                 rectangle: false,
//                 polyline: false,
//                 circle: false,
//                 circlemarker: false, 
//                 marker: false 
//             }}
//             >

//             </EditControl>
//         </FeatureGroup>
//       <TileLayer
//         url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFrZXQiLCJhIjoiY2wycTZ5bmVtMDNlbzNubnM2YW5rM3J0aSJ9.BJyV0xNP08sXipMK5SX-HQ`}
//         attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
//       />
//     </Map>
//   );
// };

// export default Box;