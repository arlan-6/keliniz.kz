interface ITemplateData {
	name1: string;
	name2: string;
	date: string;
	time: string;
	location: string;
}
export type { ITemplateData };
interface TemplateValues {
    [key: string]: {
        name1: string;
        name2: string;
        date: string;
        time: string;
        location: string;
    };
}
const Values:TemplateValues = {
    "2cce0d3c79ed49ceab2455640ae8c8a2": {
        name1: "Name-1",
        name2: "Name-2",
        date: "2022-10-20",
        time: "20:00",
        location: ""
    }}

export default Values;
// console.log(Values["2cce0d3c79ed49ceab2455640ae8c8a2"].name1);

interface IPalaces{
    id:string;
    name: string;
    location: {
        lat: number;
        lng: number;
    };
    description?: string;

}

export const PlacesList:IPalaces[] = [
    {
        id: "1",
        name: "Қуаныш",
        location: {
            lat: 43.305233,
            lng: 77.090857
        },

    },
    {
        id: "2",
        name: "Аружан",
        location: {
            lat: 43.306578, 
            lng:  77.101700
        },

    },
    {
        id: "3",
        name: "Диана",
        location: {
            lat: 43.295868, 
            lng:  77.031685 
        },

    },
    
]