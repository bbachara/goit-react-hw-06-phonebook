import { combineReducers } from "redux";
import { statusFilters } from "./constants";

const contactsInitialState = [
  { id: 0, name: "Rosie Simpson", phone: "459-12-56" },
  { id: 1, name: "Hermione Kline", phone: "443-89-12" },
  { id: 2, name: "Eden Clements", phone: "645-17-79" },
  { id: 3, name: "Annie Copeland", phone: "227-91-26" },
];

const contactsReducer = (state = contactsInitialState, action) => {
  switch (action.type) {
    case "contacts/addContact":
      return [...state, action.payload];
    case "contacts/deleteContact":
      return state.filter((contact) => contact.id !== action.payload);
    default:
      return state;
  }
};

const filtersInitialState = {
  status: statusFilters.all,
  searchQuery: "",
};

const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case "filters/setStatusFilter":
      return {
        ...state,
        status: action.payload,
      };
    case "filters/setSearchQuery":
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
});
