import { Box, OrbitControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import Img3D from "./Over3D/Img";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { useEffect } from "react";

export default function Scene({ sceneAn }) {
  // useFrame(({ mouse, camera }) => {
  //   camera.position.x = THREE.MathUtils.lerp(
  //     camera.position.x,
  //     mouse.x * 0.5,
  //     0.03
  //   );
  //   camera.position.y = THREE.MathUtils.lerp(
  //     camera.position.y,
  //     mouse.y * 0.8,
  //     0.01
  //   );
  //   camera.position.z = THREE.MathUtils.lerp(
  //     camera.position.z,
  //     Math.max(4, Math.abs(mouse.x * mouse.y * 8)),
  //     0.01
  //   );
  //   camera.rotation.y = THREE.MathUtils.lerp(
  //     camera.rotation.y,
  //     mouse.x * -Math.PI * 0.025,
  //     0.001
  //   );
  // });

  function Img3DWithPhysics() {
    const [ref, api] = useBox(() => ({
      mass: 0.001, // 가벼운 질량
      position: [Math.random() * 2 - 1, 5, Math.random() * 2 - 1], // 초기 위치
      velocity: [Math.random() * 0.1 - 0.05, Math.random() * -0.05, Math.random() * 0.1 - 0.05], // 초기 속도
      angularVelocity: [Math.random() * 1 - 0.5, Math.random() * 1 - 0.5, Math.random() * 1 - 0.5], // 회전 효과
      linearDamping: 0.9, // 공기 저항 (천천히 감속)
      angularDamping: 0.9, // 회전 감속
    }));
  
    useEffect(() => {
      const interval = setInterval(() => {
        api.applyForce(
          [(Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.1], 
          [0, 0, 0]
        ); // 랜덤한 바람 효과
        api.applyTorque(
          [(Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05]
        ); // 랜덤한 회전 효과
      }, 100);
  
      return () => clearInterval(interval);
    }, [api]);
  
    return (
      <mesh ref={ref} castShadow>
        <Img3D />
      </mesh>
    );
  }

  function Floor() {
    const [ref] = usePlane(() => ({ mass: 0, position: [0, -3, 0], rotation: [-Math.PI / 2, 0, 0] }));
    return (
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.5} />
      </mesh>
    );
  }

  return (
    <>
      <OrbitControls/>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} castShadow />
      <Physics>
        <Img3DWithPhysics />
        <Floor />
      </Physics>
      {/* <animated.mesh rotation={rotation}>
        <Box args={[1, 1, 1]}>
          <meshNormalMaterial/>
        </Box>
      </animated.mesh> */}
    </>
  );
}