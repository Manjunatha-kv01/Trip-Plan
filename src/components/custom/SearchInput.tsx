import React, { useEffect } from "react";
import { Input } from "@/components/ui/input"; // Adjust the path based on your project structure
import Dropdown from "@/components/custom/Dropdown"; // Create a dropdown component if you don't have one
import { SearchInputProps } from "@/types/types";

const SearchInput: React.FC<SearchInputProps> = ({
  suggestions,
  handleInputChange,
  query,
  handleSuggestionClick,
  isDropdownOpen,
  closeDropdown,
}) => {
  // Handle keydown for closing the dropdown
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown(); // Close on 'Esc'
        handleInputChange("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggestions, handleSuggestionClick, closeDropdown, handleInputChange]);

  return (
    <div className="relative">
      <Input
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => closeDropdown()} // Close dropdown on focus
        placeholder="Search..."
        className="border border-gray-300 rounded-md"
      />
      {isDropdownOpen && query && suggestions.length > 0 && (
        <Dropdown>
          {suggestions.slice(0, 5).map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.name)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {suggestion.name}
            </div>
          ))}
        </Dropdown>
      )}
    </div>
  );
};

export default SearchInput;
