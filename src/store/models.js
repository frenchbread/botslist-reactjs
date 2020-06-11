import axios from 'axios'

delete axios.defaults.headers.common["X-Requested-With"]

export const bots = {
  state: [],
  reducers: {
    init (state, payload) {
      return payload
    }
  },
  effects: dispatch => ({
    async loadBots (payload, rootState) {
      const { data } = await axios.get(process.env.REACT_APP_APIHOST)
      const { bots } = data

      dispatch.bots.init(bots)

      return bots
    },
    filterByName (payload, rootState) {
      return rootState.bots.filter(bot => bot.name.includes(payload))
    }
  })
}
