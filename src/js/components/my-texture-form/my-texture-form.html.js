export const htmlTemplate = document.createElement('template')

htmlTemplate.innerHTML = `
  <div id="container">
    <form action="">
      <label>Seed<input type="number" name="seed" id="seed" value="0" min="0"></label>
      <label>Width<input type="number" name="width" id="width" value="400" max="1025" min="1"></label>
      <label>Height<input type="number" name="height" id="height" value="400" max="1025" min="1"></label>
    </form>
  </div>
`
