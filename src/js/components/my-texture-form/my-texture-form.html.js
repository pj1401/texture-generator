export const htmlTemplate = document.createElement('template')

htmlTemplate.innerHTML = `
  <div id="container">
    <form action="">
      <label>Seed<input type="number" name="seed" id="seed"></label>
      <button>Download Image</button>
    </form>
  </div>
`
