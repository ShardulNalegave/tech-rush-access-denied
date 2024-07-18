const sampleImages = [
	{
		id: 1,
		title: "Sunset over the mountains",
		url: "https://picsum.photos/id/101/400/300",
	},
	{
		id: 2,
		title: "City skyline",
		url: "https://picsum.photos/id/102/400/300",
	},
	{
		id: 3,
		title: "Forest path",
		url: "https://picsum.photos/id/103/400/300",
	},
	{
		id: 4,
		title: "Desert dunes",
		url: "https://picsum.photos/id/104/400/300",
	},
	{
		id: 6,
		title: "Snowy mountain",
		url: "https://picsum.photos/id/106/400/300",
	},
	{
		id: 7,
		title: "Calm lake",
		url: "https://picsum.photos/id/107/400/300",
	},
	{
		id: 8,
		title: "Flower field",
		url: "https://picsum.photos/id/108/400/300",
	},
	{
		id: 9,
		title: "Misty forest",
		url: "https://picsum.photos/id/109/400/300",
	},
	{
		id: 10,
		title: "City street",
		url: "https://picsum.photos/id/110/400/300",
	},
	{
		id: 11,
		title: "Rocky coast",
		url: "https://picsum.photos/id/111/400/300",
	},
	{
		id: 12,
		title: "Autumn leaves",
		url: "https://picsum.photos/id/112/400/300",
	},
	{
		id: 13,
		title: "Mountain river",
		url: "https://picsum.photos/id/113/400/300",
	},
	{
		id: 14,
		title: "City park",
		url: "https://picsum.photos/id/114/400/300",
	},
	{
		id: 15,
		title: "Starry night",
		url: "https://picsum.photos/id/115/400/300",
	},
	{
		id: 16,
		title: "Green hills",
		url: "https://picsum.photos/id/116/400/300",
	},
	{
		id: 17,
		title: "Snow-covered trees",
		url: "https://picsum.photos/id/117/400/300",
	},
	{
		id: 18,
		title: "Rural landscape",
		url: "https://picsum.photos/id/118/400/300",
	},
	{
		id: 19,
		title: "Ocean waves",
		url: "https://picsum.photos/id/119/400/300",
	},
	{
		id: 20,
		title: "Urban skyline",
		url: "https://picsum.photos/id/120/400/300",
	},
	{
		id: 21,
		title: "Golden hour",
		url: "https://picsum.photos/id/121/400/300",
	},
	{
		id: 22,
		title: "Waterfall",
		url: "https://picsum.photos/id/122/400/300",
	},
	{
		id: 23,
		title: "Bridge",
		url: "https://picsum.photos/id/123/400/300",
	},
	{
		id: 24,
		title: "Countryside road",
		url: "https://picsum.photos/id/124/400/300",
	},
	{
		id: 25,
		title: "Tropical beach",
		url: "https://picsum.photos/id/125/400/300",
	},
	{
		id: 26,
		title: "Snowy peak",
		url: "https://picsum.photos/id/126/400/300",
	},
	{
		id: 27,
		title: "Downtown at night",
		url: "https://picsum.photos/id/127/400/300",
	},
	{
		id: 28,
		title: "Foggy morning",
		url: "https://picsum.photos/id/128/400/300",
	},
	{
		id: 29,
		title: "Cherry blossoms",
		url: "https://picsum.photos/id/129/400/300",
	},
	{
		id: 30,
		title: "Lush forest",
		url: "https://picsum.photos/id/130/400/300",
	},
	{
		id: 31,
		title: "Desert landscape",
		url: "https://picsum.photos/id/131/400/300",
	},
	{
		id: 32,
		title: "Country house",
		url: "https://picsum.photos/id/132/400/300",
	},
	{
		id: 33,
		title: "Mountain path",
		url: "https://picsum.photos/id/133/400/300",
	},
	{
		id: 34,
		title: "Beach sunset",
		url: "https://picsum.photos/id/134/400/300",
	},
	{
		id: 35,
		title: "River bend",
		url: "https://picsum.photos/id/135/400/300",
	},
	{
		id: 36,
		title: "Urban bridge",
		url: "https://picsum.photos/id/136/400/300",
	},
	{
		id: 37,
		title: "Spring flowers",
		url: "https://picsum.photos/id/137/400/300",
	},
	{
		id: 38,
		title: "Canyon",
		url: "https://picsum.photos/id/138/400/300",
	},
	{
		id: 39,
		title: "Village street",
		url: "https://picsum.photos/id/139/400/300",
	},
	{
		id: 40,
		title: "Rainy day",
		url: "https://picsum.photos/id/140/400/300",
	},
	{
		id: 41,
		title: "Mountain lake",
		url: "https://picsum.photos/id/141/400/300",
	},
	{
		id: 42,
		title: "Urban alley",
		url: "https://picsum.photos/id/142/400/300",
	},
	{
		id: 43,
		title: "Palm trees",
		url: "https://picsum.photos/id/143/400/300",
	},
	{
		id: 44,
		title: "Mountain valley",
		url: "https://picsum.photos/id/144/400/300",
	},
	{
		id: 45,
		title: "City lights",
		url: "https://picsum.photos/id/145/400/300",
	},
	{
		id: 46,
		title: "Forest clearing",
		url: "https://picsum.photos/id/146/400/300",
	},
	{
		id: 47,
		title: "Winter landscape",
		url: "https://picsum.photos/id/147/400/300",
	},
	{
		id: 48,
		title: "Harbor",
		url: "https://picsum.photos/id/148/400/300",
	},
	{
		id: 49,
		title: "Field of wheat",
		url: "https://picsum.photos/id/149/400/300",
	},
	{
		id: 50,
		title: "Rolling hills",
		url: "https://picsum.photos/id/150/400/300",
	},
];

export default sampleImages;
