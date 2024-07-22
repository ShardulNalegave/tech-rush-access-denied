import React, { Suspense } from "react";
import {
  OrbitControls,
  Preload,
  useGLTF,
  useAnimations,
  Html,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import * as THREE from "three";
const Model = () => {
  const { scene, animations } = useGLTF("/final_model/scene.gltf");
  const { actions } = useAnimations(animations, scene);

  React.useEffect(() => {
    if (actions) {
      Object.keys(actions).forEach((key) => {
        if (actions[key] === null) return;
        actions[key].reset().play(); // Play each action
        // actions[key].setLoop(THREE.LoopRepeat); // Set looping
        actions[key].timeScale = 1; // Set speed to 2x
      });
    }
  }, [actions]);

  return <primitive object={scene} scale={[2, 2, 2]} />;
};

export default function PhotoMan() {
  return (
    <div className="w-full h-full    ">
      <Canvas camera={{ fov: 3 }}>
        <Suspense
          fallback={
            <Html>
              <div className="text-5xl text-black">Loading...</div>
            </Html>
          }
        >
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minAzimuthAngle={Math.PI}
            maxAzimuthAngle={Math.PI}
            maxPolarAngle={Math.PI / 3}
            minPolarAngle={Math.PI / 3}
          />
          <pointLight intensity={0.2} />
          <spotLight intensity={8} />
          {/* <directionalLight intensity={2} /> */}
          <Model />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
