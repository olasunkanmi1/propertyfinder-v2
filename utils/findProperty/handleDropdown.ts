import { IsearchFiltersState } from "@types"
import { SetterOrUpdater } from "recoil"

export const handleDropdown = (dropdownValue: string, dropdown: IsearchFiltersState, setDropdown: SetterOrUpdater<IsearchFiltersState>, minMax?: boolean) => {
    if(!minMax) { //main dropdown
      if(dropdown.main === dropdownValue) { //close  if already opened
        setDropdown({
          main: null,
          minMax: null,
        })
      } else { //open 
        setDropdown({
          main: dropdownValue,
          minMax: null,
        })
      }
    } else { // minMax dropdown
      if(dropdown.minMax === dropdownValue) { //close  if already opened
        setDropdown( dropdown => ({
          ...dropdown,
          minMax: null
        }))
      } else {
         setDropdown(dropdown => ({
          ...dropdown,
          minMax: dropdownValue
         }))
      }
    }    
  }