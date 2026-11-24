import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

// Pointer travel (px) above which a release counts as an orbit drag, not a click.
const DRAG_THRESHOLD = 6;

const openSecret = () => {
  if (window.location.pathname === "/secret") return;
  window.history.pushState({}, "", "/secret");
  window.dispatchEvent(new PopStateEvent("popstate"));
};

/**
 * Clickable label that sits on one of the room's monitors.
 * Dark ink on the bright screen keeps it readable through the bloom,
 * and a slow pulse + hover lift hints that it can be clicked.
 */
const SecretSign = ({ children, color, phase = 0, ...props }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const canvas = useThree((state) => state.gl.domElement);
  const setCursor = (value) => {
    canvas.style.cursor = value;
  };

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 2.2 + phase) * 0.04;
    const target = hovered ? 1.15 : pulse;
    const s = ref.current.scale.x + (target - ref.current.scale.x) * 0.15;
    ref.current.scale.setScalar(s);
  });

  return (
    <Text
      ref={ref}
      fontSize={0.22}
      lineHeight={0.95}
      letterSpacing={0.04}
      anchorX="center"
      anchorY="middle"
      textAlign="center"
      color={hovered ? color : "#0b1130"}
      outlineWidth={0.014}
      outlineColor="#0b1130"
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setCursor("pointer");
      }}
      onPointerOut={() => {
        setHovered(false);
        setCursor("");
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (e.delta > DRAG_THRESHOLD) return;
        setCursor("");
        openSecret();
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default SecretSign;
