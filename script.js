const storyText = document.getElementById('story-text');
const storyImage = document.getElementById('story-image');
const choicesContainer = document.getElementById('choices');

// Audio elements
const backgroundAudio = new Audio();
backgroundAudio.loop = true;
backgroundAudio.volume = 0.5; // Adjust volume as needed

let currentScene = 'start';

const scenes = {
  start: {
    text: 'Welcome to the Forgotten Lands. Do you dare to enter?',
    image: 'assets/images/forest.png',
    audio: 'assets/audio/intro.mp3', // Background music for the intro
    choices: {
      enter_forest: 'forest',
      explore_village: 'village',
      turn_back: 'end',
    },
  },
  forest: {
    text: 'You step into the dark forest. Which path will you take?',
    image: 'assets/images/forest.png',
    audio: 'assets/audio/forest.mp3', // Forest ambient sounds
    choices: {
      follow_light: 'spring',
      haunting_sound: 'cave',
      climb_tree: 'hidden_path',
    },
  },
  village: {
    text: 'You enter the abandoned village. What will you do?',
    image: 'assets/images/village.png',
    audio: 'assets/audio/village.mp3', // Eerie village sounds
    choices: {
      explore_ruins: 'artifact',
      search_houses: 'map',
      leave_village: 'end',
    },
  },
  spring: {
    text: 'You find a magical spring glowing with light. What do you do?',
    image: 'assets/images/magic_spring.jpg',
    audio: 'assets/audio/spring.mp3', // Gentle water sounds
    choices: {
      drink_water: 'gain_knowledge',
      take_water: 'forest',
      leave_spring: 'forest',
    },
  },
  cave: {
    text: 'The sound leads to a shadowy cave. What will you do?',
    image: 'assets/images/cave.webp',
    audio: 'assets/audio/cave.mp3', // Mysterious cave echoes
    choices: {
      confront_figure: 'test',
      flee_cave: 'forest',
      search_cave: 'lore',
    },
  },
  artifact: {
    text: 'You discover an ancient artifact. What will you do?',
    image: 'assets/images/artifact.webp',
    audio: 'assets/audio/artifact.mp3', // Magical sound effect
    choices: {
      accept_power: 'guardian',
      reject_power: 'end',
    },
  },
  end: {
    text: 'You decide to leave the Forgotten Lands. Perhaps another time...',
    image: 'assets/images/sunset.webp',
    audio: 'assets/audio/sunset.mp3', // Calm sunset music
    choices: {
      restart: 'start',
    },
  },
  hidden_path: {
    text: 'You find a hidden path leading to an overlook of the Forgotten Lands.',
    image: 'assets/images/forest_overlook.webp',
    audio: 'assets/audio/hidden_path.mp3', // Windy overlook sounds
    choices: {
      descend: 'forest',
      stay: 'end',
    },
  },
  map: {
    text: 'You find scraps of a map hinting at deeper secrets in the Forgotten Lands.',
    image: 'assets/images/map_fragment.webp',
    audio: 'assets/audio/map.mp3', // Rustling paper sound
    choices: {
      follow_map: 'artifact',
      ignore_map: 'village',
    },
  },
};

function updateScene(sceneKey) {
  const scene = scenes[sceneKey];
  storyText.textContent = scene.text;
  storyImage.src = scene.image;

  // Update and play audio
  if (scene.audio) {
    backgroundAudio.src = scene.audio;
    backgroundAudio.play();
  }

  // Clear old choices
  choicesContainer.innerHTML = '';
  
  // Add new choices
  for (const [choiceKey, nextScene] of Object.entries(scene.choices)) {
    const button = document.createElement('button');
    button.textContent = choiceKey.replace('_', ' ').toUpperCase();
    button.classList.add('choice-btn');
    button.addEventListener('click', () => updateScene(nextScene));
    choicesContainer.appendChild(button);
  }
}

// Initialize the game
updateScene(currentScene);
