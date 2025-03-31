import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import { CityDataWrapperProps } from "../../types/types";
import cityData from "../../../cityData.json";

function CityDataWrapper({ searchTerm, setSearchTerm }: CityDataWrapperProps) {
  const [stringArray, setStringArray] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStringArray(
      (cityData as string[])
        .filter(
          (city) =>
            city.split(",")[0].toLowerCase() === searchTerm.toLowerCase() ||
            city.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          // Sort: Prioritize exact match first, then other matches
          if (a.toLowerCase().split(",")[0] === searchTerm.toLowerCase()) {
            return -1; // a comes before b
          } else if (
            b.toLowerCase().split(",")[0] === searchTerm.toLowerCase()
          ) {
            return 1; // b comes before a
          }
          return 0; // no change
        })
    );
    setIsDropdownOpen(true); // Open dropdown when search term is updated
  }, [searchTerm]);

  const handleSuggestionClick = (suggestionName: string) => {
    setIsDropdownOpen(false); // Ensure dropdown closes immediately
    setSearchTerm(suggestionName);
    setStringArray([]); // Clear suggestions
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Close dropdown on external click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleCloseDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <SearchInput
        suggestions={stringArray.map((name) => ({ id: name, name }))}
        query={searchTerm}
        handleInputChange={setSearchTerm}
        handleSuggestionClick={handleSuggestionClick}
        isDropdownOpen={isDropdownOpen}
        closeDropdown={handleCloseDropdown}
      />
    </div>
  );
}

export default CityDataWrapper;
