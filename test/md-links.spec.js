// const mdLinks = require('../');
const api = require('../src/api')

/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */

// TODO: Ordenar los test {describe(function,callback)}
describe('Funciones de api.js', () => {
  it('Debería validar si la ruta existe', () => {
    expect(api.pathExists('src/new_directory/cheat.txt')).toBeTruthy()
    expect(api.pathExists('src/fake_directory/cheat.txt')).not.toBeTruthy()
  });
  it('Debería convertir una ruta relativa a absoluta', () => {
    const pathAbsol = 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\cheat.txt';
    expect(api.convertPath('src/new_directory/cheat.txt')).toBe(pathAbsol)
  });
  it('Debería poder leer un archivo', () => {
    const apiReadFile = api.readFile('src/new_directory/for-test.txt')
    expect(typeof apiReadFile).toBe('string')
    expect(apiReadFile).toBe('Esta es una línea de texto')
  });
  it('Debería poder leer un directorio', () => {
    const apiReadDir = api.readDir('src/new_directory');
    const fullFiles = ['cheat.txt', 'flowchart.jpg', 'for-test.txt', 'inspectMe.md', 'toRead.md'];
    const expectedMd = ['inspectMe.md', 'toRead.md'];
      expect(typeof apiReadDir).toBe('object')
      expect(apiReadDir).toEqual(fullFiles)
      expect(apiReadDir).toEqual(expect.arrayContaining(expectedMd));
  });
  it('Debería averiguar si es archivo o carpeta', () => {
    const dirExtension = api.hasExtension('src/new_directory');
    const fileExtension = api.hasExtension('src/new_directory/inspectMe.md')
    const fileExcluded = api.hasExtension('src/new_directory/for-test.txt')
    expect(dirExtension).toBe('Es un directorio')
    expect(fileExtension).toBe('src/new_directory/inspectMe.md')
    expect(fileExcluded).toBe('Archivo excluido :P')
  });
});
