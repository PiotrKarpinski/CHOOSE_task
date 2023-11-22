export interface TripProps {
    id: string;
    title: string;
    subtitle: string;
    countries: string[];
    photoUrl: string;
    days: number;
    co2kilograms: number;
    rating: number;
    description: string;
    advantages: AdvantageProps[];
}

export interface AdvantageProps {

    title: string;
    description: string;
}

