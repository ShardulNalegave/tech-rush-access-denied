import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef,useEffect } from "react";
import PhotoMan from "../components/PhotoMan";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import sampleImages from "../sampleImages";

export const Route = createFileRoute("/test")({
	component: test,
});

function test() {
	const sliderRef = useRef(null);

	useEffect(() => {
		const slider = sliderRef.current;
		let intervalId;

		const startSlider = () => {
			intervalId = setInterval(() => {
				slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
				if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
					slider.scrollTo({ left: 0, behavior: 'smooth' });
				}
			}, 3000); // Change slide every 3 seconds
		};

		startSlider();

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="overflow-hidden relative w-full">
			<div ref={sliderRef} className="flex overflow-x-auto w-full">
				{sampleImages.map((url, index) => (
					<div key={index} className="flex-shrink-0 w-full">
						<img src={url} className="w-full" />
					</div>
				))}
			</div>
		</div>
	);
}