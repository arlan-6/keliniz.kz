import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";
// import { TextTemplate } from "./template";
import { immer } from "zustand/middleware/immer";

type ObjectTtype = {
	type: "object";
	values: [string, number, string][];
	name?: string;
	unit?: string;
	info?: string;
	id: string;
};
type SingleType = {
	type: "single";
	name?: string;
	value: number | string;
	unit?: string;
	info?: string;
	id: number;
	buttonType: "single" | "multiple";
	listKey: "textAlign" | "typography" | "color" | "";
};
type MultipleType = {
	type: "multi";
	name?: string;
	listKey: "font" | "";
	values: { value: string; label: string };
	unit?: string;
	info?: string;
	id: number;
};
type MainPropertiesType = {
	name: string;
	elementId: number;
	value: string;
	props: (ObjectTtype | SingleType | MultipleType)[];
	// props:{
	//   position:{ x: number | string, y: number | string, name : string};
	// size:{ width: number | string, height: number | string, name : string};
	// zIndex:number;
	// opacity?:number;
	// blur?:number;
	// shadow?:string;
	// }
};

type TextPropertiesType = {
	props: ObjectTtype[] | SingleType[] | MultipleType[];
	// props:{
	//   color?:string;
	//   fontSize:number;
	//   fontFamily?:string;
	//   padding?:number;
	//   textDecoration?:string[]|false; // underline,...
	//   textType?:string[]|false; // bold, italic, ...
	// }
};

type ImagePropertiesType = {
	imageFilter?: string;
	border?: string;
	borderRadius?: number;
	aspectRatio?: number[];
};

type ConstructorStore = {
	contructorId: number;
	elements:
		| (MainPropertiesType & TextPropertiesType)[]
		| (MainPropertiesType & ImagePropertiesType)[]
		| [];
	addElement: (
		element: MainPropertiesType & (TextPropertiesType | ImagePropertiesType),
	) => void;
	removeElement: (elementId: number) => void;
};

// const useConstructorStore = create<ConstructorStore>()(
// 	immer((set) => ({
// 		contructorId: 1,
// 		elements: [],
// 		addElement: (
// 			element: MainPropertiesType & (TextPropertiesType | ImagePropertiesType),
// 		) =>
// 			set((state) => {
// 				// state.elements.push(element);
// 			}),

// 		removeElement: (elementId: number) =>
// 			set((state) => {
// 				state.elements = state.elements.filter(
// 					(
// 						element: MainPropertiesType &
// 							(TextPropertiesType | ImagePropertiesType),
// 					) => element.elementId !== elementId,
// 				);
// 			}),
// 	})),
// );

// export const useBloksList = create<{
// 	list: MainPropertiesType[];
// 	add: () => void;
// 	activeElement: MainPropertiesType;
// 	setActive: (id: number) => void; // Corrected the typo here
// 	update: (id: number, updatedData: Partial<MainPropertiesType>) => void;
// 	updateProp: (id: number, propIndex: number, newValue: any) => void;
// }>()(
// 	immer((set) => ({
// 		list: [],
// 		add: () =>
// 			set((state) => {
// 				state.list.push({ ...TextTemplate, elementId: new Date().getTime() });
// 			}),
// 		activeElement: { name: "", elementId: -1, value: "", props: [] },
// 		setActive: (id: number) =>
// 			set((state) => {
// 				state.activeElement = state.list.find(
// 					(item) => item.elementId === id,
// 				) || {
// 					name: "",
// 					elementId: -1,
// 					value: "",
// 					props: [],
// 				};
// 			}),
// 		update: (id: number, updatedData: Partial<MainPropertiesType>) =>
// 			set((state) => {
// 				const itemIndex = state.list.findIndex((item) => item.elementId === id);
// 				if (itemIndex !== -1) {
// 					// Update the specific item's properties with the new data
// 					state.list[itemIndex] = { ...state.list[itemIndex], ...updatedData };
// 				}
// 			}),
// 		updateProp: (id: number, propIndex: number, newValue: any) =>
// 			set((state) => {
// 				const itemIndex = state.list.findIndex((item) => item.elementId === id);
// 				if (itemIndex !== -1 && state.list[itemIndex].props[propIndex]) {
// 					// Update the specific prop's value
// 					state.list[itemIndex].props[propIndex] = {
// 						...state.list[itemIndex].props[propIndex],
// 						...newValue,
// 					};
// 					state.activeElement.props[propIndex]={
// 						...state.list[itemIndex].props[propIndex],
// 						...newValue,
// 					};
// 				}
// 			}),
// 	})),
// );

interface BaseConfig {
	zIndex?: number; // Z-index for rendering order
	// Position and size properties
	x?: number; // X-coordinate position
	y?: number; // Y-coordinate position
	width?: number; // Width of the element
	height?: number; // Height of the element

	// Visibility and interaction
	visible?: boolean; // Visibility flag
	listening?: boolean; // Event listening flag

	// Identification
	id?: string; // Unique identifier
	name?: string; // Non-unique name for reference

	// Appearance
	opacity?: number; // Opacity level (0 to 1)

	// Scale properties
	scale?: { x: number; y: number }; // Scale object with x and y components
	scaleX?: number; // Scale factor in X-direction
	scaleY?: number; // Scale factor in Y-direction

	// Rotation and offset
	rotation?: number; // Rotation angle in degrees
	offset?: { x: number; y: number }; // Offset for center and rotation points
	offsetX?: number; // X-offset for rotation center
	offsetY?: number; // Y-offset for rotation center

	// Dragging configuration
	draggable?: boolean; // Enable or disable dragging
	dragDistance?: number; // Minimum drag distance to initiate dragging
	dragBoundFunc?: (pos: { x: number; y: number }) => { x: number; y: number }; // Custom function to restrict drag bounds

	// Shadow properties
	shadowColor?: string; // Shadow color
	shadowBlur?: number; // Shadow blur level
	shadowOffset?: { x: number; y: number }; // Shadow offset with x and y components
	shadowOffsetX?: number; // Shadow X-offset
	shadowOffsetY?: number; // Shadow Y-offset
	shadowOpacity?: number; // Shadow opacity (0 to 1)
	shadowEnabled?: boolean; // Enable or disable shadow
}

export interface TextConfig extends BaseConfig {
	text: string; // Text content to display

	// Text styling
	direction?: "ltr" | "rtl" | "inherit"; // Text direction
	fontFamily?: string; // Font family (default: Arial)
	fontSize?: number; // Font size in pixels (default: 12)
	fontStyle?: "normal" | "italic" | "bold" | "500" | "italic bold"; // Font style and weight
	fontVariant?: "normal" | "small-caps"; // Font variant (e.g., small-caps)
	textDecoration?: "line-through" | "underline" | ""; // Text decoration (e.g., underline)

	// Alignment and spacing
	align?: "left" | "center" | "right"; // Horizontal alignment
	verticalAlign?: "top" | "middle" | "bottom"; // Vertical alignment
	padding?: number; // Padding around the text
	lineHeight?: number; // Line height multiplier (default: 1)
	wrap?: "word" | "char" | "none"; // Text wrap mode (default: word)
	ellipsis?: boolean; // Show ellipsis (...) if text is cut off

	// Fill and stroke
	fill?: string; // Fill color for text
	stroke?: string; // Stroke color for text outline
	strokeWidth?: number; // Stroke width for text outline
}

interface RectConfig extends BaseConfig {
	cornerRadius?: number; // Radius for rectangle corners

	// Fill and stroke
	fill?: string; // Fill color for rectangle
	stroke?: string; // Stroke color for rectangle outline
	strokeWidth?: number; // Stroke width for rectangle outline
	fillEnabled?: boolean; // Enable or disable fill color

	// Pattern fill properties
	fillPatternImage?: HTMLImageElement; // Image to use as a fill pattern
	fillPatternX?: number; // X-offset for the fill pattern
	fillPatternY?: number; // Y-offset for the fill pattern
	fillPatternOffset?: { x: number; y: number }; // Pattern offset with x and y components
	fillPatternOffsetX?: number; // X-component of pattern offset
	fillPatternOffsetY?: number; // Y-component of pattern offset
	fillPatternScale?: { x: number; y: number }; // Scale for pattern fill
	fillPatternScaleX?: number; // X-component for pattern scale
	fillPatternScaleY?: number; // Y-component for pattern scale
	fillPatternRotation?: number; // Rotation for pattern fill
	fillPatternRepeat?: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"; // Pattern repeat style
}

interface ImageConfig extends BaseConfig {
	image: HTMLImageElement; // Source image element (required)

	// Cropping
	crop?: { x: number; y: number; width: number; height: number }; // Crop rectangle for the image

	// Fill properties
	fill?: string; // Fill color
	fillPatternImage?: HTMLImageElement; // Image to use as fill pattern
	fillPatternX?: number; // X-offset for pattern
	fillPatternY?: number; // Y-offset for pattern
	fillPatternOffset?: { x: number; y: number }; // Offset for fill pattern
	fillPatternOffsetX?: number; // X-offset for pattern
	fillPatternOffsetY?: number; // Y-offset for pattern
	fillPatternScale?: { x: number; y: number }; // Scale of pattern fill
	fillPatternScaleX?: number; // X-scale for pattern
	fillPatternScaleY?: number; // Y-scale for pattern
	fillPatternRotation?: number; // Rotation for fill pattern
	fillPatternRepeat?: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"; // Pattern repeat type
}

interface StoreState {
	elements: TextConfig[];
	activeElementId: string | null;
	addElement: (element: TextConfig) => void;
	setActiveElement: (id: string | null) => void;
	updateElement: (id: string, newAttrs: Partial<TextConfig>) => void;
	getActiveElement: () => TextConfig | undefined;
}

export const useStore = create<StoreState>((set, get) => ({
	elements: [],
	activeElementId: null,
	addElement: (element) =>
		set((state) => ({
			elements: [...state.elements, element],
		})),
	setActiveElement: (id) =>
		set(() => ({
			activeElementId: id,
		})),
	updateElement: (id, newAttrs) =>
		set((state) => ({
			elements: state.elements.map((el) =>
				el.id === id ? { ...el, ...newAttrs } : el,
			),
		})),
	getActiveElement: () => {
		const { elements, activeElementId } = get();
		return elements.find((el) => el.id === activeElementId);
	},
}));

// export default useConstructorStore;
export type {
	MainPropertiesType,
	TextPropertiesType,
	ImagePropertiesType,
	ObjectTtype,
	MultipleType,
	SingleType,
};

interface FilterStoreState {
	tags: ("rsvp" | "map" | "timer" | "free")[];
	extraTags: "liked"[];
	search: string;
	sortBy: "asc" | "desc";
	setTags: (tags: ("rsvp" | "map" | "timer" | "free")[]) => void;
	setExtraTags: (tags: "liked"[]) => void;
	setSearch: (search: string) => void;
	setSortBy: (sortBy: "asc" | "desc") => void;
	reset: () => void;
}

export const useFilterStore = create<FilterStoreState>((set) => ({
	tags: [],
	extraTags: [],
	search: "",
	sortBy: "asc",
	setTags: (tags) => set(() => ({ tags })),
	setExtraTags: (tags) => set(() => ({ extraTags: tags })),
	setSearch: (search) => set(() => ({ search })),
	setSortBy: (sortBy) => set(() => ({ sortBy })),
	reset: () =>
		set(() => ({
			tags: [],
			extraTags: [],
			search: "",
			sortBy: "asc",
		})),
}));

interface TemplateStoreState {
	templates: {
		tags: ("rsvp" | "map" | "timer" | "free")[];
		extraTags?: "liked"[];
		name: string;
		description: string;
		id: string;
		imageUrl: string;
		imagesUrl: string[];
		properties:string[]
	}[];
	addTemplate: (template: {
		tags: ("rsvp" | "map" | "timer" | "free")[];
		extraTags?: "liked"[];
		name: string;
		description: string;
		id: string;
		imageUrl: string;
		imagesUrl: string[];
		properties:string[]
	}) => void;
	removeTemplate: (id: string) => void;
	updateTemplate: (
		id: string,
		updatedData: Partial<{
			tags: ("rsvp" | "map" | "timer" | "free")[];
			extraTags?: "liked"[];
			name: string;
			description: string;
		}>,
	) => void;
	addList: (
		list: {
			tags: ("rsvp" | "map" | "timer" | "free")[];
			extraTags?: "liked"[];
			name: string;
			description: string;
			id: string;
			imageUrl: string;
			imagesUrl: string[];
			properties:string[]
		}[],
	) => void;
}
interface Template {
	tags: ("rsvp" | "map" | "timer" | "free")[];
	extraTags?: "liked"[];
	name: string;
	description: string;
	id: string;
	imageUrl: string;
	imagesUrl: string[];
	properties:string[]
}

export const useTemplateStore = create<TemplateStoreState>((set) => ({
	templates: [] as Template[],
	addTemplate: (template) =>
		set((state) => ({
			templates: [...state.templates, template],
		})),
	removeTemplate: (id) =>
		set((state) => ({
			templates: state.templates.filter((tpl) => tpl.id !== id),
		})),
	updateTemplate: (id, updatedData) =>
		set((state) => ({
			templates: state.templates.map((tpl) =>
				tpl.id === id ? { ...tpl, ...updatedData } : tpl,
			),
		})),
	addList: (list) =>
		set((state) => ({
			templates: [...list],
		})),
}));

interface ModalStoreState {
	modalValue: Template | null;
	isOpen: boolean;
	openModal: (template: Template) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalStoreState>((set) => ({
	modalValue: null,
	isOpen: false,
	openModal: (template) => set(() => ({ modalValue: template, isOpen: true })),
	closeModal: () => set(() => ({ modalValue: null, isOpen: false })),
}));

interface LikedTemplateIdStoreState {
	likedTemplateIds: string[];
	addLikedTemplate: (likedTemplateIds: string[]) => void;
	addLikedTemplateId: (id: string) => void;
	removeLikedTemplateId: (id: string) => void;
}

export const useLikedTemplateIdStore = create<LikedTemplateIdStoreState>(
	(set) => ({
		likedTemplateIds: [],
		addLikedTemplate: (likedTemplateIds) =>
			set(() => ({
				likedTemplateIds,
			})),
		addLikedTemplateId: (id) =>
			set((state) => {
				const email = useSessionStore.getState().user?.email;
				fetch(process.env.NEXT_PUBLIC_SERVER_URL+"/templates/like", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ templateId: id, email: email }),
				})
					.then((res) => res.json())
					.then((data) => console.log(data));
				return {
					likedTemplateIds: [...state.likedTemplateIds, id],
				};
			}),
		removeLikedTemplateId: (id) =>
			set((state) => {
				const email = useSessionStore.getState().user?.email;
				fetch(process.env.NEXT_PUBLIC_SERVER_URL+"/templates/unlike", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ templateId: id, email: email }),
				})
					.then((res) => res.json())
					.then((data) => console.log(data));
				return {
					likedTemplateIds: state.likedTemplateIds.filter(
						(templateId) => templateId !== id,
					),
				};
			}),
	}),
);

interface SessionStoreState {
	expires: string | null;
	user: {
		email: string | null;
		image: string | null;
		name: string | null;
		role: "admin" | "user" | "viewer" | null;
	} | null;
	setSession: (
		expires: string,
		user: {
			email: string;
			image: string;
			name: string;
			role: "admin" | "user" | "viewer";
		},
	) => void;
	clearSession: () => void;
}

export const useSessionStore = create<SessionStoreState>((set) => ({
	expires: null,
	user: null,
	setSession: (expires, user) =>
		set(() => ({
			expires,
			user,
		})),
	clearSession: () =>
		set(() => ({
			sessionId: null,
			expires: null,
			user: null,
		})),
}));

export type { Template };

interface InviteEditStoreState {
	isChanged:boolean
	setChanged:(isChanged:boolean)=>void
	_id:  string;
	inviteName: string;
	setInviteName: (inviteName: string) => void;
	inviteId: string;
	email: string;
	templateId: string;
	setAll: (data: InviteEditStoreState) => void;
	inviteDetails: {
		name1: string;
		name2: string;
		date: Date;
		time: string;
		location: {
			lat: number;
			lng: number;
		};
	};
	setName1: (name1: string) => void;
	setName2: (name2: string) => void;
	setDate: (date: Date) => void;
	setTime: (time: string) => void;
	setLocation: (location: {
		lat: number,
		lng: number,
	}) => void;
	save: () => void;
	reset: () => void;
	getAll: () => InviteEditStoreState;
}

export const useInviteEditStore = create<InviteEditStoreState>((set, get) => ({
	isChanged:false,
	setChanged:(isChanged:boolean)=>set(()=>{
		
		toast.warning("Changes detected", {
			description: 'Don\'t forget to save your changes',
		  })
		return {isChanged}
	}),
	_id:  "",
	inviteName: "",
	setInviteName: (inviteName) =>
		set((state) => ({
			inviteName,
		})),
	inviteId: "",
	email: "",
	templateId: "",
	setAll: (data) => set(() => ({ ...data})),
	inviteDetails: {
		name1: "",
		name2: "",
		date: new Date(),
		time: "",
		location: {
			lat: 0,
			lng: 0,
		},
	},
	setName1: (name1) =>
		set((state) => ({
			inviteDetails: { ...state.inviteDetails, name1 },
		})),
	setName2: (name2) =>
		set((state) => ({
			inviteDetails: { ...state.inviteDetails, name2 },
		})),
	setDate: (date) =>
		set((state) => ({
			inviteDetails: { ...state.inviteDetails, date },
		})),
	setTime: (time) =>
		set((state) => ({
			inviteDetails: { ...state.inviteDetails, time },
		})),
	setLocation: (location) =>
		set((state) => ({
			inviteDetails: { ...state.inviteDetails, location },
		})),
		
	save: async () => {
		const state = get();
		console.log('saving');
		
		const res = await fetch(`http://localhost:5000/edit/invites/${state.inviteId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...state,
			}),
		});
		if (res.ok) {
			console.log("success");
			
			set(() => ({ isChanged: false }));
		} else {
			console.log("error");
		}
	},
	reset: () =>
		set(() => ({
			inviteDetails: {
				name1: "",
				name2: "",
				date: new Date(),
				time: '',
				location: {
					lat: 0,
					lng: 0,
				},
			},
		})),
	getAll: () => {
		const state = get();
		return state;
	},

}));
