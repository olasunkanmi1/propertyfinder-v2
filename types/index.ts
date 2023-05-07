import { StaticImageData } from "next/image";
import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from "react";
import { IconType } from "react-icons/lib";
import { SetterOrUpdater } from "recoil";

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
    createdAt: number
    updatedAt: number
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
    featuredProperties: Property[];
    featuredAgencies: Agency[];
    savedProperties: Property[];
}

export interface FeaturedAgenciesProps {
    featuredAgencies: Agency[];
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

interface ICategoryType {
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
    ptyToSaveOnLogin?: {
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

export interface IHandleSaveAndUnsaveProps {
    property: Property;
    setLoading: Dispatch<SetStateAction<boolean>>;
    isSaved: boolean;
    setProperties: SetterOrUpdater<IPropertiesState>;
    savedProperties: Property[];
    setModal: SetterOrUpdater<ILayoutState>;
    user: IUserState | null;
}

export interface BayutFetchFnProps {
    url: string;
    superhotProperties?: boolean;
    featuredAgencies?: boolean;
    autoComplete?: boolean;
    e?: ChangeEvent<HTMLInputElement>;
}

export interface IFilterValues {
    [key: string]: string | []
}

export interface EditProfileInitialValues {
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
    public_id?: string;
    fieldsAndFreshImage?: boolean;
    fieldsAndDeletePrevAndUploadNew?: boolean;
    fieldsAndDeletePrevWithoutUploadNew?: boolean;
    withFormData?: boolean;
}

export interface IUpdateProfileProps {
    content: FormData | EditProfileInitialValues;
    values: EditProfileInitialValues;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSubmitting: (isSubmitting: boolean) => void;
    setModal: SetterOrUpdater<ILayoutState>;
    file: boolean;
    imgUrlToBeDeleted: string;
    setUser: (valOrUpdater: IUserState | ((currVal: IUserState | null) => IUserState | null) | null) => void
}

export interface PaginationProps {
    pageCount?: number;
}

export interface ISearchFiltersProps {
  filterRef: React.MutableRefObject<HTMLDivElement | null>;
  suggestionsRef: React.MutableRefObject<HTMLDivElement | null>;
}

export interface IDirectDropdownProps {
    title: string;
    options?: {
        name: string;
        value: string;
    }[];
    queryName?: string;
    select: string;
}

export interface IOptionsProps {
  items: {
    name: string;
    value: string;
}[];
  queryName: string;
}

export interface IOptionsWithToggleProps {
  options?: ICategoryType[] | ({
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
queryName?: string;
})[];
select: string;
}

export interface IPropertyType {
  list?: {
      items: {
          name: string;
          value: string;
          icon?: string;
      }[];
      placeholder: string;
      queryName: string;
  }[];
};

export interface IDropdownProps {
    loading: boolean;
    suggestions: addressSuggestionsAtomState;
    setSuggestions: SetterOrUpdater<addressSuggestionsAtomState>;
    inputRef: React.RefObject<HTMLInputElement>;
    desktop?: boolean;
    suggestionsRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export interface ISearchboxProps {
  desktop?: boolean;
  suggestionsRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export interface HeadingProps {
    heading: string;
}

export interface ChangePasswordInitialValues {
    oldPassword: string;
    newPassword: string;
}

export interface ForgotPasswordInitialValues {
    email: string;
}

export interface IDisclaimerProps {
    agency: string
};

export interface ResetPasswordInitialValues {
    password: string;
    confirmPassword: string;
}

export interface IVerifyEmail {
    isVerified: boolean
}

export interface addressSuggestionsAtomState {
    address: string;
    predictions: {
        externalID: string;
        name: string;
    }[] | null;
}

export interface IFilterState {
    purpose?: string | string[];
    rentFrequency?: string | string[];
    priceMin?: string | string[];
    priceMax?: string | string[];
    sort?: string | string[];
    areaMin?: string | string[];
    areaMax?: string | string[];
    roomsMin?: string | string[];
    roomsMax?: string | string[];
    bathsMin?: string | string[];
    bathsMax?: string | string[];
    furnishingStatus?: string | string[];
    categoryExternalID?: string | string[];
    locationExternalIDs?: string | string[];

    propertyType?: string;
    emirates?: string;
    sortBy?: string;
}

export interface ToastNotification {
    id: number,
    toastType: string,
    toastMessage: string,
}

export interface ILayoutState {
    profileDropdown: boolean,
    isSidebarOpen: boolean,
    isFilterbarOpen: boolean,
    signInModal: boolean,
    signUpModal: boolean,
    forgotPasswordModal: boolean,
    forgotPasswordMail: string,
    forgotPasswordMailSent: boolean,
    verifyEmailMailSent: boolean,
    editProfileModal: boolean,
    changePasswordModal: boolean,
    clearConfirmationModal: boolean,
    imageModal: boolean,

    imageBlob: string,
    selectedFile: File | null,
    imgUrlToBeDeleted: string,
    modalImages: string[],
    initialSlide: number,
    ptyToSaveOnLogin?: SignInInitialValues['ptyToSaveOnLogin'],

    toastNotifications: ToastNotification[];
}

export interface ILoadingState {
    routeChangeLoading: boolean;
    propertiesLoading: boolean;
    userLoading: boolean;
};

export interface IPropertiesState {
    featuredProperties?: Property[],
    savedProperties?: Property[] | null,
    properties?: Property[],
    ptyWaitLoading: boolean,
}

export interface IsearchFiltersState {
    main: string | null;
    minMax: string | null;
}

export interface IUserState {
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
    photoUrl: string;
};