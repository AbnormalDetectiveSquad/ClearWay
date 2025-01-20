import React, { useEffect } from "react";

interface MarkerData {
  lat: number;
  lng: number;
}

const Map = () => {
  useEffect(() => {
    const initMap = () => {
      if (!window.naver) {
        console.error("Naver Maps script not loaded!");
        return;
      }

      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.498095, 127.027610), // 강남역 37.498095, 경도는 127.027610
        zoom: 15,
        pinchZoom: false
      });

      const addMarkers = (map: naver.maps.Map, markerArray: MarkerData[]) => {
        markerArray.forEach(({ lat, lng }) => {
          const position = new window.naver.maps.LatLng(lat, lng);

          const marker = new window.naver.maps.Marker({
            position,
            map,
            icon: {
              content: `<div style="
                background-color: white;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 5px 10px;
                font-size: 14px;
                font-weight: bold;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              ">
                5분 뒤 막힘 ☠
              </div>`,
            },
          });

          // 마커 클릭 이벤트 추가
          window.naver.maps.Event.addListener(marker, "click", () => {
            map.setCenter(position);
            map.setZoom(16);
          });
        });
      };

      // 마커 데이터를 전달하여 함수 호출
      const markerData: MarkerData[] = [
        { lat: 37.5664298, lng: 126.9927248 },
        { lat: 37.5744584, lng: 126.9579311 }, // 독립문역
        { lat: 37.559722, lng: 126.975278 }, // 숭례문
      ];
      addMarkers(map, markerData);

      const trafficLayer = new window.naver.maps.TrafficLayer();
      trafficLayer.setMap(map);
    };

    if (window.naver) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=n5kchb8qxu";
      script.async = true;
      script.onload = () => initMap();
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <div
        id="map"
        style={{
          width: "75%",
          height: "70vh",
          margin: "2rem auto",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
};

export default Map;
