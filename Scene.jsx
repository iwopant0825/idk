import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Physics, useBox } from '@react-three/cannon';

function Img3DWithPhysics(props) {
  const [ref, api] = useBox(() => ({ mass: 1, ...props }));
  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api]);

  useFrame(() => {
    api.applyForce([Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5], [0, 0, 0]);
  });

  return (
    <mesh ref={ref} {...props}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Physics>
      <Img3DWithPhysics position={[0, 5, 0]} />
    </Physics>
  );
}