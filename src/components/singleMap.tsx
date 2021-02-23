import { useState } from "react";
import Link from "next/link";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
interface IHouse {
  id: string;
  latitude: number;
  longitude: number;
}
interface IProps {
  house: IHouse;
  nearby: IHouse[];
}
export default function SingleMap({ house, nearby }: IProps) {
  const [viewport, setViewport] = useState({
    latitude: house.latitude,
    longitude: house.longitude,
    zoom: 13,
  });
  console.log(house);
  return (
    <div className="text-black">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px)"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
        scrollZoom={false}
        minZoom={8}
      >
        <div className="absolute top-0 left-0 p-4">
          <NavigationControl showCompass={false} />
        </div>
        <Marker
          latitude={house.latitude}
          longitude={house.longitude}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <button
            type="button"
            style={{ width: 30, height: 30, fontSize: "30px" }}
          >
            <img src="/home-color.svg" className="w-8" alt="Selected house" />
          </button>
        </Marker>
        {nearby.map((nearHouse) => (
          <Marker
            key={nearHouse.id}
            latitude={nearHouse.latitude}
            longitude={nearHouse.longitude}
            offsetLeft={-15}
            offsetTop={-15}
          >
            <Link href={`/houses/${nearHouse.id}`}>
              <a style={{ width: 30, height: 30, fontSize: "30px" }}>
                <img src="/home-solid.svg" className="w-8" alt="Nearby house" />
              </a>
            </Link>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}
