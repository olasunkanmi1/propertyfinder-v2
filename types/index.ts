import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";

export interface LayoutProps {
    title: string;
    children: JSX.Element[] | JSX.Element;
}

export interface ProfileProps {
    imageUrl: string;
    firstName: string;
    email: string;
    big?: boolean;
}

export interface SectionLayoutProps {
    heading: string;
    paragraph: string;
    buttonText: string;
    route: string;
    image: StaticImageData;
    reverse?: boolean;
    noIcon?: boolean;
}

export interface Property {
    coverPhoto: {
        url: string
    };
    price: number;
    rentFrequency: string;
    rooms: string;
    title: string;
    baths: string;
    area: number;
    agency: {
        logo: {
            url: string
        },
        name: string
    };
    isVerified: boolean;
    externalID: string;
    product: string;
}

export interface Agency {
    id: string;
    logo: {
        url: string
    };
    name: string;
    product: string;
}

export interface PropertyProps {
    property: Property;
}

export interface HomepageProps {
    featuredProperties?: Property[];
    featuredAgencies?: Agency[];
}

export interface FindPropertyPageProps {
    properties: Property[];
    nbHits?: number;
}