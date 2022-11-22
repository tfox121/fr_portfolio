module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          use: 'yaml-loader',
        },
        {
          test: /\.md$/,
          loader: 'frontmatter-markdown-loader',
          options: { mode: ['react-component'] },
        },
      ],
    );
    return cfg;
  },
};
