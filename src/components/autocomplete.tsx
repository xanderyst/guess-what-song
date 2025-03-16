// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// have a value typescript error coming from ComboboxInput, which is an external library

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
} from "@/components/ui/combobox";

interface Option {
  value: string;
  label: string;
}

interface AutoCompleteProps {
  placeholder?: string;
  emptyMessage?: string;
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  heading?: string;
}

export function AutoComplete({
  placeholder = "Search...",
  emptyMessage = "No results.",
  options,
  value,
  onValueChange,
  heading = "",
}: AutoCompleteProps) {
  return (
    <Combobox
      inputValue={value}
      onInputValueChange={(inputValue: string, reason: "clearClick" | "inputChange" | "itemSelect") => {
        if (reason === "clearClick") {
          onValueChange(""); // Ensure value clears properly
        } else {
          onValueChange(inputValue);
        }
      }}
      type="single"
    >
      <ComboboxInput
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onValueChange(e.target.value)
        }
        placeholder={placeholder}
      />
      <ComboboxContent>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxGroup heading={heading}>
          {options.map((option) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          ))}
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  );
}
