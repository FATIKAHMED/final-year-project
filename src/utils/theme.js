import { createTheme } from "@material-ui/core/styles";
import colors from "./colors";
import fonts from "./fonts";

export const lightTheme = createTheme({
  palette: {
    common: {
      black: colors.black,
      white: colors.white,
    },
    text: {
      primary: colors.black,
      muted: colors.lightGray,
      link: colors.blue,
      active: colors.lightBlue,
      link_sec: colors.gradientBlue,
      iconGray: colors.lightGray,
      placeholder: colors.gray,
      disabled: colors.disabledGray,
      header: colors.darkestGray,
      pill: colors.skyBlue,
      cardTitle: colors.lightSkyBlue,
      cardSubTitle: colors.subTitleGrey,
      stats: colors.darkBlueStats,
      statsTitle: colors.darkBlueTitle,
      language: colors.lightGray3,
    },
    background: {
      paper: colors.white,
      hover: colors.fadedWhite,
      default: "#fafafa",
      selected: colors.veryligtBlue,
      gradient: colors.primaryLinearGradient,
      home: colors.backgroundLayout,
      footer: colors.black2,
      searchBg: colors.veryLightGray,
      lightBlue: colors.bgLightBlue,
      yellow: colors.primaryYellow,
      purple: colors.darkPurple,
      softPurple: colors.softPurple,
      verydarkPurple: colors.verydarkPurple,
      lightPink: colors.lightPink,
      verylightPurple: colors.verylightPurple,
      searchOverlay: colors.lightBrown,
      veryLightGray: colors.bgVeryLightGray,
      veryLightGray2: colors.bgVeryLightGray2,
      darkOrange: colors.darkOrange,
      softOrange: colors.softOrange,
      seaGreen: colors.seaGreen,
      veryLightSkyBlue: colors.veryLightSkyBlue,
      iconBlue: colors.primaryBlue,
      darkBlue: colors.darkBlue,
      primaryGreen: colors.primaryGreen,
      darkSoftGray: colors.darkSoftGray,
      babyPink: colors.babyPink,
      softPink: colors.softPink,
      slatGray: colors.slatGray,
      sharpLightBlue: colors.bgSharpLightBlue,
      sharpGreen: colors.sharpGreen,
      hoverTopic: colors.hoverTopic,
      cartButton: colors.yellow,
      cartButtonHover: colors.yellowHover,
      watchFreeButton: colors.gradientBlue,
      watchFreeButtonHover: colors.gradientBlueHover,
      startButton: colors.normalBlue,
      startButtonHover: colors.normalBlueHover,
      enrollButton: colors.normalDarkBlue,
      enrollButtonHover: colors.normalDarkBlueHover,
    },
    boxShadow: {
      card: colors.boxShadowDashboard,
      search: colors.boxShadowSearch,
      drawerHeader: colors.drawerLearnHeaderShadow,
    },
    border: {
      basic: colors.border,
      gray1: colors.lightGray1,
      gray2: colors.lightGray2,
      gray3: colors.lightGray3,
      gray4: colors.veryLightGray,
      gray5: colors.veryLightGray2,
      gray6: colors.veryLightGray3,
      gray7: colors.veryLightGray4,
      gray8: colors.veryLightGray5,
      gray9: colors.veryLightGray6,
      gray10: colors.veryLightGray7,
      gray11: colors.veryLightGray8,
      gray12: colors.borderVeryLightGray,
      darkShadeGray: colors.darkShadeGray,
    },
    typography: {
      fontFamily: [fonts.fontFamily.poppins, "sans-serif"].join(","),
      fontWeightThin: fonts.fontWeight.thin,
      fontWeightRegular: fonts.fontWeight.regular,
      fontWeightMedium: fonts.fontWeight.medium,
      fontWeightSemiBold: fonts.fontWeight.semiBold,
      fontWeightBold: fonts.fontWeight.bold,
    },

    // "primary": {
    // "light": "rgba(89, 210, 188, 1)",
    // "main": "rgba(20, 160, 140, 1)",
    // "dark": "rgba(0, 113, 95, 1)",
    // "contrastText": "#fff"
    // },
    // "typography": {
    // "h1": {
    // fontWeight: 300
    // fontSize: "6rem"
    // }
    // }
  },
  // "fonts": {
  //     heading: {
  //         ff: fonts.fontFamily.poppins,
  //         fs: fonts.fontSize[25],
  //         fw: fonts.fontWeight[500]
  //     }
  // },
});
export default lightTheme;
