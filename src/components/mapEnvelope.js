import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-draw/dist/leaflet.draw.css";
import { Button } from '@mui/material';
import toast from 'react-hot-toast';

import { useRef, useState, useEffect } from "react";

import {EditControl} from "react-leaflet-draw"
const Map = (props) => {
  const mapUpdate = props.mapUpdate;
  const [center, setCenter] = useState()
  const [mapLayers, setMapLayers] = useState([])
  const [saved, setSaved] = useState(true)

  const mapRef = useRef()
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('layers'))
      if (data){
        let polygon=[];
        data.lat_lngs.forEach((lat_lngs) => 
          polygon = [...polygon, [lat_lngs.lat, lat_lngs.lng]]
        );
        setMapLayers(layers => [...layers, [polygon]])
        setCenter({lat : polygon[0][0], lng : polygon[0][1]});
      }
      else {
        setMapLayers([])
        setCenter({lat: 45.53, lng:  -73.62})
      }
  },[mapUpdate])
  
  const purpleOptions = { color: 'purple' }

    const _onCreated = (e) =>{
        const {layerType, layer} = e;
        if (layerType === "polygon") {
          const {_leaflet_id} = layer;
          setMapLayers(layers => [...layers, {id: _leaflet_id, lat_lngs: layer.getLatLngs()[0]}]);
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
      localStorage.setItem('layersEnvelope', JSON.stringify(mapLayers[mapLayers.length - 1]))
      toast.success("Saved!")
      setSaved(true)
    }

  return (
    <>
    {center && <MapContainer center={center} zoom={11} scrollWheelZoom={false} ref={mapRef} style={{ height: "80vh", width: "100%" }}>
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
      <Polygon pathOptions={purpleOptions} positions={mapLayers} />
    </MapContainer>}
    <Button variant="text" onClick={save}  disabled={saved}>SAVE</Button>
    </>
    );
  };

export default Map;