// const mdLinks = require('../');
const api = require('../src/api')

/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */

// TODO: Ordenar los test {describe(function,callback)}
describe('pathExists', () => {
  it('Debería validar si la ruta existe', () => {
    expect(api.pathExists('src/new_directory/cheat.txt')).toBeTruthy()
    expect(api.pathExists('src/fake_directory/cheat.txt')).not.toBeTruthy()
  });
});

describe('convertPath', () => {
  it('Debería convertir una ruta relativa a absoluta', () => {
    const pathAbsol = 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\cheat.txt';
    expect(api.convertPath('src/new_directory/cheat.txt')).toBe(pathAbsol)
    expect(api.convertPath(pathAbsol)).toBe(pathAbsol)
  });
});

describe('readFile', () => {
  it('Debería poder leer un archivo', () => {
    const apiReadFile = api.readFile('src/new_directory/for-test.txt')
    expect(typeof apiReadFile).toBe('string')
    expect(apiReadFile).toBe('Esta es una línea de texto')
  });
});

describe('readDir', () => {
  it('Debería poder leer un directorio', () => {
    const apiReadDir = api.readDir('src/new_directory');
    const fullFiles = ['cheat.txt', 'for-test.txt', 'inspectMe.md', 'sub_dir', 'toRead.md'];
    const expectedMd = ['inspectMe.md', 'toRead.md'];
      expect(typeof apiReadDir).toBe('object')
      expect(apiReadDir).toEqual(fullFiles)
      expect(apiReadDir).toEqual(expect.arrayContaining(expectedMd));
  });
});

describe('hasExtension', () => {
  it('Debería averiguar si es archivo o carpeta', () => {
    const dirExtension = api.hasExtension('src/new_directory');
    const fileExtension = api.hasExtension('src/new_directory/inspectMe.md')
    const fileExcluded = api.hasExtension('src/new_directory/for-test.txt')
    expect(dirExtension).toBeFalsy()
    expect(fileExtension).toBe('.md')
    expect(fileExcluded).toBe('.txt')
  });
});

describe('joinPath', () => {
  it('Debería unir dos rutas', () => {
    const finalPath = 'src\\new_directory\\toRead.md';
    expect(api.joinPath('src/new_directory', 'toRead.md')).toBe(finalPath)
  });
});

describe('findLinks', () => {
  it('Debería encontrar links en el contenido de un archivo md', () => {
    const fileWithURL = api.readFile('src/new_directory/toRead.md');
    const fileWithoutURL = api.readFile('src/new_directory/sub_dir/without_url.md');
    const arrLinks = ['https://github.com/paolataboada/LIM015-md-links',
                      'https://es.wikipedia.org/wiki/Markdown',
                      'https://nodejs.org/']
    expect(api.findLinks(fileWithURL)).toEqual(arrLinks)
    expect(api.findLinks(fileWithoutURL)).toBe('No se encontraron links en el archivo')
  });
});

