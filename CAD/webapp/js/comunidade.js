document.addEventListener("DOMContentLoaded", () => {
  const voteButtons = document.querySelectorAll(".btn-vote");

  voteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card-content") || button.closest(".card-actions");
      if (!card) return;

      const currentlyPressed = button.getAttribute("aria-pressed") === "true";
      const siblingButtons = card.querySelectorAll(".btn-vote");

      siblingButtons.forEach((sibling) => {
        sibling.setAttribute("aria-pressed", "false");
      });

      if (!currentlyPressed) {
        button.setAttribute("aria-pressed", "true");
      }
    });
  });
});
