// Country interface remains the same
export interface Country {
  id: string;
  name: string;
  iso3?: string; // Marking fields as optional if they may be missing in some entries
  iso2?: string;
  numeric_code?: string;
  phone_code?: number;
  capital?: string;
  currency?: string;
  currency_name?: string;
  currency_symbol?: string;
  tld?: string;
  native?: string;
  region?: string;
  subregion?: string;
  latitude?: string;
  longitude?: string;
  emoji?: string;
}


// State interface
export interface State {
  id: number;
  name: string;
  state_code: string;
  countryCode: number; // Based on your data, this is a number
}

// City interface
export interface City {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  stateId: number; // State ID reference
}

// CityData interface to represent cityData.json structure
export interface CityData {
  id: string;
  states: {
    id: string;
    cities: City[];
  }[];
}

// CityDataArray as an alias for an array of CityData
export type CityDataArray = CityData[];

export interface Suggestion {
  id: string;
  name: string;
}

export interface SearchInputProps {
  suggestions: Suggestion[];
  query: string;
  handleInputChange: (value: string) => void;
  handleSuggestionClick: (value: string) => void;
  isDropdownOpen: boolean;
  closeDropdown: () => void;
}

export interface CityDataWrapperProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}


export interface PlaceMaps { [key: number]: string }

export interface FormData {
  budget: string;
  travellers: string;
  location: string;
  noOfDays: string;
}

export type User = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

export type TripPlan = {
  time: string;
  geoCoordinates: string;
  travel: string;
  placeName: string;
  ticketPricing: string;
  placeImageUrl: string;
  placeDetails: string;
};

export type ItineraryDay = {
  day: string;
  plan: TripPlan[];
};

export type HotelOption = {
  hotelName: string;
  geoCoordinates: string;
  description: string;
  hotelImageUrl: string;
  price: string;
  rating: string;
  hotelAddress: string;
};

export type UserSelection = {
  budget: string;
  location: string;
  travellers: string;
  noOfDays: string;
};

export type TripData = {
  hotelOptions: HotelOption[];
  itinerary: ItineraryDay[];
};

export type Trip = {
  id: string;
  userSelection: UserSelection;
  tripData: TripData;
};
