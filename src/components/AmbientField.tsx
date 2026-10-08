import { lazy, Suspense } from "react";
import { useCan3D } from "../hooks/useCan3D";

const AmbientScene = lazy(() => import("./three/AmbientScene"));

/**
 * Fixed, full-viewport 3D data network behind the page content.
 * Desktop only; loads after the first paint and never blocks interaction.
 */
export function AmbientField() {
  const can3D = useCan3D();
  if (!can3D) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-90">
      <Suspense fallback={null}>
        <AmbientScene />
      </Suspense>
    </div>
  );
}
