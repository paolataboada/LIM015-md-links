const md_links = require('../src/mdLinks');
const api = require('../src/api');
const mock = require('../__mocks__/fetch.js');


describe('path_exists', () => {
  it('Debería validar si la ruta existe', () => {
    expect(api.path_exists('src/new_directory/cheat.txt')).toBeTruthy()
    expect(api.path_exists('src/fake_directory/cheat.txt')).not.toBeTruthy()
  });
});

describe('convert_path', () => {
  it('Debería convertir una ruta relativa a absoluta', () => {
    const pathAbsol = 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\cheat.txt';
    expect(api.convert_path('src/new_directory/cheat.txt')).toBe(pathAbsol)
    expect(api.convert_path(pathAbsol)).toBe(pathAbsol)
  });
});

describe('read_file', () => {
  it('Debería poder leer un archivo', () => {
    const apiread_file = api.read_file('src/new_directory/for-test.txt')
    expect(typeof apiread_file).toBe('string')
    expect(apiread_file).toBe('Esta es una línea de texto')
  });
});

describe('read_dir', () => {
  it('Debería poder leer un directorio', () => {
    const apiread_dir = api.read_dir('src/new_directory');
    const fullFiles = ['cheat.txt', 'for-test.txt', 'inspectMe.md', 'sub_dir', 'toRead.md'];
    const expectedMd = ['inspectMe.md', 'toRead.md'];
      expect(typeof apiread_dir).toBe('object')
      expect(apiread_dir).toEqual(fullFiles)
      expect(apiread_dir).toEqual(expect.arrayContaining(expectedMd));
  });
});

describe('has_extension', () => {
  it('Debería averiguar si es archivo o carpeta', () => {
    const dirExtension = api.has_extension('src/new_directory');
    const fileExtension = api.has_extension('src/new_directory/inspectMe.md')
    const fileExcluded = api.has_extension('src/new_directory/for-test.txt')
    expect(dirExtension).toBeFalsy()
    expect(fileExtension).toBe('.md')
    expect(fileExcluded).toBe('.txt')
  });
});

describe('join_path', () => {
  it('Debería unir dos rutas', () => {
    const finalPath = 'src\\new_directory\\toRead.md';
    expect(api.join_path('src/new_directory', 'toRead.md')).toBe(finalPath)
  });
});

describe('get_mdfiles', () => {
  it('Debería guardar solo archivos md en un array', () => {
    const pathWithMd = api.get_mdfiles('src/new_directory');
    const pathWithoutMd = api.get_mdfiles('src/empty_dir');
    const pathWrong = api.get_mdfiles('src/new_cheat.nd');
    const arrayMd = [
                      'Solo se revisan archivos markdown',
                      'Solo se revisan archivos markdown',
                      'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\inspectMe.md',
                      'Solo se revisan archivos markdown',
                      'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\inner_dir\\deep.md',
                      'Directorio vacío',
                      'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\sub_file.md',
                      'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\without_url.md',
                      'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\toRead.md',
                    ]
    expect(pathWithMd).toEqual(arrayMd)
    expect(pathWithoutMd).toBe('Directorio vacío')
    expect(pathWrong).toBe('Ruta inexistente')
  });
});

describe('get_properties', () => {
  it('Debería guardar en un array los objetos con propiedades de los links', () => {
    const getProperties = api.get_properties('src/new_directory/sub_dir/inner_dir/deep.md');
    const noProperties = api.get_properties('src/new_directory/sub_dir/without_url.md');
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
                          href: 'Archivo sin links',
                          text: '',
                          file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\without_url.md'
                        }]
    expect(getProperties).toEqual(propLinks)
    expect(noProperties).toEqual(noPropLinks)
  });
});

describe('fetch_status', () => {
  it('Realiza petición HTTP y guarda propiedades del link (status: 200)', () => {
    const response = [{
      href: 'https://hbr.org/2020/04/empathy-starts-with-curiosity?language=es',
      text: 'La empatía',
      file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\sub_file.md',
      status: 200,
      case: 'ok'
    }]
    return expect(api.fetch_status('src/new_directory/sub_dir/sub_file.md')).resolves.toEqual(response);
  });
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
                        text: "Invalid Domain",
                        status: 400,
                        case: 'fail',
                        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\sub_dir\\inner_dir\\deep.md',
                      }]
    return expect(api.fetch_status('src/new_directory/sub_dir/inner_dir/deep.md')).resolves.toEqual(rejected);
  })
});

describe('md_links', () => {
  it('Debería resolver un array de objetos (validate: true)', () => {
    const validateMdLinks = [
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
    return expect(md_links('src/new_directory/toRead.md', {validate: true})).resolves.toEqual(validateMdLinks);
  });
  it('Debería resolver un array de objetos (validate: false)', () => {
    const noValidateMdLinks = [
      {
        href: 'https://github.com/paolataboada/LIM015-md-links',
        text: 'GitHub Paola',
        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\toRead.md',
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\toRead.md',
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:\\Users\\TACNA\\Documents\\GitHub\\LIM015-md-links\\src\\new_directory\\toRead.md',
      }
    ]
    return expect(md_links('src/new_directory/toRead.md', {validate: false})).resolves.toEqual(noValidateMdLinks);
  });
  it('Debería resolver que el directorio no tiene archivos', () => {
    return expect(md_links('src/empty_dir', {validate: true})).resolves.toBe('Directorio vacío');
  });
  it('Debería resolver que la ruta es inexistente', () => {
    return expect(md_links('src/new_directory/unpath', {validate: true})).rejects.toBe('La ruta introducida no existe');
  });
});