import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Img3D({ position }) {
  const { gl } = useThree();

  return (
    <>
      <Html
        scale={0.06}
        portal={{ current: gl.domElement.parentNode }}
        position={[0, 0, 0.001]}
        transform
        occlude
        castShadow
        receiveShadow
        style={{}}
      >
        <img src="/1.png"/>
      </Html>
    </>
  );
}
