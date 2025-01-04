import React, { useEffect } from "react";

interface MarkerData {
  lat: number;
  lng: number;
}

const App = () => {
  useEffect(() => {
    const initMap = () => {
      if (!window.naver) {
        console.error("Naver Maps script not loaded!");
        return;
      }

      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울 중심
        zoom: 14,
      });

      const addMarkers = (map: naver.maps.Map, markerArray: MarkerData[]) => {
        markerArray.forEach(({ lat, lng }) => {
          const position = new window.naver.maps.LatLng(lat, lng);

          const marker = new window.naver.maps.Marker({
            position,
            map,
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
        { lat: 37.5665, lng: 126.978 },
        { lat: 37.57, lng: 126.982 },
        { lat: 37.564, lng: 126.975 },
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
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Clear Way</h1>
      <div
        id="map"
        style={{
          width: "75%",
          height: "70vh",
          margin: "4rem auto",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
};

export default App;
