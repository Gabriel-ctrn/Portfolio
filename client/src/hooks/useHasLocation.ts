import { useState, useEffect, useCallback } from "react";

function useHashLocation(): [string, (to: string) => void] {
  const getHash = () => window.location.hash.replace(/^#/, "") || "/";

  const [location, setLocation] = useState(getHash);

  useEffect(() => {
    const onHashChange = () => {
      setLocation(getHash());
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback(
    (to: string) => {
      if (to !== location) {
        window.location.hash = to;
      }
    },
    [location]
  );

  return [location, navigate];
}

export default useHashLocation;
