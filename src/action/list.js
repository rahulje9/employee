import {getEmployeesListAPI} from '../services/Api';
import * as Types from '../utils/constants/types';

export const fetchEmployeeList = () => {
  return dispatch => {
    return getEmployeesListAPI()
      .then(res => {
        // console.log('res', res?.data);
        if (res?.status === 200) {
          dispatch(fetchEmployeeListSuccess(res?.data));
        } else {
          dispatch(fetchEmployeeListError());
        }
      })
      .catch(err => {
        // console.log('err');
        dispatch(fetchEmployeeListError(err));
      });
  };
};

export const fetchEmployeeListSuccess = res => {
  return {
    type: Types.GET_EMPLOYEE_LIST_SUCCESS,
    payload: res,
  };
};

export const fetchEmployeeListError = err => {
  return {
    type: Types.GET_EMPLOYEE_LIST_ERROR,
    payload: err,
  };
};
