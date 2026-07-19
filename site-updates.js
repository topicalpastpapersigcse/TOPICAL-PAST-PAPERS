(() => {
  "use strict";

  const heroActions = document.querySelector(".hero-actions");
  if (heroActions && !document.querySelector("#allSubjectsButton")) {
    const button = document.createElement("a");
    button.id = "allSubjectsButton";
    button.className = "button button-primary";
    button.href = "#subjects";
    button.textContent = "View all available subjects";
    heroActions.prepend(button);
  }
})();
