import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: { marvelCharacters: [], copyright: '' },
    mutations: {
      // populate marvelCharacters into state
      setCharacters (state, characters) {
        characters.payload.forEach((character) => {
          state.marvelCharacters.push(character)
        })
      },
      setCopyright (state, copyright) {
        state.copyright = copyright.payload
      }
    },
    actions: {
      setCharacters (vueContext, characters) {
        vueContext.commit('setCharacters', characters)
      },
      setCopyright (vueContext, copyright) {
        vueContext.commit('setCopyright', copyright)
      }
    },
    getters: {
      availableCharacters (state) {
        return state.marvelCharacters.filter(marvel => marvel.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/2/70/5239be7020a11' && marvel.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available')
      },
      copyright (state) {
        return state.copyright
      }
    }
  })
}

export default createStore
