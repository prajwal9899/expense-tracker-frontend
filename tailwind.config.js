module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  devServer: {
  compress: true,
  public: 'store-client-nestroia1.c9users.io' // That solved it
}
}
