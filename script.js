let isAutoPlaying = false;
let autoPlayInterval;
let clickCount = 0;
let musicPlaying = false;
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicToggle");
const applauseAudio = new Audio('sounds/applause.wav'); // Change to .wav format

// Function to play sound and add wave effect
function playSound(audioPath, button) {
    const audio = new Audio(audioPath);

    // Add error event listener for audio playback
    audio.onerror = function() {
        console.error('Error playing sound:', audioPath);
        alert('Audio file not found or failed to load: ' + audioPath);
    };

    audio.play();

    // Play applause after 10 clicks
    playApplause();

    // Change background color when a drum is pressed
    changeBackgroundColor();

    // Create wave effect
    const wave = document.createElement('div');
    wave.classList.add('wave');
    button.appendChild(wave);

    // Remove wave after animation is complete
    wave.addEventListener('animationend', () => {
        wave.remove();
    });

    // Create particles when button is clicked
    createParticles(button);
}

// Function to create particles when a drum is clicked
function createParticles(button) {
    const numParticles = 20;  // Adjust number of particles here
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        button.appendChild(particle);

        // Position the particle randomly within the button
        const x = Math.random() * button.offsetWidth;
        const y = Math.random() * button.offsetHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Remove particle after animation
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

// Function to change background color
function changeBackgroundColor() {
    document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
}

// Function to play applause after certain number of clicks
function playApplause() {
    clickCount++;
    if (clickCount >= 10) {
        applauseAudio.play();
        clickCount = 0; // Reset after applause
    }
}

// Add click event to each drum button
document.querySelectorAll(".drum").forEach(button => {
    button.addEventListener("click", function () {
        const sound = this.getAttribute("data-sound");
        playSound(sound, this);
    });
});

// Function to randomly trigger a drum sound and add wave effect
function playRandomDrum() {
    const drumButtons = document.querySelectorAll(".drum");
    const randomButton = drumButtons[Math.floor(Math.random() * drumButtons.length)];
    const sound = randomButton.getAttribute("data-sound");
    playSound(sound, randomButton);
}

// Auto play toggle function
function toggleAutoPlay() {
    if (isAutoPlaying) {
        clearInterval(autoPlayInterval);
        isAutoPlaying = false;
        document.getElementById("autoButton").textContent = "Auto";
        document.getElementById("autoButton").classList.remove("flash");
    } else {
        autoPlayInterval = setInterval(playRandomDrum, 200); // Adjusted to 200ms for faster play
        isAutoPlaying = true;
        document.getElementById("autoButton").textContent = "Super Auto";
        document.getElementById("autoButton").classList.add("flash");
    }
}

// Add event listener for Auto button
document.getElementById("autoButton").addEventListener("click", toggleAutoPlay);

// Function to toggle background music
musicButton.addEventListener("click", () => {
    if (musicPlaying) {
        music.pause();
        musicButton.textContent = "Play Music";
    } else {
        music.play();
        musicButton.textContent = "Pause Music";
    }
    musicPlaying = !musicPlaying;
});
