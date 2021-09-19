// const mdLinks = require('../');
const api = require('../src/api')

/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */

describe('Funciones de api.js', () => {
  it('Debería validar si la ruta existe', () => {
    expect(api.pathExists('src/new_directory/cheat.txt')).toBeTruthy()
    expect(api.pathExists('src/fake_directory/cheat.txt')).not.toBeTruthy()
  });
  it('Debería convertir una ruta relativa a absoluta', () => {
    api.convertPath('src/new_directory/cheat.txt').then((p) => { //console.log(p)
      expect(p).toBe('C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\cheat.txt')
    })
  });
  it('Debería poder leer un archivo', () => {
    api.readFile('src/new_directory/for-test.txt').then((content) => { // console.log(content)
      expect(typeof content).toBe('string')
      expect(content).toBe('Esta es una línea de texto')
    })
  });
  it('Debería poder leer un directorio', () => {
    const fullFiles = ['cheat.txt', 'flowchart.jpg', 'for-test.txt', 'inspectMe.md', 'toRead.md'];
    const expectedMd = ['inspectMe.md', 'toRead.md'];
    api.readDir('src/new_directory').then((arrFiles) => { // console.log(arrFiles, typeof arrFiles)
      expect(typeof arrFiles).toBe('object')
      expect(arrFiles).toEqual(fullFiles)
      expect(fullFiles).toEqual(expect.arrayContaining(expectedMd));
    })
  });
  it('Debería averiguar si es archivo o carpeta', () => {
    expect(api.hasExtension('src/new_directory')).toBe('Es un directorio')
  });
});
