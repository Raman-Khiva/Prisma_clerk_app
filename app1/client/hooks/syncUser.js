"use client";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
export function useSyncUser() {
  const { getToken, isLoading, isSignedIn } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      const token = await getToken();
      if (!token) return;
      console.log("syncing user with token", token);

      try {
        const rawRes = await fetch("http://20.204.216.223:5000/api/user/sync", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!rawRes.ok) {
          throw new Error(`HTTP error ${rawRes.status}`);
        }

        const res = await rawRes.json();

        if (res.succes) {
          console.log("User synced successfully");
          console.log("response", res);
        } else {
          console.error("failed to sync user", res.error.message);
        }
      } catch (err) {
        console.error("Error syncing user", err.message);
      }
    };
    syncUser();
  }, [isLoading, isSignedIn]);
}
