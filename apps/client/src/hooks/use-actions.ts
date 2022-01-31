import { useDispatch } from 'react-redux';
import { allActionCreators } from '../store/reducers/action-creators';
import { bindActionCreators } from 'redux';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActionCreators, dispatch);
};
