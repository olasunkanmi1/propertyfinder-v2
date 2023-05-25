import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from "react";
import { ImageProps, StaticImageData } from "next/image";
import { SetterOrUpdater } from "recoil";
import { FormikErrors, FormikTouched } from "formik";
import { IconType } from "react-icons/lib";

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
        items: ICategoryType['items'];
        queryName: string;
        oppositeQueryName: string;
    }
    
    max: {
        items: ICategoryType['items'];
        queryName: string;
        oppositeQueryName: string;
    }
}

export interface IDropdownLayoutProps {
    selected: string;
    children: JSX.Element;
    Dropdown: () => JSX.Element;
    minMax?:boolean;
}

export interface IDropdownWithToggleProps {
    select: string;
    title: string;
    items?: {
        name: string;
        value: string;
    }[];
    queryName: string;
    categories?: {
        items: {
            name: string;
            value: string;
        }[];
        placeholder: string;
    }[];
}

export interface IDropdownWithMinMaxProps {
    select: string;
    title: string;
    minMaxValues: {
        values: {
            title: string;
            queryName: string;
            filteredItems: {
                name: string;
                value: string;
            }[]
        }[]
        minKey: string;
        maxKey: string
        minValue?: string | string[];
        maxValue?: string | string[];
    }
}

export interface IToggleLayoutProps {
    selected: string;
    options: {
        items?: ICategoryType['items'];
        categories?: {
            items: {
                name: string;
                value: string;
            }[];
            placeholder: string;
        }[];
        placeholder: string;
        queryName: string;    
    }
}

export interface IMinMaxLayoutProps {
    selected: string;
    placeholder: string;
    min: {
        items: {
            name: string;
            value: string;
        }[];
        placeholder: string;
        queryName: string;
        oppositeQueryName: string;
    }
    max: {
        items: {
            name: string;
            value: string;
        }[];
        placeholder: string;
        queryName: string;
        oppositeQueryName: string;
    }
}

export interface IDirectDropdownLayoutProps {
    selected: string;
    options: {
        items?: ICategoryType['items'];
        placeholder: string;
        queryName: string;
    }
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
    confirmDigit?: boolean;
    editProfile?: boolean;
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
    selectedFile: File | null;
    values: EditProfileInitialValues;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSubmitting: (isSubmitting: boolean) => void;
    setModal: SetterOrUpdater<ILayoutState>;
    imgUrlToBeDeleted: string;
    user: IUserState | null;
    setUser: (valOrUpdater: IUserState | ((currVal: IUserState | null) => IUserState | null) | null) => void;
}

export interface IUpdatePasswordProps {
    values: ChangePasswordInitialValues;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSubmitting: (isSubmitting: boolean) => void;
    setModal: SetterOrUpdater<ILayoutState>;
}

export interface IForgotPasswordProps {
    values: ForgotPasswordInitialValues;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSubmitting: (isSubmitting: boolean) => void;
    setModal: SetterOrUpdater<ILayoutState>;
}

export interface ISignInProps {
    modal: ILayoutState;
    values: SignInInitialValues;
    setUser: SetterOrUpdater<IUserState | null>;
    setProperties: SetterOrUpdater<IPropertiesState>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSubmitting: (isSubmitting: boolean) => void;
    setModal: SetterOrUpdater<ILayoutState>;
}

export interface ISignUpProps {
    values: SignUpInitialValues;
    setUser: SetterOrUpdater<IUserState | null>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSubmitting: (isSubmitting: boolean) => void;
    setModal: SetterOrUpdater<ILayoutState>;
}

export interface IConfirmDigitProps {
    values: ConfirmDigitInitialValues;
    user: IUserState | null;
    setUser: SetterOrUpdater<IUserState | null>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSubmitting: (isSubmitting: boolean) => void;
    setModal: SetterOrUpdater<ILayoutState>;
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
    queryName: string;
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
    select: string;
    options?: ICategoryType['items'],
    queryName: string,
}

export interface IPropertyType {
    options: {
        items: {
            name: string;
            value: string;
            icon?: string;
        }[];
        placeholder: string;
        queryName: string;
    }
};

export interface IDropdownProps {
    loading: boolean;
    suggestions: addressSuggestionsAtomState[] | null;
    setSuggestions: SetterOrUpdater<addressSuggestionsAtomState[] | null>;
    desktop?: boolean;
    suggestionsRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export interface ISearchboxProps {
  desktop?: boolean;
  suggestionsRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export interface HeadingProps {
    heading: string;
    forProperty?: boolean;
    ptsPage?: boolean;
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
    isVerified: boolean;
    samePersonLoggedIn: boolean;
}

export interface addressSuggestionsAtomState {
    externalID: string;
    name: string;
};

export interface IFilterState {
    purpose: string | string[];
    rentFrequency: string | string[];
    priceMin: string | string[];
    priceMax: string | string[];
    sort: string | string[];
    areaMin: string | string[];
    areaMax: string | string[];
    roomsMin: string | string[];
    roomsMax: string | string[];
    bathsMin: string | string[];
    bathsMax: string | string[];
    furnishingStatus: string | string[];
    categoryExternalID: string | string[];
    locationExternalIDs: string | string[];

    propertyType: string;
    emirates: string;
    sortBy: string;
    address: string;
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
    editProfileModal: boolean,
    changePasswordModal: boolean,
    clearConfirmationModal: boolean,
    imageModal: boolean,
    confirmDigitModal: boolean,

    imageBlob: string,
    selectedFile: File | null,
    imgUrlToBeDeleted: string,
    modalImages: string[],
    initialSlide: number,
    ptyToSaveOnLogin?: SignInInitialValues['ptyToSaveOnLogin'],

    toastNotifications: ToastNotification[];
    submitError: string | null;
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
    isList: boolean,
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

export interface IFilterOptionsWithMinMax {
    categories: {
        items: {
            name: string;
            value: string;
        }[];
        placeholder: string;
        queryName: string;
        oppositeQueryName: string;
    }[];
    placeholder: string;
};

interface DirectSelections {
    items?: {
        name: string;
        value: string;
    }[];
    placeholder: string;
    queryName: string;
};

export interface MinMaxSelections {
    categories: {
        items: {
            name: string;
            value: string;
        }[];
        placeholder: string;
        queryName: string;
        oppositeQueryName: string;
    }[];
    placeholder: string;
}

export interface ISelections {
    purposes: DirectSelections;
    rentFrequency: DirectSelections;
    propertyTypes: {
        categories?: {
            items: {
                name: string;
                value: string;
                icon: string;
            }[];
            placeholder: string;
            queryName: string;
        }[];
        placeholder: string;
        queryName: string;
    };
    rooms: MinMaxSelections;
    baths: MinMaxSelections;
    area: MinMaxSelections;
    price: MinMaxSelections;
    emirates: DirectSelections;
    furnishingStatus: DirectSelections;
    sort: DirectSelections;
};

export interface PropertyTypeProps {
    objects: {
        similar?: boolean;
        title: string;
        externalID: string;
        toImg: {
            coverPhoto: Property['coverPhoto'];
            imgUrl: string | StaticImageData;
            setImgUrl: Dispatch<SetStateAction<string | StaticImageData>>;
            GoVerified: IconType;
            rentFrequency: string;
            defaultPropertyImg: StaticImageData;
            isVerified: boolean
            product: string;
            price: number;
        };
        toAgency: {
            agency: Property['agency'];
        };
        toBtn: {
            loading: boolean;
            Spinner: () => JSX.Element;
            isSaved: boolean;
            AiFillHeart: IconType;
            AiOutlineHeart: IconType;
            handleClick: () => Promise<void>;
            ptyWaitLoading: boolean;
        };
        toLocation: {
            HiOutlineLocationMarker: IconType;
            propertyLocation: string;
        };
        toInfo: {
            FaBed: IconType;
            FaBath: IconType;
            MdWindow: IconType;
            rooms: string 
            baths: string 
            area: number 
        };
    }
}

export interface ImageContainerProps {
    objects: PropertyTypeProps['objects']['toImg'];
    forList?: boolean;
}

export interface AgencyContainerProps {
    objects: PropertyTypeProps['objects']['toAgency'];
}

export interface ButtonContainerProps {
    objects: PropertyTypeProps['objects']['toBtn'];
    forGrid?: boolean;
}

export interface LocationContainerProps {
    objects: PropertyTypeProps['objects']['toLocation'];
}

export interface InfoContainerProps {
    objects: PropertyTypeProps['objects']['toInfo'];
}

export interface EditPhotoProps {
    values: EditProfileInitialValues;
    imageBlob: string;
    inputRef: React.RefObject<HTMLInputElement>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    selectedFile: File | null;
    setModal: SetterOrUpdater<ILayoutState>
}

export interface EditFieldProps {
    touched: FormikTouched<EditProfileInitialValues>;
    errors: FormikErrors<EditProfileInitialValues>;
    setModal: SetterOrUpdater<ILayoutState>;
    submitError: string | null;
}

export interface ConfirmDigitInitialValues {
    code: string[];
}

export interface DigitsFormProps {
    values: ConfirmDigitInitialValues;
    errors: FormikErrors<ConfirmDigitInitialValues>;
    touched: FormikTouched<ConfirmDigitInitialValues>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    submitError: string | null;
    setModal: SetterOrUpdater<ILayoutState>;
    isSubmitting: boolean;
    loading: boolean;
    email: string;
    resend: () => void
}

export interface IListenForChangeProps {
    fieldWrapperRef?: React.RefObject<HTMLDivElement | null>;
    setModal: SetterOrUpdater<ILayoutState>;
    onlyEmail?: boolean;
    currentPassword?: boolean;
    submitError: string | null;
}