module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@': './app', // Ajusta la ruta si tu carpeta de componentes está en otro lugar
        },
      }],
    ],
  };
};