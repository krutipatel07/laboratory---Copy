import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-draw/dist/leaflet.draw.css";
import {Button} from '@mui/material';
import toast from "react-hot-toast";
import { useRef, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Box } from '@mui/material';
import {EditControl} from "react-leaflet-draw"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const Map = (props) => {
  const mapUpdate = props.mapUpdate;
  const setMapUpdate = props.setMapUpdate;
  const [center, setCenter] = useState()
  const [mapLayers, setMapLayers] = useState([])
  const [polygon, setPolygon] = useState([])
  const [saved, setSaved] = useState(true)
  const blueOptions = { color: 'blue' }
  const [zoom, setZoom] = useState(11)
  const [searchQuery, setSearchQuery] = useState([]);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('layers'))
    const center = JSON.parse(localStorage.getItem('center'))
      if (data){
        data.zoom && setZoom(data.zoom)
        let polygon=[];
        data.lat_lngs.forEach((lat_lngs) => 
          polygon = [...polygon, [lat_lngs.lat, lat_lngs.lng]]
        );
        setMapLayers(layers => [...layers, [polygon]])
       center ? setCenter(center) : setCenter({lat : polygon[0][0], lng : polygon[0][1]});
      }
      else {
        setMapLayers([])
        center ? setCenter(center) : setCenter({lat: 45.53, lng:  -73.62})
      }
  },[mapUpdate])
  
  const mapRef = useRef()

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

    const _onDrawVertex  = (e) =>{
      const {layers: {_layers}} = e;
      console.log(_layers);
    }

    const save = () => {
      localStorage.setItem('layers', JSON.stringify(polygon[polygon.length - 1]))
      setMapUpdate((prev) => !prev)
      toast.success("Saved!")
      setSaved(true)
    }

    const getCoordinates = (e) => {
      e.preventDefault();
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=pk.eyJ1IjoibWFrZXQiLCJhIjoiY2wycTZ5bmVtMDNlbzNubnM2YW5rM3J0aSJ9.BJyV0xNP08sXipMK5SX-HQ`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
    }

  return (
    <>
    <Box sx={{mb:2}}>
      <form 
      >
        <TextField
          id="search-bar"
          className="text"
          onChange={(e) => {
            setSearchQuery([])
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=pk.eyJ1IjoibWFrZXQiLCJhIjoiY2wycTZ5bmVtMDNlbzNubnM2YW5rM3J0aSJ9.BJyV0xNP08sXipMK5SX-HQ`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              data.features.forEach(data => setSearchQuery(search => [...search, {
                place_name : data.place_name,
                center : data.center
              }])
              );
            })
          }}
          label="Enter a city name"
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton type="submit" aria-label="search" onClick={getCoordinates}>
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

    {center && <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} ref={mapRef} style={{ height: "70vh", width: "100%"  }}>
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
          onDrawVertex={_onDrawVertex}
          draw={{ 
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false, 
              marker: false ,
              layer: null
          }}>
          </EditControl>
      </FeatureGroup>
      <Polygon pathOptions={blueOptions} positions={mapLayers} />
    </MapContainer>}
    <Button variant="text" onClick={save} disabled={saved}>SAVE</Button>
    </>
    );
  };

export default Map;