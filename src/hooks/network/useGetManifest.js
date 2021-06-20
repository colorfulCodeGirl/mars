import { useState } from "react";
import { useQuery } from "react-query";
import { fetchData } from "../../helpers";

export function useGetManifest() {
  const [rover, setRover] = useState();
  const { data, isLoading, isSuccess } = useQuery(
    ["manifests", rover],
    () => rover && fetchData(`manifests/${rover}?`),
    {
      retry: 2,
    }
  );
  const manifest = data ? data.photo_manifest : undefined;
  const maxSol = manifest ? manifest.max_sol : undefined;
  const startDate = manifest ? manifest.landing_date : undefined;
  const endDate = manifest ? manifest.max_date : undefined;
  const manifestFetched = isSuccess && manifest ? true : false;

  return {
    rover,
    setRover,
    maxSol,
    startDate,
    endDate,
    isLoading,
    manifestFetched,
  };
}
