import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './', // Ensures relative asset paths for GitHub Pages hosting
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/core'),
      '@components': path.resolve(__dirname, './src/components'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
      '@config': path.resolve(__dirname, './config'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        dashboard: path.resolve(__dirname, 'dashboard.html'),
        curriculum: path.resolve(__dirname, 'curriculum.html'),
        projects: path.resolve(__dirname, 'projects.html'),
        settings: path.resolve(__dirname, 'settings.html'),
        help: path.resolve(__dirname, 'help.html'),
        std11StraightLines: path.resolve(__dirname, 'std11-straight-lines.html'),
        std11Conics: path.resolve(__dirname, 'std11-conics.html'),
        std113dIntro: path.resolve(__dirname, 'std11-3d-introduction.html'),
        std11LimitsDerivatives: path.resolve(__dirname, 'std11-limits-derivatives.html'),
        std11Statistics: path.resolve(__dirname, 'std11-statistics.html'),
        std11Probability: path.resolve(__dirname, 'std11-probability.html'),
        std12AppDerivatives: path.resolve(__dirname, 'std12-application-of-derivatives.html'),
        std12Integrals: path.resolve(__dirname, 'std12-integrals.html'),
        std12AppIntegrals: path.resolve(__dirname, 'std12-application-integrals.html'),
        std12DiffEq: path.resolve(__dirname, 'std12-differential-equations.html'),
        std12VectorAlgebra: path.resolve(__dirname, 'std12-vector-algebra.html'),
        std123dGeometry: path.resolve(__dirname, 'std12-3d-geometry.html'),
        std12LinearProg: path.resolve(__dirname, 'std12-linear-programming.html'),
      },
    },
  },
});
