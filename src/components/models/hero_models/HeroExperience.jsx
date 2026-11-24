import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Suspense } from "react";

// OrbitControls' autoRotate turns a fixed angle per frame, so the room spun
// twice as fast on a 120Hz screen as on 60Hz. Scaling the speed by the frame
// time makes one full turn take ~30s everywhere.
const TURN_SPEED = 2;
const SteadyAutoRotate = () => {
  const controls = useThree((state) => state.controls);
  useFrame((_, delta) => {
    if (controls)
      controls.autoRotateSpeed = TURN_SPEED * 60 * Math.min(delta, 0.1);
  });
  return null;
};

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas
      camera={{ position: [0.2, 0.15, 13], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.16} color="#18284d" />
      <OrbitControls
        enablePan={false} // Prevents panning of the scene
        enableZoom={!isTablet} // Disables zoom on tablets
        autoRotate // Full turn reveals the "LOOK WITHIN" hint on the back wall
        makeDefault
        maxDistance={17}
        minDistance={8}
        minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
        maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
      />

      <SteadyAutoRotate />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <group
          scale={isMobile ? 0.62 : isTablet ? 0.82 : 1}
          position={[0, -3.15, 0]}
          rotation={[0, -Math.PI / 5, 0]}
        >
          <Room />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
