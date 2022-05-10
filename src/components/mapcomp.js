import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-draw/dist/leaflet.draw.css";

import { useRef, useState } from "react";

import {EditControl} from "react-leaflet-draw"
const Map = () => {
  const [center, setCenter] = useState({lat: 24.4539, lng: 54.3773})
  const [mapLayers, setMapLayers] = useState([])

  const mapRef = useRef()

  const multiPolygon = [
    [[51.505, -0.09],
      [-2123, -616],
      [ -2157, -550],
      [-2119, -501],
      [-2084, -538 ],
      [  -2069, -609]
    ],
  ]
  
  const fillBlueOptions = { fillColor: 'blue' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }

    const _onCreated = (e) =>{
        const {layerType, layer} = e;
        if (layerType === "polygon") {
          const {_leaflet_id} = layer;
          setMapLayers(layers => [...layers, {id: _leaflet_id, lat_lngs: layer.getLatLngs()[0]}]);
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

    console.log(mapLayers)
  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false} ref={mapRef} style={{ height: "100vh", width: "60vw" }}>
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
      <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
    </MapContainer>
    );
  };

export default Map;