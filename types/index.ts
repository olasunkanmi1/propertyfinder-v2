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
    
    amenities: {
        amenities: {
            text: string;
        }[];
    }[];
    completionStatus: string;
    coverVideo: {
        url: string
    };
    description: string;
    furnishingStatus: string;
    geography: {
        lat: number;
        lalngt: number;
    };
    phoneNumber: {
        mobile: number;
        whatsapp: number;
    };
    photos: {
      url: string;  
    }[];
    permitNumber: string;
    referenceNumber: string;
    purpose: string;
    active: boolean;
    category: {
        nameSingular: string;
    }[];
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

export interface UniquePropertyPageProps {
    propertyDetails: Property;
}

export interface SimilarPropertiesProps {
    similarProperties: Property[];
}

export interface ICategoryType {
    items: {
        name: string;
        value: string;
    }[];
    placeholder: string;
    queryName: string;
    value?: string;
}

export interface ISelectLayoutProps {
    heading: string;
    min: {
        list?: ICategoryType[];
        oppositeQueryName: string;
    }
    
    max: {
        list?: ICategoryType[];
        oppositeQueryName: string;
    }
}

export interface IDropdownWithToggleProps {
    select: string;
    title: string;
    tabs?: {
        name: string;
        value: string;
    }[];
    queryName?: string;
    categories?: ICategoryType[];
}

export interface IDropdownWithMinMaxProps {
    select: string;
    title: string;
    min: {
        list?: ICategoryType[];
        oppositeQueryName: string;
    };
    max: {
        list?: ICategoryType[];
        oppositeQueryName: string;
    };
}

export interface IMinMaxLayoutProps {
    handleDropdown: (dropdownValue: string) => void;
    selected: string;
    array: ({
        items: {
            name: string;
            value: string;
        }[];
        placeholder: string;
        queryName: string;
        dropdown: string;
        categories?: undefined;
    } | {
        categories: {
            items: {
                name: string;
                value: string;
            }[];
            placeholder: string;
            queryName: string;
        }[];
        placeholder: string;
        dropdown: string;
        items?: undefined;
        queryName?: undefined;
    } | {
        placeholder: string;
    })[];
    min: {
        list?: ICategoryType[];
        oppositeQueryName: string;
    };
    max: {
        list?: ICategoryType[];
        oppositeQueryName: string;
    };
}