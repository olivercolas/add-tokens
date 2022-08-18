const colors = {
  error: 'red accent-2',
  info: 'blue lighten-1',
  warning: 'orange darken-2',
  success: 'green',
}

export const state = () => ({
  show: false,
  message: '',
  color: colors.red,
  tile: true,
  text: false,
  showButton: true,
})

export const getters = {
  tile: (state) => state.tile,
  text: (state) => state.text,
  message: (state) => state.message,
  show: (state) => state.show,
  showButton: (state) => state.showButton,
  color: (state) => state.color,
}

export const mutations = {
  CLOSE_ALERT(state) {
    state.show = false
  },

  DISPLAY_ERROR(state, message) {
    state.color = colors.error
    state.message = message
    state.show = true
  },
}
