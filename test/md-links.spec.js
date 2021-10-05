const mdLinks = require('../src/mdLinks');
const api = require('../src/api')

/* global.fetch = jest.fn(() =>
  Promise.resolve({
    href: 'https://hbr.org/2020/04/empathy-starts-with-curiosity?language=es',
    text: 'La empatía',
    file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\sub_file.md',
    status: 200,
    case: 'ok'
    // json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  })
); */

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

describe('getFilesMd', () => {
  it('Debería guardar solo archivos md en un array', () => {
    const pathWithMd = api.getFilesMd('src/new_directory');
    const pathWithoutMd = api.getFilesMd('src/empty_dir');
    const pathWrong = api.getFilesMd('src/new_cheat.nd');
    const arrayMd = [ 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\inspectMe.md',
                      'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\inner_dir\\deep.md',
                      'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\sub_file.md',
                      'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\without_url.md',
                      'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\toRead.md' ]
    expect(pathWithMd).toEqual(arrayMd)
    expect(pathWithoutMd).toEqual([])
    expect(pathWrong).toEqual('Ruta inexistente')
  });
});

describe('readFilesMd', () => {
  it('Debería guardar en un array los objetos con propiedades de los links', () => {
    const getProperties = api.readFilesMd('src/new_directory/sub_dir/inner_dir/deep.md');
    const noProperties = api.readFilesMd('src/new_directory/sub_dir/without_url.md');
    const propLinks = [{
                        href: 'https://app.creately.com/diagram/l7cKUOg4XC0/edit',
                        text: 'Proyecto mdLinks',
                        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\inner_dir\\deep.md'    
                      },
                      {
                        href: 'https://domain.invalid/',
                        text: 'Invalid Domain',
                        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\inner_dir\\deep.md'    
                      }]
    const noPropLinks = [{
                          href: 'No se encontraron links en el archivo',
                          file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\without_url.md'
                        }]
    expect(getProperties).toEqual(propLinks)
    expect(noProperties).toEqual(noPropLinks)
  });
});

describe('fetchStatus', () => {
  it('Realiza petición HTTP y guarda propiedades del link (status: 200)', () => {
    const response = [{
                        href: 'https://hbr.org/2020/04/empathy-starts-with-curiosity?language=es',
                        text: 'La empatía',
                        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\sub_file.md',
                        status: 200,
                        case: 'ok'
                      }]
    return api.fetchStatus('src/new_directory/sub_dir/sub_file.md').then((resProp) => {
      // console.log(116, resProp);
      expect(resProp).toEqual(response);
    });
  })
  it('Realiza petición HTTP y guarda propiedades del link (status: 400)', () => {
    const rejected = [{
                        href: 'https://app.creately.com/diagram/l7cKUOg4XC0/edit',
                        text: 'Proyecto mdLinks',
                        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\inner_dir\\deep.md',
                        status: 200,
                        case: 'ok'
                      }, 
                      {
                        href: 'https://domain.invalid/',
                        status: 400,
                        case: 'fail',
                        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\inner_dir\\deep.md',
                      }]
    return api.fetchStatus('src/new_directory/sub_dir/inner_dir/deep.md').then((rejProp) => {
      // console.log(135, rejProp);
      expect(rejProp).toEqual(rejected);
    });
  })
});

describe('mdLinks', () => {
  it('Debería resolver un array de objetos (validate: true)', () => {
    const resultmdLinks = [
      {
        href: 'https://github.com/paolataboada/LIM015-md-links',
        text: 'GitHub Paola',
        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\toRead.md',
        status: 200,
        case: 'ok'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\toRead.md',
        status: 200,
        case: 'ok'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\toRead.md',
        status: 200,
        case: 'ok'
      }
    ]
    mdLinks('src/new_directory/toRead.md', {validate: true})
    .then((resObj) => {
      // console.log(145, Promise.resolve(resObj));
      expect(resObj).toEqual(resultmdLinks)
    })
  });
});