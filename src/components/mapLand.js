import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-draw/dist/leaflet.draw.css";
import {Button} from '@mui/material';
import toast from "react-hot-toast";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl';
import dynamic from "next/dynamic";

// import Map from 'react-map-gl';

import { useRef, useState, useEffect } from "react";

import {EditControl} from "react-leaflet-draw"
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';


const Map = (props) => {
  const [saved, setSaved] = useState(true)

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

mapboxgl.accessToken =  "pk.eyJ1IjoibWFrZXQiLCJhIjoiY2wycTZ5bmVtMDNlbzNubnM2YW5rM3J0aSJ9.BJyV0xNP08sXipMK5SX-HQ"
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  
useEffect(() => {
  if (!map.current) return; // wait for map to initialize
  map.current.on('move', () => {
  setLng(map.current.getCenter().lng.toFixed(4));
  setLat(map.current.getCenter().lat.toFixed(4));
  setZoom(map.current.getZoom().toFixed(2));
  });
  });

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem('layers'))
  //     if (data){
  //       data.zoom && setZoom(data.zoom)
  //       let polygon=[];
  //       data.lat_lngs.forEach((lat_lngs) => 
  //         polygon = [...polygon, [lat_lngs.lat, lat_lngs.lng]]
  //       );
  //       setMapLayers(layers => [...layers, [polygon]])
  //       setCenter({lat : polygon[0][0], lng : polygon[0][1]});
  //     }
  //     else {
  //       setMapLayers([])
  //       setCenter({lat: 45.53, lng:  -73.62})
  //     }
  // },[mapUpdate])

  const mapRef = useRef()

    // useEffect(() => {

    //   const { current = {} } = mapRef;
    //   const { _layers: map } = current;
    //   console.log(mapRef)

    //   const map = current;

    //   if ( !map ) return;

    //   const control = geosearch();

    //   control.addTo(map);

    //   control.on('results', handleOnSearchResuts);

    //   return () => {
    //     control.off('results', handleOnSearchResuts);
    //   }
    // }, [mapRef]);
    


  function handleOnSearchResuts(data) {
    console.log('Search results', data);
  }

    const _onCreated = (e) =>{
        const {layerType, layer} = e;
        if (layerType === "polygon") {
          const {_leaflet_id} = layer;
          setMapLayers(layers => [...layers, {id: _leaflet_id, lat_lngs: layer.getLatLngs()[0], zoom: layer._mapToAdd._animateToZoom}]);
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
      localStorage.setItem('layers', JSON.stringify(mapLayers[mapLayers.length - 1]))
      setMapUpdate((prev) => !prev)
      toast.success("Saved!")
      setSaved(true)
    }

  return (
    <>
    
<div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
    <div ref={mapContainer} className="map-container" style={{"height" : "400px"}} />
    {/* {center && <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} ref={mapRef} style={{ height: "100vh", width: "60vw" }}>
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
    </MapContainer>} */} 
    <Button variant="text" onClick={save} disabled={saved}>SAVE</Button>
    </>
    );
  };

export default Map;