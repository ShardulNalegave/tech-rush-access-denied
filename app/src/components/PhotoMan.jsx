/* eslint-disable react/no-unknown-property */
import React, { Suspense } from "react";
import {
  OrbitControls,
  Preload,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
const Model = () => {
  const { scene, animations } = useGLTF("public/final_model/scene.gltf");
  const { actions } = useAnimations(animations, scene);

  React.useEffect(() => {
    if (actions) {
      Object.keys(actions).forEach((key) => {
        actions[key].reset().play(); // Play each action
        actions[key].setLoop(THREE.LoopRepeat); // Set looping
        actions[key].timeScale = 1; // Set speed to 2x
      });
    }
  }, [actions]);

  return <primitive object={scene} scale={[2, 2, 2]} />;
};

const PhotoMan = () => {
  return (
    <div className="w-full h-full    ">
      <Canvas camera={{ fov: 3 }}>
        <Suspense fallback={null}>
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
};

export default PhotoMan;
