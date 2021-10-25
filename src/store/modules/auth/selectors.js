const selectors = {
  getUser: state => state.auth.user,
  getUid: state => state.auth.user.uid,
  isAuthenticated: state => state.auth.isAuthenticated,
  isLoading: state => state.auth.isLoading,
  offlineLoading: state => state.auth.offlineLoading
};

export default selectors;
