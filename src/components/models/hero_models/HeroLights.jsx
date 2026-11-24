import { useMemo } from "react";
import * as THREE from "three";

const HeroLights = () => {
  // Create the area light once instead of on every render.
  const areaLight = useMemo(
    () => new THREE.RectAreaLight("#7d5cff", 10, 4, 2),
    [],
  );

  return (
    <>
      <spotLight
        position={[2, 5, 6]}
        angle={0.2}
        penumbra={0.45}
        intensity={80}
        color="#fff4df"
      />
      <spotLight
        position={[4, 6, 3]}
        angle={0.35}
        penumbra={0.7}
        intensity={28}
        color="#6e9dff"
      />
      <spotLight
        position={[-4, 4, 4]}
        angle={0.5}
        penumbra={1}
        intensity={42}
        color="#b76cff"
      />
      <primitive
        object={areaLight}
        position={[1, 3, 3]}
        rotation={[-Math.PI / 4, Math.PI / 4, 0]}
      />
      <pointLight position={[0, 1, 0]} intensity={8} color="#7209b7" />
      <pointLight position={[1, 2, -2]} intensity={7} color="#244dff" />
      <pointLight position={[-2, 2, -3]} intensity={12} color="#ff4d9d" />
    </>
  );
};

export default HeroLights;
