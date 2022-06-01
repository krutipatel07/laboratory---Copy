import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-draw/dist/leaflet.draw.css";
import toast from 'react-hot-toast';
import { useRef, useState, useEffect } from "react";
import {EditControl} from "react-leaflet-draw"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, TextField, Box, IconButton
} from '@mui/material';

const Map = (props) => {
  const mapUpdate = props.mapUpdate;
  const setMapUpdate = props.setMapUpdate;
  const [center, setCenter] = useState()
  const [mapLayers, setMapLayers] = useState([])
  const [polygon, setPolygon] = useState([])
  const [mapLayersEnvelope, setMapLayersEnvelope] = useState([])
  const [saved, setSaved] = useState(true)
  const [zoom, setZoom] = useState(11)
  const [searchQuery, setSearchQuery] = useState([]);

  const mapRef = useRef()
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('layers'))
    const envelope = JSON.parse(localStorage.getItem('layersEnvelope'))
    const center = JSON.parse(localStorage.getItem('center'))
      if (data){
        data.zoom ? setZoom(data.zoom) : setZoom(16)
        let polygon=[];
        data.lat_lngs.forEach((lat_lngs) => 
          polygon = [...polygon, [lat_lngs.lat, lat_lngs.lng]]
        );
        setMapLayers(layers => [...layers, [polygon]])
        center && setZoom(18)
        center ? setCenter(center) : setCenter({lat : polygon[0][0], lng : polygon[0][1]});
      }
      else {
        setMapLayers([])
        center && setZoom(18)
        center ? setCenter(center) : setCenter({lat: 45.53, lng:  -73.62})
      } 
      
      if (envelope){
        envelope.zoom && setZoom(envelope.zoom)
        let polygon=[];
        envelope.lat_lngs.forEach((lat_lngs) => 
          polygon = [...polygon, [lat_lngs.lat, lat_lngs.lng]]
        );
        setMapLayersEnvelope(layers => [...layers, [polygon]])
      }
      else {
        setMapLayersEnvelope([])
      } 
  },[mapUpdate])
  
  const blueOptions = { color: 'blue' }
  const purpleOptions = { color: 'purple' }

  const handleChange = (e) =>{
    setSearchQuery([])
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=pk.eyJ1IjoibWFrZXQiLCJhIjoiY2wycTZ5bmVtMDNlbzNubnM2YW5rM3J0aSJ9.BJyV0xNP08sXipMK5SX-HQ`)
    .then(response => response.json())
    .then(data => {
      data.features.forEach(data => setSearchQuery(search => [...search, {
        place_name : data.place_name,
        center : data.center
      }])
      );
    })
  }

    const _onCreated = (e) =>{
        const {layerType, layer} = e;
        if (layerType === "polygon") {
          const {_leaflet_id} = layer;
          setPolygon(layers => [...layers, {id: _leaflet_id, lat_lngs: layer.getLatLngs()[0], zoom: layer._mapToAdd._animateToZoom}]);
          setSaved(false)
        }
    }

    const _onDeleted = (e) =>{
        const {layers: {_layers}} = e;
        Object.values(_layers).map(({_leaflet_id}) => {
          setMapLayers(layers => layers.filter(l => l.id !== _leaflet_id));
        })
    }

    const _onEdited = (e) =>{
        const {layers: {_layers}} = e;
        Object.values(_layers).map(({_leaflet_id, editing}) => {
          setMapLayers(layers => 
            layers.map(l => l.id === _leaflet_id 
              ? {...l, lat_lngs: {...editing.latlngs[0]}} 
              : l
              )
          )
        })
    }
    
    const save = () => {
      localStorage.setItem('layersEnvelope', JSON.stringify(polygon[polygon.length - 1]))
      toast.success("Saved!")
      setMapUpdate((prev) => !prev)
      setSaved(true)
    }

    const getCoordinates = (e) => {
      e.preventDefault();
      if(searchQuery.length){
        localStorage.setItem('center', JSON.stringify({lat : searchQuery[0].center[1], lng : searchQuery[0].center[0]}))
        setMapUpdate((prev) => !prev)
        return
      }
      toast.error("No address found")
    }

  return (
    <>
    <Box sx={{mb:2}}>
      <form 
      >
        <TextField
          id="search-bar"
          className="text"          
          onChange={handleChange}
          label="Enter a city name"
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton type="submit" aria-label="search"  onClick={getCoordinates}>
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </form>
    </Box>

    {searchQuery.length ? 
      <List>
        { searchQuery.map((search,i) => (
            <ListItem
              onClick={ () =>{ 
                localStorage.setItem('center', JSON.stringify({lat : search.center[1], lng : search.center[0]}))
                setMapUpdate((prev) => !prev)}
              }
              key={i}
              sx={{
                cursor: "pointer",
                '& + &': {
                  mt: 1
                }
              }}
            >
              <ListItemIcon>
                <LocationOnIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={search.place_name}
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'subtitle2'
                }}
              />
            </ListItem>
        ))}
      </List>: null
    }
    {center && <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} ref={mapRef} style={{ height: "80vh", width: "100%"  }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position="topleft"
          onCreated={_onCreated}
          onEdited={_onEdited}
          onDeleted={_onDeleted}
          draw={{ 
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false, 
              marker: false 
          }}>
          </EditControl>
      </FeatureGroup>
      <Polygon pathOptions={blueOptions} positions={mapLayers} />
      <Polygon pathOptions={purpleOptions} positions={mapLayersEnvelope} />
    </MapContainer>}
    <Button variant="text" onClick={save}  disabled={saved}>SAVE</Button>
    </>
    );
  };

export default Map;