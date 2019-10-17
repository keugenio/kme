<template>
  <div class="d-flex flex-column align-items-center jusfity-content-center p-3 h-100">
    <div class="modal-header d-flex flex-row w-100">
      <h2 class="display-5 modal-title">
        Marvel Hangman
      </h2>
      <button class="ml-auto fa-2x" @click="$emit('close')">
        <i class="fa fa-close" />
      </button>
    </div>
    <div class="modal-body">
      <div v-if="!hideOffScreen" class="mx-auto fa-5x">
        <i class="fa fa-cog fa-spin text-primary" />
        <p style="font-size:2rem">
          downloading character information from Marvel Studios. Please be patient...
        </p>
      </div>
      <div v-else class="row mainCol">
        <div class="col-sm-6">
          <p>Guess the Marvel comic character name.</p>
          <p v-if="gameInProgress" id="instructions">
            Just begin typing your guesses to start.
          </p><br>
          <div ref="guessType">
            Current Guess:
          </div>
          <div ref="marvelCharacter" class="text-center">
            {{ guessArray.join('') }}
          </div>
          <div ref="description">
            {{ description }}
          </div>
          <hr>
          <div>
            <p v-text="messageboard1" />
            <p v-text="messageboard2" />
          </div>
          <hr>
          <button ref="btnReload" class="btn box-shadow btn-primary" @click="resetGame">
            Reload
          </button>
        </div>
        <div class="col-sm-6">
          <figure class="d-table">
            <img ref="marvelCharacterImage" alt="character image" class="rounded align-self-center marvelImage img-fluid" :src="src">
            <figcaption ref="marvelCopyright" class="caption align-bottom text-center d-table-caption">
              {{ copyright }}
            </figcaption>
          </figure>
        </div>
      </div><!-- row -->
    </div><!-- container -->
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import marvelKeys from './marvelKeys'

export default {
  name: 'Marvel',
  data () {
    return {
      hash: marvelKeys.hash,
      publickey: marvelKeys.publickey,
      startsWith: '',
      offset: 0,
      randomCharacterName: 0,
      randomCharacterNameLength: 0,
      randomIndex: Math.floor((Math.random() * 20) + 1),
      answerArray: [],
      guessArray: [],
      guessString: '',
      allGuessArray: [],
      incorrectGuessAmt: 0,
      guessedLetter: '',
      description: 'if nothing loads, Marvel server may be busy. Try again.',
      wikiURL: '',
      hideOffScreen: false,
      gameInProgress: 'true',
      copyright: this.$store.state.copyright,
      src: '',
      messageboard1: '',
      messageboard2: ''
    }
  },
  computed: {
    ...mapGetters(
      { availableCharacters: 'availableCharacters' }
    )
  },
  mounted () {
    this.startGame()
    const self = this
    window.addEventListener('keyup', function (ev) {
      self.keyMonitor(ev) // declared in your component methods
    })
    this.getMoreCharacters()
  },
  methods: {
    resetGame () {
      this.hideOffScreen = false
      this.messageboard1 = ''
      this.messageboard2 = ''
      this.randomCharacterName = 0
      this.randomCharacterNameLength = 0
      this.randomIndex = Math.floor((Math.random() * 20) + 1)
      this.answerArray = []
      this.guessArray = []
      this.allGuessArray = []
      this.incorrectGuessAmt = 0
      this.guessedLetter = ''
      this.description = ''
      this.wikiURL = ''
      this.newGame()
    },
    startGame () {
      const results = this.availableCharacters
      this.randomIndex = Math.floor((Math.random() * results.length) + 1)
      this.src = results[this.randomIndex].thumbnail.path + '/portrait_uncanny.jpg'

      this.hideOffScreen = true
      this.wikiURL = results[this.randomIndex].urls[0].url
      this.randomCharacterName = results[this.randomIndex].name.toLowerCase()
      this.description = results[this.randomIndex].description || 'no description provided by Marvel API'
      this.answerArray = this.randomCharacterName.split('')
      // this.convertToLowerCase(this.answerArray)
      this.setupGuessArray()
      // this.$refs.marvelCharacterImage.src = characterImage
      // this.$refs.marvelCharacter.innerHTML = this.guessArray.join('')
      // this.$refs.description.innerHTML = this.description
    },
    getMoreCharacters () {
      const self = this
      this.startsWith = this.randomLetter()
      this.offset = this.getOffSet(this.startsWith)
      const htmlCall = 'https://gateway.marvel.com/v1/public/characters?' +
                      'nameStartsWith=' + this.startsWith +
                      '&offset=' + this.offset +
                      '&ts=' + 1 +
                      '&apikey=' + this.publickey +
                      '&hash=' + this.hash

      axios.get(htmlCall)
        .then(function (downloadedJSON) {
          self.$store.dispatch('setCharacters', { payload: downloadedJSON.data.data.results })
          self.$store.dispatch('setCopyright', { payload: downloadedJSON.data.copyright })
        })
    },
    newGame () {
      this.gameInProgress = true
      const results = this.$store.getters.availableCharacters
      this.randomIndex = Math.floor((Math.random() * results.length) + 1)
      const characterImage = results[this.randomIndex].thumbnail.path + '/portrait_uncanny.jpg'
      const copyright = this.$store.copyright

      this.hideOffScreen = true
      this.wikiURL = results[this.randomIndex].urls[0].url
      this.randomCharacterName = results[this.randomIndex].name
      this.description = results[this.randomIndex].description || 'no description provided by Marvel API'
      this.answerArray = this.randomCharacterName.split('')
      this.convertToLowerCase(this.answerArray)
      this.setupGuessArray()

      this.$refs.marvelCharacterImage.src = characterImage
      this.$refs.marvelCharacter.innerHTML = this.guessArray.join('')
      this.$refs.marvelCopyright.innerHTML = copyright
      this.$refs.description.innerHTML = this.description
    },
    isValidKey (str) {
      return str.length === 1 && str.match(/[0-9a-z]/i)
    },
    randomLetter () {
      let text = ''
      const possible = 'abcdefghijklmnopqrstuvwxyz'
      text += possible.charAt(Math.floor(Math.random() * possible.length))
      return text
    },
    getOffSet (letter) {
      const maxReturnedCharacters = 20
      switch (letter) {
        case 'a':
          return Math.floor((Math.random() * (79 - maxReturnedCharacters)))
        case 'b':
          return Math.floor((Math.random() * (92 - maxReturnedCharacters)))
        case 'c':
          return Math.floor((Math.random() * (100 - maxReturnedCharacters)))
        case 'd':
          return Math.floor((Math.random() * (78 - maxReturnedCharacters)))
        case 'e':
          return Math.floor((Math.random() * (33 - maxReturnedCharacters)))
        case 'f':
          return Math.floor((Math.random() * (37 - maxReturnedCharacters)))
        case 'g':
          return Math.floor((Math.random() * (56 - maxReturnedCharacters)))
        case 'h':
          return Math.floor((Math.random() * (70 - maxReturnedCharacters)))
        case 'i':
          return Math.floor((Math.random() * (38 - maxReturnedCharacters)))
        case 'j':
          return Math.floor((Math.random() * (44 - maxReturnedCharacters)))
        case 'k':
          return Math.floor((Math.random() * (34 - maxReturnedCharacters)))
        case 'l':
          return Math.floor((Math.random() * (54 - maxReturnedCharacters)))
        case 'm':
          return Math.floor((Math.random() * (152 - maxReturnedCharacters)))
        case 'n':
          return Math.floor((Math.random() * (43 - maxReturnedCharacters)))
        case 'o':
          return 0 // only 19 characters no offset needed
        case 'p':
          return Math.floor((Math.random() * (61 - maxReturnedCharacters)))
        case 'q':
          return 0 // only 8 characters no offset needed
        case 'r':
          return Math.floor((Math.random() * (59 - maxReturnedCharacters)))
        case 's':
          return Math.floor((Math.random() * (196 - maxReturnedCharacters)))
        case 't':
          return Math.floor((Math.random() * (92 - maxReturnedCharacters)))
        case 'u':
          return Math.floor((Math.random() * (21 - maxReturnedCharacters)))
        case 'v':
          return Math.floor((Math.random() * (32 - maxReturnedCharacters)))
        case 'w':
          return Math.floor((Math.random() * (57 - maxReturnedCharacters)))
        case 'x':
          return 0 // only 15 characters no offset needed
        case 'y':
          return 0 // only 4 characters no offset needed
        case 'z':
          return 0 // only 10 characters no offset needed
        default:
          break
      }
    },
    setupGuessArray () {
      // push * as placeholders for letters and numbers. Fill in common characters (spaces, periods, parenthesis etc)
      // so players do not need to guess those
      const temp = []
      for (let i = 0; i < this.answerArray.length; i++) {
        switch (this.answerArray[i]) {
          case ' ':
            temp.push(' ')
            break
          case '(':
            temp.push('(')
            break
          case ')':
            temp.push(')')
            break
          case "'":
            temp.push("'")
            break
          case '.':
            temp.push('.')
            break
          case '-':
            temp.push('-')
            break
          case ':':
            temp.push(':')
            break
          case '/':
            temp.push('/')
            break
          default:
            temp.push('*')
            this.randomCharacterNameLength++
        }
      }
      this.guessArray = temp
    },
    evaluateGuess (guess) {
      const indexOfGuess = this.answerArray.indexOf(guess)
      if (this.randomCharacterNameLength === 0) {
        Swal.fire({
          title: 'Something went wrong... ',
          text: 'The character info was not downloaded correctly, please try again.',
          type: 'error',
          confirmButtonText: 'OK'
        })
      } else {
        if (indexOfGuess >= 0) {
          // fill all array elements with the guessed letter
          for (let i = 0; i < this.answerArray.length; i++) {
            if (this.answerArray[i] === guess) {
              this.guessArray[i] = guess
              this.randomCharacterNameLength--
            }
          }
          if (this.randomCharacterNameLength === 0) {
            this.getMoreCharacters()
            Swal.fire({
              title: 'You guessed it!',
              text: this.randomCharacterName,
              type: 'success',
              confirmButtonText: 'Cool'
            })

            this.$refs.description.innerHTML = this.randomCharacterName
            if (this.description !== 'no description provided by Marvel API') {
              this.$refs.description.innerHTML += ': ' + this.description
            } else {
              this.$refs.description.innerHTML += "<a href='" + this.wikiURL + "' target='blank'>" + ' (more info)' + '</a> '
            }

            this.$refs.guessType.innerHTML = ''
          }
          this.$refs.marvelCharacter.innerHTML = this.guessArray.join('')
        }
        // only update incorrect guess amount for new guesses
        if (this.allGuessArray.indexOf(guess) <= 0) {
          this.incorrectGuessAmt++
        }

        if (!this.allGuessArray.includes(guess)) {
          this.allGuessArray.push(guess)
        }
      }
    },
    convertToLowerCase (anArray) {
      for (let i = 0; i < anArray.length; i++) {
        anArray[i] = anArray[i].toLowerCase()
      }
    },
    // updates incorrect guessed amount and all letters chosen so far
    updateMessageBoard () {
      this.messageboard1 = 'Incorrect guessed amount: ' + this.incorrectGuessAmt
      this.messageboard2 = 'All guessed letters: ' + this.allGuessArray.toString()
    },

    // takes given array and returns as string
    printArray (anArray) {
      let arrayString = ''

      for (let i = 0; i < anArray.length; i++) {
        arrayString += anArray[i]
      }
      return arrayString
    },

    keyMonitor (event) {
      this.gameInProgress = false
      if (this.isValidKey(event.key).length === 1 && !this.allGuessArray.includes(event.key)) {
        this.evaluateGuess(event.key)
        this.updateMessageBoard()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
iframe {
  border: 1px solid black;
  width: 85vw;
  height: 60vw;
}
.fa-close {
  font-size: 1.5rem;
}
.container {
  font-size: 2rem;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.modal-header {
  & button {
    border:none;
  }
}
.modal-body {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 2rem;
  text-align: center;
}
.topMinusNineThousand {
  top: -9000px;
  position: absolute;
}
.topZero {
  margin-top:1rem;
}
.mainCol{
  & button {
    font-size: 2rem;
  }
}
.marvelImage {
  max-width: 100%;
  height: auto;
}
</style>
