// import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useDebounce } from "use-debounce";
import Layout from "src/components/layout";
import Map from "src/components/map";
import { useLocalState } from "src/utils/useLocalState";
import HouseList from "src/components/houseList";
import { useLastData } from "src/utils/useLastData";
// import { useLocalState } from "src/utils/useLocalState";
import { HousesQuery, HousesQueryVariables } from "src/generated/HousesQuery";

type BoundsArray = [[number, number], [number, number]];

const HOUSES_QUERY = gql`
  query HousesQuery($bounds: BoundsInput!) {
    houses(bounds: $bounds) {
      id
      latitude
      longitude
      address
      publicId
      bedrooms
    }
  }
`;
const parseBounds = (boundsString: string) => {
  const bounds = JSON.parse(boundsString);
  return {
    sw: {
      latitude: bounds[0][1],
      longitude: bounds[0][0],
    },
    ne: {
      latitude: bounds[1][1],
      longitude: bounds[1][0],
    },
  };
};

export default function Home() {
  const [dataBounds, setDataBounds] = useLocalState<string>(
    "bounds",
    "[[0,0],[0,0]]"
  );
  const [debouncedDataBounce] = useDebounce(dataBounds, 200);
  const { data, error } = useQuery<HousesQuery, HousesQueryVariables>(
    HOUSES_QUERY,
    {
      variables: { bounds: parseBounds(debouncedDataBounce) },
    }
  );
  const lastData = useLastData(data);
  if (error) {
    return <Layout main={<div>Error loading houses</div>} />;
  }
  return (
    <Layout
      main={
        <div className="flex">
          <div
            className="w-1/2 pb-4"
            style={{ maxHeight: "calc(100vh - 64px)", overflowY: "scroll" }}
          >
            <HouseList houses={lastData ? lastData.houses : []} />
          </div>
          <div className="w-1/2">
            <Map
              setDataBounds={setDataBounds}
              houses={lastData ? lastData.houses : []}
            />
          </div>
        </div>
      }
    />
  );
}
