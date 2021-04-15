import colors from "vuetify/es5/util/colors";

export default {
  server: {
    port: process.env.PORT || 8000, // default: 3000
    host: "0.0.0.0", // default: localhost,
    timing: false
  },
  googleAnalytics: {
    id: "UA-193269033-1",
    debug: {
      sendHitTask: true
    }
  },
  loading: { color: "#EC4847", height: "3px" },
  ssr: true,
  target: "server",

  head: {
    // title: "this is config title",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
      // {
      //   hid: "description",
      //   name: "description",
      //   content: process.env.npm_package_description || ""
      // }
    ],
    link: [
      {
        // defer: true,
        rel: "icon",
        type: "image/x-icon",
        href: "/images/favicon.png"
      },
      {
        defer: true,
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&display=swap"
      }
    ]
  },

  css: [],

  plugins: ["@/plugins/globalFunctions"],

  components: true,

  buildModules: [
    "@nuxtjs/vuetify",
    "@nuxtjs/google-analytics",
    [
      "nuxt-fontawesome",
      {
        imports: [
          {
            defer: true,
            set: "@fortawesome/free-brands-svg-icons",
            icons: [
              "faInstagramSquare",
              "faFacebookSquare",
              "faTwitter",
              "faWhatsapp"
            ]
          }
        ]
      }
    ]
  ],
  modules: [
    "@nuxtjs/axios",
    [
      "@nuxtjs/recaptcha",
      {
        siteKey: "6Lex0pMaAAAAAOgRw8XA75894_4D5ox53AsiSuSO",
        hideBadge: true,
        version: 2
      }
    ],
    "@nuxtjs/robots"
  ],
  robots: {
    UserAgent: "*",
    Allow: "/",
    Disallow: "/admin"
  },
  axios: {
    proxy: true,
    baseURL: "https://path-server-kt6c2.ondigitalocean.app/",

    proxyHeaders: false,
    credentials: false
  },

  vuetify: {
    defaultAssets: {
      // font: {
      //   defer: true,
      //   family: "Montserrat,sans-serif" // Here you can override default font
      // },
      // font: true,
      icons: "md"
    },
    icons: {
      iconfont: "md"
    },
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  build: {}
};
