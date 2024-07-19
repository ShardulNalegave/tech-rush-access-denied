/* eslint-disable react/prop-types */
import * as THREE from "three";
import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload, Image as ImageImpl } from "@react-three/drei";
import { ScrollControls, Scroll, useScroll } from "./ScrollControls";

function Image(props) {
  const ref = useRef();
  const group = useRef();
  const data = useScroll();
  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      Math.max(0, data.delta * 50),
      4,
      delta
    );
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      Math.max(0, 1 - data.delta * 1000),
      4,
      delta
    );
  });
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  );
}

function Page({ m = 0.4, urls, ...props }) {
  const { width } = useThree((state) => state.viewport);
  const w = width < 10 ? 1.5 / 3 : 1 / 3;
  return (
    <group {...props}>
      <Image
        position={[-width * w, 0, -1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[0]}
      />
      <Image
        position={[0, 0, 0]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[1]}
      />
      <Image
        position={[width * w, 0, 1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[2]}
      />
    </group>
  );
}

function Pages() {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      <Page
        position={[-width * 1, 0, 0]}
        urls={["/imgs/1.jpg", "/imgs/2.jpg", "/imgs/3.jpg"]}
      />
      <Page
        position={[width * 0, 0, 0]}
        urls={["/imgs/1.jpg", "/imgs/2.jpg", "/imgs/3.jpg"]}
      />
      <Page
        position={[width * 1, 0, 0]}
        urls={["/imgs/4.jpg", "/imgs/5.jpg", "/imgs/6.jpg"]}
      />
      <Page
        position={[width * 2, 0, 0]}
        urls={["/imgs/7.jpg", "/imgs/8.jpg", "/imgs/9.jpg"]}
      />
      <Page
        position={[width * 3, 0, 0]}
        urls={["/imgs/1.jpg", "/imgs/2.jpg", "/imgs/3.jpg"]}
      />
      <Page
        position={[width * 4, 0, 0]}
        urls={["/imgs/4.jpg", "/imgs/6.jpg", "/imgs/7.jpg"]}
      />
    </>
  );
}

export default function PortScroll() {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls horizontal damping={4} pages={4} distance={1}>
          <Scroll>
            <Pages />
          </Scroll>
          <Scroll html className="text-yellow-500 Title">
            <h1
              className="text-[200px] "
              style={{ position: "absolute", top: "20vh", left: "-75vw" }}
            ></h1>
            <h1
              className="text-[100px] lg:text-[200px] drop-shadow-xl shadow-3xl"
              style={{ position: "absolute", top: "20vh", left: "25vw" }}
            >
              This
            </h1>
            <h1
              className="text-[100px] lg:text-[200px] drop-shadow-xl shadow-3xl"
              style={{ position: "absolute", top: "20vh", left: "125vw" }}
            >
              is
            </h1>
            <h1
              className="text-[100px] lg:text-[200px] drop-shadow-xl shadow-3xl"
              style={{ position: "absolute", top: "20vh", left: "225vw" }}
            >
              My
            </h1>
            <h1
              className="text-[100px] lg:text-[200px]  drop-shadow-xl shadow-3xl"
              style={{ position: "absolute", top: "20vh", left: "325vw" }}
            >
              Collection
            </h1>
            <h1
              className="text-[100px] lg:text-[200px] drop-shadow-xl shadow-3xl"
              style={{ position: "absolute", top: "20vh", left: "425vw" }}
            >
              be
            </h1>
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  );
}
