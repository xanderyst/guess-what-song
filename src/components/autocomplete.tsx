import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
  } from "@/components/ui/combobox"
  
  export function AutoComplete({placeholder = 'Search...', emptyMessage='No results.', options, value, onValueChange, heading=''}) {
    console.log('autocomplete value', value);
    console.log('onValueChange', onValueChange);
    return (
      <Combobox
            inputValue={value}
            onInputValueChange={(input, reason) => {
              if (reason === "clearClick") {
                onValueChange(""); // Ensure value clears properly
              } else {
                onValueChange(input);
              }
            }}
            type="single">
        <ComboboxInput
            value={value}
            onChange={(e) => onValueChange(e.target.value)} 
            placeholder={placeholder} />
        <ComboboxContent>
          <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
          <ComboboxGroup heading={heading}>
            {options.map((option) => <ComboboxItem key={option.value} value={option.value}>{option.label}</ComboboxItem>)}
          </ComboboxGroup>
        </ComboboxContent>
      </Combobox>
    )
  }