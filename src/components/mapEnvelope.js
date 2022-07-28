// import { MapContainer, TileLayer, FeatureGroup, Polygon, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
// import "leaflet-defaulticon-compatibility";
// import "leaflet-draw/dist/leaflet.draw.css";
// import toast from 'react-hot-toast';
// import { useRef, useState, useEffect } from "react";
// import {EditControl} from "react-leaflet-draw"
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   Button,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText, TextField, Box, IconButton
// } from '@mui/material';
// import axios from 'axios'

// const Map = (props) => {
//   const {mapUpdate, setMapUpdate, projectId} = props;
//   const [center, setCenter] = useState()
//   const [mapLayers, setMapLayers] = useState([])
//   const [polygon, setPolygon] = useState([])
//   const [mapLayersEnvelope, setMapLayersEnvelope] = useState([])
//   const [saved, setSaved] = useState(true)
//   const [zoom, setZoom] = useState(11)
//   const [searchQuery, setSearchQuery] = useState([]);
//   const [placeName, setPlaceName] = useState("")
//   const [markerLocations, setMarkerLocations] = useState()

//   const mapRef = useRef()
//   useEffect(async () => {
//     // get layers, envelope layers amd last searched location
//     const project_details = await axios.get(`/api/projects/${projectId}`)
//     .catch(error => console.log(error));
//     const data = project_details.data.data.land_parameters[0]
//     const envelope = project_details.data.data.envelope_parameters[0]
//     const location = JSON.parse(localStorage.getItem('location'))

//     // set placename and center if location is available
//     location && setPlaceName(location.place_name)
//     location && setMarkerLocations(location.center)
    
//     // if layer is available, set coordinates, center and zoom level to display polygon
//       if (data){
//         data.zoom ? setZoom(data.zoom) : setZoom(16)
//         let polygon=[];
//         data.lat_lngs.forEach((lat_lngs) => 
//           polygon = [...polygon, [lat_lngs.lat, lat_lngs.lng]]
//         );
//         setMapLayers(layers => [...layers, [polygon]])
//         location && location.display && setZoom(18)
//         location && location.display ? setCenter(location.center) : setCenter({lat : polygon[0][0], lng : polygon[0][1]});
//       }
//       // set default values if land polygon layer is not available
//       else {
//         setMapLayers([])
//         location && setZoom(18)
//         location ? setCenter(location.center) : setCenter({lat: 45.53, lng:  -73.62})
//       } 
      
//       // if envelope polygon layer is available, set coordinates and zoom level accordingly
//       if (envelope){
//         envelope.zoom && setZoom(envelope.zoom)
//         let polygon=[];
//         envelope.lat_lngs.forEach((lat_lngs) => 
//           polygon = [...polygon, [lat_lngs.lat, lat_lngs.lng]]
//         );
//         setMapLayersEnvelope(layers => [...layers, [polygon]])
//       }
//       else {
//         setMapLayersEnvelope([])
//       } 
//   },[mapUpdate])
  
//   const blueOptions = { color: 'blue' }
//   const purpleOptions = { color: 'purple' }

//   const handleChange = (e) =>{
//     // empty search query before updating
//     setSearchQuery([])
//     // get possible addresses using mapbox and userinput
//     fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=pk.eyJ1IjoibWFrZXQiLCJhIjoiY2wycTZ5bmVtMDNlbzNubnM2YW5rM3J0aSJ9.BJyV0xNP08sXipMK5SX-HQ`)
//     .then(response => response.json())
//     .then(data => {
//       data.features.forEach(data => setSearchQuery(search => [...search, {
//         place_name : data.place_name,
//         center : data.center
//       }])
//       );
//     })
//   }

//   // create and update polygon coordinates on create, delete and edit
//     const _onCreated = (e) =>{
//         const {layerType, layer} = e;
//         if (layerType === "polygon") {
//           const {_leaflet_id} = layer;
//           setPolygon(layers => [...layers, {id: _leaflet_id, lat_lngs: layer.getLatLngs()[0], zoom: layer._mapToAdd._animateToZoom}]);
//           setSaved(false)
//         }
//     }

//     const _onDeleted = (e) =>{
//         const {layers: {_layers}} = e;
//         Object.values(_layers).map(({_leaflet_id}) => {
//           setMapLayers(layers => layers.filter(l => l.id !== _leaflet_id));
//         })
//     }

//     const _onEdited = (e) =>{
//         const {layers: {_layers}} = e;
//         Object.values(_layers).map(({_leaflet_id, editing}) => {
//           setMapLayers(layers => 
//             layers.map(l => l.id === _leaflet_id 
//               ? {...l, lat_lngs: {...editing.latlngs[0]}} 
//               : l
//               )
//           )
//         })
//     }
    
//     const save = async () => {
//       // store last polygon drawn only
//       const envelope_parameters_added = await axios.put(`/api/projects/${projectId}`, {
//         envelope_parameters: polygon[polygon.length - 1]
//       })
//       .catch(error => console.log(error));

//       // update location display condition to false
//       const location = JSON.parse(localStorage.getItem('location'))
//       if (location){
//         location.display = false
//         localStorage.setItem('location', JSON.stringify(location))
//       }
//       envelope_parameters_added ? toast.success("Saved!") : toast.error('Something went wrong!')
//       envelope_parameters_added && setMapUpdate((prev) => !prev)
//       setSaved(true)
//     }

//     const getCoordinates = (e) => {
//       e.preventDefault();
//       if(searchQuery.length){
//         // save searched location and rerender component with display condition true
//         localStorage.setItem('location', JSON.stringify({
//           place_name: searchQuery[0].place_name,
//           display: true,
//           center: {lat : searchQuery[0].center[1], lng : searchQuery[0].center[0]}
//         }))
//         setMapUpdate((prev) => !prev)
//         return
//       }
//       toast.error("No address found")
//     }

//   return (
//     <>
//     <Box sx={{mb:2}}>
//       {/* get address form user */}
//       <form 
//       >
//         <TextField
//           id="search-bar"
//           className="text"          
//           onChange={handleChange}
//           label="Enter a city name"
//           variant="outlined"
//           placeholder="Search..."
//           size="small"
//         />
//         <IconButton type="submit" aria-label="search"  onClick={getCoordinates}>
//           <SearchIcon style={{ fill: "blue" }} />
//         </IconButton>
//       </form>
//     </Box>

//     {/* display possible addresses */}
//     {searchQuery.length ? 
//       <List>
//         { searchQuery.map(search => (
//             <ListItem
//               onClick={ () =>{ 
//                 // save searched location and rerender component with display condition true
//                 localStorage.setItem('location', JSON.stringify({
//                   place_name: search.place_name,
//                   display: true,
//                   center: {lat : search.center[1], lng : search.center[0]}}))
//                 setMapUpdate((prev) => !prev)}
//               }
//               key={search.place_name}
//               sx={{
//                 cursor: "pointer",
//                 '& + &': {
//                   mt: 1
//                 }
//               }}
//             >
//               <ListItemIcon>
//                 <LocationOnIcon fontSize="small" />
//               </ListItemIcon>
//               <ListItemText
//                 primary={search.place_name}
//                 primaryTypographyProps={{
//                   color: 'textPrimary',
//                   variant: 'subtitle2'
//                 }}
//               />
//             </ListItem>
//         ))}
//       </List>: null
//     }

//     {/* render map with desirable center and zoom level */}
//     {center && <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} ref={mapRef} style={{ height: "80vh", width: "100%"  }}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {/* control polygon editor */}
//       <FeatureGroup>
//         <EditControl
//           position="topleft"
//           onCreated={_onCreated}
//           onEdited={_onEdited}
//           onDeleted={_onDeleted}
//           draw={{ 
//               rectangle: false,
//               polyline: false,
//               circle: false,
//               circlemarker: false, 
//               marker: false 
//           }}>
//           </EditControl>
//       </FeatureGroup>
//       {/* display land and envelope polygons saved */}
//       <Polygon pathOptions={blueOptions} positions={mapLayers} />
//       <Polygon pathOptions={purpleOptions} positions={mapLayersEnvelope} />
//       {/* display marker for searched location only */}
//       {markerLocations && <Marker position={markerLocations}>
//         {placeName && <Popup>
//           {placeName}
//         </Popup>}
//       </Marker>}
//     </MapContainer>}
//     <Button variant="text" onClick={save}  disabled={saved}>SAVE</Button>
//     </>
//     );
//   };

// export default Map;