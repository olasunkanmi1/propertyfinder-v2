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
    dropdownOpen: boolean;
    setDropdownOpen: Dispatch<SetStateAction<boolean>>
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
    price: string;
    rentFrequency: string;
    rooms: string;
    title: string;
    baths: string;
    area: string;
    agency: string;
    isVerified: string;
    externalID: string;
}

export interface Agency {
    id: string;
    logo: {
        url: string
    };
    name: string;
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
}