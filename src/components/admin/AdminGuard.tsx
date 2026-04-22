import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { adminStore } from "@/lib/adminStore";

export function AdminGuard({ children }: { children: ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setAuthed(adminStore.isAuthed());
    setChecked(true);
  }, []);

  if (!checked) return null;
  if (!authed) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  return <>{children}</>;
}
