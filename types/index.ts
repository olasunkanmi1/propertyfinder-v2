import { StaticImageData } from "next/image";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { IconType } from "react-icons/lib";
import { SetterOrUpdater } from "recoil";
import { INavbarState, IPropertiesState } from "../states";

export interface LayoutProps {
    title: string;
    children: JSX.Element[] | JSX.Element;
}

export interface IProfileProps {
    mobile?: boolean;
}

export interface SectionLayoutProps {
    heading: string;
    paragraph: string;
    text: string;
    buttonText: string;
    route: string;
    image: StaticImageData;
    reverse?: boolean;
    noIcon?: boolean;
    firstImg?: boolean;
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
    location: {
        name: string;
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
    similar?: boolean;
    featured?: boolean;
}

export interface HomepageProps {
    featuredProperties?: Property[];
    featuredAgencies?: Agency[];
    savedProperties?: Property[];
}

export interface FindPropertyPageProps {
    properties: Property[];
    nbHits?: number;
    savedProperties: Property[];
}

export interface UniquePropertyPageProps {
    propertyDetails: Property;
}

export interface SavedPropertiesPageProps {
    savedProperties: Property[];
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
    select?: string;
    title: string;
    min: {
        list?: ICategoryType[];
        queryName: string;
        oppositeQueryName: string;
    };
    max: {
        list?: ICategoryType[];
        queryName: string;
        oppositeQueryName: string;
    };
}

export interface IToggleLayoutProps {
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
        items?: {
            name: string;
            value: string;
        }[];
        categories?: {
            items: {
                name: string;
                value: string;
            }[];
            placeholder: string;
            queryName: string;
        }[];
        placeholder: string;
        queryName: string;
    })[];
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
        queryName: string;
        oppositeQueryName: string;
    };
    max: {
        list?: ICategoryType[];
        queryName: string;
        oppositeQueryName: string;
    };
}

export interface IDirectDropdownLayoutProps {
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
        items?: {
            name: string;
            value: string;
        }[];
        placeholder: string;
        queryName?: string;
    })[];
}

export interface SignInInitialValues {
    email: string;
    password: string;
}

export interface SignUpInitialValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IModalLayoutProps {
    heading?: string;
    children: JSX.Element[] | JSX.Element;
    signIn?: boolean;
    signUp?: boolean;
}

export interface IFormFieldProps {
    title: string;
    icon: ReactElement<IconType>;
    name: string;
    placeholder: string;
    password?: boolean;
    error?: boolean;
    value?: string
}

export interface IObj {
    coverPhoto: {
        url: string;
    };
    price: number;
    rooms: string;
    title: string;
    baths: string;
    area: number;
    isVerified: boolean;
    rentFrequency: string;
    agency: {
        logo: {
            url: string;
        };
        name: string;
    };
    externalID: string;
    location: {
        name: string;
    }[];
} 

export interface MyError {
  message: string
  response?: {
    status: number
  }
}

export interface IHandleSaveAndUnsaveProps {
 setLoading: Dispatch<SetStateAction<boolean>>;
 coverPhoto: {
    url: string;
 };
 price: number;
 rooms: string;
 title: string;
 baths: string;
 area: number;
 isVerified: boolean;
 rentFrequency: string;
 agency: {
    logo: {
        url: string;
    };
    name: string;
 };
 externalID: string;
 isSaved: boolean;
 setProperties: SetterOrUpdater<IPropertiesState>;
 savedProperties: Property[];
 setModal: SetterOrUpdater<INavbarState>;
 location: {
    name: string;
}[];
}