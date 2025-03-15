<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Button</title>
    <style>
        body {
            background-image: url('https://media.istockphoto.com/id/157436481/photo/sheet-of-paper-torn-from-spiral-notebook-and-crumpled.jpg?s=612x612&w=0&k=20&c=VGkLwFA35qM98-kdq4AljcQf2I5eqtsJlHmqCwmyTc4=');
            background-size: cover;
            margin: 0;
            padding: 0;
            font-family: 'Comic Sans MS', cursive, sans-serif;
            text-align: center;
            color: white;
        }

        .button {
            background-color: red;
            border: 3px solid silver;
            border-radius: 50%;
            width: 200px;
            height: 200px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }

        .button:hover {
            transform: scale(1.1) rotate(10deg);
        }

        .fact {
            position: absolute;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 25px;
            color: white;
            font-family: 'Comic Sans MS', cursive, sans-serif;
        }

        #dialogue {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 30px;
            font-weight: bold;
            color: white;
        }

    </style>
</head>
<body>
    <button class="button" id="myButton">Press Me</button>
    <div class="fact" id="fact">Press the button!</div>
    <div id="dialogue"></div>

    <script>
        let button = document.getElementById('myButton');
        let factDiv = document.getElementById('fact');
        let dialogueDiv = document.getElementById('dialogue');
        let clickCount = 0;
        let buttonClicked = false;
        let isMoving = false;

        const facts = [
            "Did you know? Honey never spoils!",
            "Did you know? A group of flamingos is called a 'flamboyance'!",
            "Did you know? You can't hum while holding your nose!",
            "Did you know? A baby octopus is the size of a pencil eraser when born!",
            "Did you know? Snails can sleep for up to three years!"
        ];

        function speak(text, voiceName, pitch = 1, rate = 1) {
            const voices = speechSynthesis.getVoices();
            const selectedVoice = voices.find(voice => voice.name === voiceName);
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = selectedVoice;
            utterance.pitch = pitch;
            utterance.rate = rate;
            speechSynthesis.speak(utterance);
        }

        button.addEventListener('click', () => {
            clickCount++;

            // Dialogue and movement after first click
            if (!buttonClicked) {
                buttonClicked = true;
                dialogueDiv.innerText = "I told you not to click it!";
                speak("I told you not to click it!", "Google UK English Male", 0.8, 1.2);

                setTimeout(() => {
                    dialogueDiv.innerText = "I said, don't click it!";
                    speak("I said, don't click it!", "Google UK English Male", 0.7, 1);
                }, 2000);

                setTimeout(() => {
                    dialogueDiv.innerText = "You're not listening...";
                    speak("You're not listening...", "Google UK English Male", 0.6, 0.9);
                }, 4000);
            }

            // Show fact after first click
            if (clickCount === 1) {
                let randomFact = facts[Math.floor(Math.random() * facts.length)];
                factDiv.innerText = randomFact;
                speak(randomFact, "Google US English", 1.1, 1);
            }

            // Make the button move
            if (!isMoving && clickCount > 0) {
                isMoving = true;
                let randomPosX = Math.floor(Math.random() * (window.innerWidth - 200));
                let randomPosY = Math.floor(Math.random() * (window.innerHeight - 200));
                button.style.left = randomPosX + 'px';
                button.style.top = randomPosY + 'px';

                setTimeout(() => {
                    isMoving = false;
                }, 2000);
            }

            // After 50 clicks, trigger confetti explosion
            if (clickCount === 50) {
                dialogueDiv.innerText = "Boom! Confetti everywhere!";
                speak("Boom! Confetti everywhere!", "Google US English", 1.2, 1.5);
                // Implement your confetti explosion logic here
            }
        });

        // Handle off-screen button
        document.addEventListener('click', () => {
            if (buttonClicked && button.style.left === '0px') {
                dialogueDiv.innerText = "Ha! You can't click me!";
                speak("Ha! You can't click me!", "Google UK English Male", 0.7, 1);
                button.style.left = `${Math.floor(Math.random() * (window.innerWidth - 200))}px`;
                button.style.top = `${Math.floor(Math.random() * (window.innerHeight - 200))}px`;
            } else {
                dialogueDiv.innerText = "Dang it!";
                speak("Dang it!", "Google US English", 1.2, 1);
            }
        });

        // Initial message on page load
        dialogueDiv.innerText = "Don't click the button!";
        speak("Don't click the button!", "Google UK English Male", 0.9, 1.2);
    </script>
</body>
</html>

