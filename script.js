;(function () {
  'use strict'

  const get = function (target) {
    return document.querySelector(target)
  }

  const getAll = function (target) {
    return document.querySelectorAll(target)
  }
  
  const keys = Array.from(getAll('.key')) // getAll('.key')는 유사배열 객체이기 때문에 배열로 만들어 준다.
  const soundsRoot = 'assets/sounds/'
  const drumSounds = [
    { key: 81, sound: 'clap.wav' },
    { key: 87, sound: 'crash.wav' },
    { key: 69, sound: 'hihat.wav' },
    { key: 65, sound: 'kick.wav' },
    { key: 83, sound: 'openhat.wav' },
    { key: 68, sound: 'ride.wav' },
    { key: 90, sound: 'shaker.wav' },
    { key: 88, sound: 'snare.wav' },
    { key: 67, sound: 'tom.wav' },
  ]

  // 오디오 소스
  const getAudioElement = (index) => {
    const audio = document.createElement('audio')
    audio.dataset.key = drumSounds[index].key
    audio.src = soundsRoot + drumSounds[index].sound
    return audio
  }

  // 애니메이션 효과 제거
  const onTransitionEnd = (e) => {
    if (e.propertyName === 'transform') {
      e.target.classList.remove('playing')
    }
  }

  // 마우스 조작
  const onMouseDown = (e) => {
    const keycode = e.target.getAttribute('data-key')
    playSound(keycode)
  }

  // 키보드 조작
  const onKeyDown = (e) => {
    console.log(e.keyCode)
    const keycode = e.keyCode
    playSound(keycode)
  }

  // 사운드 재생
  const playSound = (keycode) => {
    const $audio = get(`audio[data-key="${keycode}"]`)
    const $key = get(`div[data-key="${keycode}"]`)
    if ($key && $audio) {
      $key.classList.add('playing') // 애니메이션 효과 추가
      $audio.currentTime = 0
      $audio.play()
    }
  }

  const init = () => {
    window.addEventListener('keydown', onKeyDown) // 키보드 조작
    keys.forEach((key, index) => {
      const audio = getAudioElement(index)
      key.appendChild(audio)
      key.addEventListener('transitionend', onTransitionEnd)
      key.addEventListener('mousedown', onMouseDown)
      key.dataset.key = drumSounds[index].key
    })
  }

  init()
})()
