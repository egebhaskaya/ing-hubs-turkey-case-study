import { createStore } from "redux";

const saveToLocalStorage = (employees) => {
  localStorage.setItem("employees", JSON.stringify(employees));
};

// old style redux state since i had some issues with "process not found error"
const loadFromLocalStorage = () => {
  const employees = localStorage.getItem("employees");
  const parsedEmployees = JSON.parse(employees);

  if (parsedEmployees) {
    return parsedEmployees;
  }
};

const initialState = {
  employees: {
    list: loadFromLocalStorage(),
    filteredList: loadFromLocalStorage(),
    viewMode: "table",
    searchTerm: "",
    pagination: {
      viewList: [],
      page: 1,
      pageSize: 10,
      totalPages: 1,
      showPagination: true,
    },
  },
};

// action names
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const SET_VIEW_MODE = "SET_VIEW_MODE";
export const SET_PAGINATION = "SET_PAGINATION";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const SET_SEARCH = "SET_SEARCH";
export const CLEAR_SEARCH = "CLEAR_SEARCH";

export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee,
});

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: id,
});

export const editEmployee = (updatedEmployee) => ({
  type: EDIT_EMPLOYEE,
  payload: updatedEmployee,
});

export const setViewMode = (mode) => ({
  type: SET_VIEW_MODE,
  payload: mode,
});

export const setPagination = (page) => ({
  type: SET_PAGINATION,
  payload: page ? page : 1,
});

export const setSearch = (searchTerm) => ({
  type: SET_SEARCH,
  payload: searchTerm,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE: {
      let newList;
      if (!state?.employees?.list) {
        newList = [action.payload];
      } else {
        newList = [...state?.employees?.list, action.payload];
      }
      saveToLocalStorage(newList);

      let newFilteredList = newList;
      if (
        state.employees.searchTerm &&
        state.employees.searchTerm.trim() !== ""
      ) {
        const searchTerm = state.employees.searchTerm.toLowerCase();
        newFilteredList = newList.filter((employee) => {
          return (
            employee.firstName.toLowerCase().includes(searchTerm) ||
            employee.lastName.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm) ||
            employee.department.toLowerCase().includes(searchTerm) ||
            employee.position.toLowerCase().includes(searchTerm) ||
            employee.phone.includes(searchTerm)
          );
        });
      }

      return {
        ...state,
        employees: {
          ...state.employees,
          list: newList,
          filteredList: newFilteredList,
        },
      };
    }

    case DELETE_EMPLOYEE: {
      const newList = state?.employees?.list?.filter(
        (emp) => emp.id !== action.payload
      );
      saveToLocalStorage(newList);

      let newFilteredList = newList;
      if (
        state.employees.searchTerm &&
        state.employees.searchTerm.trim() !== ""
      ) {
        const searchTerm = state.employees.searchTerm.toLowerCase();
        newFilteredList = newList.filter((employee) => {
          return (
            employee.firstName.toLowerCase().includes(searchTerm) ||
            employee.lastName.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm) ||
            employee.department.toLowerCase().includes(searchTerm) ||
            employee.position.toLowerCase().includes(searchTerm) ||
            employee.phone.includes(searchTerm)
          );
        });
      }

      const updatedState = {
        ...state,
        employees: {
          ...state.employees,
          list: newList,
          filteredList: newFilteredList,
        },
      };

      return rootReducer(updatedState, {
        type: SET_PAGINATION,
        payload: state.employees.pagination.page,
      });
    }

    case EDIT_EMPLOYEE: {
      const newList = state?.employees?.list?.map((employee) => {
        if (employee.id === action.payload.id) {
          return action.payload;
        }
        return employee;
      });

      saveToLocalStorage(newList);
      return {
        ...state,
        employees: {
          ...state.employees,
          list: newList,
        },
      };
    }

    case SET_VIEW_MODE:
      return {
        ...state,
        employees: {
          ...state.employees,
          viewMode: action.payload,
        },
      };

    case SET_PAGINATION:
      let totalPages;
      let pageSize;
      let showPagination;
      let totalItems;
      let page;
      let pageItems;

      const requestedPage = action?.payload;

      const listToUse = state.employees.searchTerm
        ? state.employees.filteredList
        : state.employees.list;
      totalItems = listToUse?.length;

      if (state.employees.viewMode === "table") {
        pageSize = 9;
        totalPages = Math.ceil(totalItems / pageSize);
      } else {
        pageSize = 4;
        totalPages = Math.ceil(totalItems / pageSize);
      }

      if (requestedPage < 1) {
        page = 1;
      } else if (requestedPage > totalPages) {
        page = totalPages;
      } else {
        page = requestedPage;
      }

      if (totalItems > pageSize) {
        showPagination = true;
      } else {
        showPagination = false;
      }

      if (page === 1) {
        pageItems = listToUse.slice(0, pageSize);
      } else {
        pageItems = listToUse.slice((page - 1) * pageSize, page * pageSize);
      }

      const pagination = {
        page: page,
        pageSize: pageSize,
        totalPages: totalPages,
        totalItems: totalItems,
        showPagination: showPagination,
        viewList: pageItems,
      };

      return {
        ...state,
        employees: {
          ...state.employees,
          pagination,
        },
      };

    case NEXT_PAGE:
      return {
        ...state,
        employees: {
          ...state.employees,
          pagination: {
            ...state.employees.pagination,
            page: state.employees.pagination.page + 1,
          },
        },
      };

    case PREVIOUS_PAGE:
      return {
        ...state,
        employees: {
          ...state.employees,
          pagination: {
            ...state.employees.pagination,
            page: state.employees.pagination.page - 1,
          },
        },
      };

    case SET_SEARCH: {
      const searchTerm = action.payload.toLowerCase();
      let filteredList = state.employees.list;

      if (searchTerm && searchTerm.trim() !== "") {
        filteredList = state.employees.list.filter((employee) => {
          return (
            employee.firstName.toLowerCase().includes(searchTerm) ||
            employee.lastName.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm) ||
            employee.department.toLowerCase().includes(searchTerm) ||
            employee.position.toLowerCase().includes(searchTerm) ||
            employee.phone.includes(searchTerm)
          );
        });
      }

      return {
        ...state,
        employees: {
          ...state.employees,
          searchTerm: action.payload,
          filteredList: filteredList,
        },
      };
    }

    case CLEAR_SEARCH:
      return {
        ...state,
        employees: {
          ...state.employees,
          searchTerm: "",
          filteredList: state.employees.list,
        },
      };

    default:
      return state;
  }
};

export const store = createStore(rootReducer);
