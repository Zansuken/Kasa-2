import { FC, useEffect, useState } from "react";
import { Housing } from "./types";
import { requests } from "./api/requests";

const App: FC = () => {
  const [housing, setHousing] = useState<Housing[]>([]);

  useEffect(() => {
    requests.getHousing().then((res) => setHousing(res));
  }, []);
  return (
    <div>
      {housing.map((h) => (
        <div key={h.id}>
          <h1>{h.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default App;
