function change() {
    location.href='https://scribehacks.tech'
}

swal("Success!", "You are now registered for CodeScribe!", "success", {
    closeOnClickOutside: true,
    closeOnEsc: true,
  })
  .then((value) => {
      change();
  })
  ;