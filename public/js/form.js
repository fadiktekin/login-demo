const form = document.querySelector("form");
form.addEventListener("submit", onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (result.success) {
    window.location.replace("/my-account");
  } else {
    window.location.replace("/error");
  }
}
