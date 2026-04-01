import AppDropdownContent from "./app-dropdown-content";
import DropdownContextProvider from "./app-dropdown-context-provider";
import AppDropdownList from "./app-dropdown-list";
import AppDropdownSearch from "./app-dropdown-search";
import AppDropdownTrigger from "./app-dropdown-trigger";

export const Dropdown = Object.assign(DropdownContextProvider, {
  Trigger: AppDropdownTrigger,
  Content: AppDropdownContent,
  Search: AppDropdownSearch,
  List: AppDropdownList,
});
