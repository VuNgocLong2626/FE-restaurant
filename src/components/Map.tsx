"use client";

import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { useEffect } from "react";
import { Style, Icon } from "ol/style";

const MapPage = () => {
  const longitude = 105.70929050445557;
  const latitude = 9.296078658389673;

  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    const iconStyle = new Style({
      image: new Icon({
        src: "marker-icon.png", // Path to your custom icon image
        scale: 1, // Adjust the scale as needed
      }),
    });

    const pointFeature = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
    });
    pointFeature.setStyle(iconStyle); // Apply the icon style to the point feature
    vectorSource.addFeature(pointFeature);
    const view = map.getView();
    view.setCenter(fromLonLat([longitude, latitude]));
    view.setZoom(16);
    return () => {
      map.setTarget("");
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default MapPage;
