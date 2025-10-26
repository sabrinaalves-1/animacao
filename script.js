// === MOONLAST CITY — JS ATUALIZADO ===

function typeWriterEffect(element, text, speed = 40, callback) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) {
      callback();
    }
  }
  typing();
}

window.onload = function () {
  const dialogueBox = document.querySelector(".dialogue");
  const lines = Array.from(dialogueBox.querySelectorAll("p"));
  const nextScene = document.querySelector("a.next-button");
  const audio = document.querySelector("audio");

  lines.forEach(line => line.style.display = "none");
  if (nextScene) nextScene.style.display = "none";

  if (audio) {
    audio.volume = 0.5;
    audio.loop = true;
    const playAudio = () => audio.play().catch(() => console.log("Autoplay bloqueado"));
    playAudio();
    document.body.addEventListener('click', playAudio, { once: true });
  }

  let index = 0;
  function showLine() {
    if (index < lines.length) {
      const line = lines[index];
      line.style.display = "block";
      const text = line.textContent;
      line.textContent = "";
      typeWriterEffect(line, text, 35, () => {
        index++;
        setTimeout(showLine, 1200);
      });
    } else {
      if (nextScene) nextScene.style.display = "block";
      setTimeout(() => {
        document.body.classList.add("fade-out");
        setTimeout(() => {
          if (nextScene) window.location.href = nextScene.href;
        }, 1500);
      }, 5000);
    }
  }

  showLine();
};
