import * as Types from '../utils/constants/types';

const initialState = {
  employeesList: [],
  employeesListSuccess: false,
  employeesListError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.GET_EMPLOYEE_LIST_SUCCESS: {
      return {
        ...state,
        employeesList: action.payload,
        employeesListSuccess: true,
        employeesListError: null,
      };
    }
    case Types.GET_EMPLOYEE_LIST_ERROR: {
      return {
        ...state,
        employeesListSuccess: false,
        employeesListError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
