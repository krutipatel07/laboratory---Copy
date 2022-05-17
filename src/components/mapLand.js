import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import { useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-draw/dist/leaflet.draw.css";
import {Button} from '@mui/material';
import toast from "react-hot-toast";

import { useRef, useState, useEffect } from "react";

import {EditControl} from "react-leaflet-draw"
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';


const Map = (props) => {
  const mapUpdate = props.mapUpdate;
  const setMapUpdate = props.setMapUpdate;
  const [center, setCenter] = useState()
  const [mapLayers, setMapLayers] = useState([])
  const [saved, setSaved] = useState(true)
  const blueOptions = { color: 'blue' }
  const [zoom, setZoom] = useState(11)
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('layers'))
      if (data){
        data.zoom && setZoom(data.zoom)
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

  const mapRef = useRef()

    // useEffect(() => {
    //   const { current = {} } = mapRef;
    //   const { leafletElement: map } = current;
    //   // const map = current;

    //   if ( !map ) return;

    //   const control = geosearch();

    //   control.addTo(map);

    //   control.on('results', handleOnSearchResuts);

    //   return () => {
    //     control.off('results', handleOnSearchResuts);
    //   }
    // }, []);
    


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

    // const _onSearch = (e) => {

    //   var searchLayer = L.layerGroup().addTo(map);
    //   //... adding data in searchLayer ...
    //   map.addControl( new L.Control.Search({layer: searchLayer}) );
    //   //searchLayer is a L.LayerGroup contains searched markers
    // //   var searchControl = new L.Control.Search({
    // //     layer: poiLayers,
    // //     initial: false,
    // //     propertyName: 'name', // Specify which property is searched into.
    // //     moveToLocation: function(latlng, title, map) {
    // //       var zoom;
    // //       if (latlng.layer.feature.geometry.type == 'Polygon') {
    // //         zoom = map.getBoundsZoom(latlng.layer.getBounds());
    // //         lastStateLayerFound = latlng.layer;
    // //         }
    // //       else {
    // //         lastStateLayerFound = null;
    // //         zoom = 15;
    // //       }
    // //       map.setView(latlng, zoom);
    // //   }
    // //   });
    // //   searchControl.on('search:locationfound', function(e) {
    // //     if (e.layer.feature.geometry.type == 'Polygon')
    // //       e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});       
    // //     if(e.layer._popup)
    // //         e.layer.openPopup();
    
    // // }).on('search:collapsed', function(e) {
    // //     if (lastStateLayerFound) {
    // //       us_statesLayer.resetStyle(lastStateLayerFound);
    // //     }
    // // });
    
    // // map.addControl(searchControl); 

    // }



    const save = () => {
      localStorage.setItem('layers', JSON.stringify(mapLayers[mapLayers.length - 1]))
      setMapUpdate((prev) => !prev)
      toast.success("Saved!")
      setSaved(true)
    }

  return (
    <>
    {center && <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} ref={mapRef} style={{  height: "80vh", width: "100%" }}>
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
          // onSearch={_onSearch}
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