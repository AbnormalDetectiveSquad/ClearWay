import { useState, useEffect } from "react";
import axios from "axios";

interface TrafficData {
  link_id: string;
  speed: number;
  start_logitude: number
  start_latitude: number
  middle_logitude: number
  middle_latitude: number
  end_logitude: number
  end_latitude: number
  year_avg_speed: number
}

const useTrafficData = () => {
  const [data, setData] = useState<TrafficData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFormattedTime = () => {
    const now = new Date();
  
    // 5분 전 시간 계산
    now.setMinutes(now.getMinutes() - 5);
  
    // 년, 월, 일, 시간, 분, 초 가져오기
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
  
    // 포맷된 문자열 반환
    return `${year}-${month}-${day}%20${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fiveMinuteAgo = getFormattedTime()
        const response = await axios.get<TrafficData[]>(`http://localhost:8000/prediction/${fiveMinuteAgo}`, {
        });
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to fetch traffic data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useTrafficData;