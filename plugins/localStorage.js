import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex',
    paths: ['driver', 'coach', 'trip', 'buses', 'driverTrip']
  })(store)
}
