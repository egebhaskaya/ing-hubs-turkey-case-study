import { createStore } from "redux";

// helper for saving to localStorage
const saveToLocalStorage = (employees) => {
  localStorage.setItem("employees", JSON.stringify(employees));
};

// old style redux state since i had some issues with "process not found error"
const loadFromLocalStorage = () => {
  const employees = localStorage.getItem("employees");
  if (employees) {
    return JSON.parse(employees);
  }
};

const initialState = {
  employees: {
    list: loadFromLocalStorage(),
    viewMode: "table",
    selectedEmployee: null,
  },
};

// action names
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const SET_VIEW_MODE = "SET_VIEW_MODE";

// action creators
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

// reducer functions
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
      return {
        ...state,
        employees: {
          ...state.employees,
          list: newList,
        },
      };
    }

    case DELETE_EMPLOYEE: {
      const newList = state?.employees?.list?.filter(
        (emp) => emp.id !== action.payload
      );
      saveToLocalStorage(newList);
      return {
        ...state,
        employees: {
          ...state.employees,
          list: newList,
        },
      };
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

    default:
      return state;
  }
};

export const store = createStore(rootReducer);
