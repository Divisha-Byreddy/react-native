import { Platform } from "react-native";

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
    },
    fontFamily : 'Sans-serif',
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        ios : 'Arial',
        android : 'Roboto',
        default : 'System'
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    submit : {
      backgroundColor : "#0366d6",
      textAlign : 'center',
      color : 'white',
      height : 50,
      fontSize : 20,
      padding : 10,
      margin : 15,
      borderRadius : 5
    }
  };
  
  export default theme;