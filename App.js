// import React, {Component} from 'react';
// import {Platform, View, Button, NativeModules} from 'react-native';
// import PSPDFKitView from 'react-native-pspdfkit';

// // const DOCUMENT = Platform.OS === 'ios' ? 'Document.pdf' : './assets/sample.pdf';
// // export default class PSPDFKitDemo extends Component {
// //   render() {
// //     return (
// //       <PSPDFKitView
// //         document={DOCUMENT}
// //         configuration={{
// //           thumbnailBarMode: 'scrollable',
// //           pageTransition: 'scrollContinuous',
// //           scrollDirection: 'vertical',
// //         }}
// //         ref="pdfView"
// //         fragmentTag="PDF1"
// //         style={{flex: 1}}
// //       />
// //     );
// //   }
// // }

// const DOCUMENT =
//   Platform.OS === 'ios'
//     ? 'document.pdf'
//     : 'http://www.pdf995.com/samples/pdf.pdf';

// const PSPDFKit = NativeModules.PSPDFKit;

// // Simple screen containing an Open PDF button.
// export default class HomeScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pdf: 'http://www.pdf995.com/samples/pdf.pdf',
//     };
//   }
//   _presentPSPDFKit() {
//     // PSPDFKit.present("http://www.pdf995.com/samples/pdf.pdf", {});
//     // return(
//     //   <PSPDFKitView
//     //   document={'http://www.pdf995.com/samples/pdf.pdf'}

//     //     // Show the back button on Android.
//     //     showNavigationButtonInToolbar={true}
//     //     // Show the back button on iOS.
//     //     showCloseButton={true}
//     //     // The configuration is optional.
//     //     configuration={{
//     //       showThumbnailBar: 'scrollable',
//     //     }}
//     //     // Set the document to `null` on Android.
//     //     onNavigationButtonClicked={(event) => {
//     //       this.setState({ document: null });
//     //     }}
//     //     // Set the document to `null` on iOS.
//     //     onCloseButtonPressed={(event) => {
//     //       this.setState({ document: null });
//     //     }}
//     //     style={{ flex: 1 }}
//     // />

//     // )

//     PSPDFKit.present('http://www.pdf995.com/samples/pdf.pdf', {
//       pageTransition: 'scrollContinuous',
//       scrollDirection: 'vertical',
//     });
//   }

//   render() {
//     return (
//       <View>
//         <Button
//           onPress={this._presentPSPDFKit}
//           title="Open PDF with PSPDFKit"
//         />
//         <PSPDFKitView
//           document={this.state.pdf}
//           // Show the back button on Android.
//           showNavigationButtonInToolbar={true}
//           // Show the back button on iOS.
//           showCloseButton={true}
//           // The configuration is optional.
//           configuration={{
//             showThumbnailBar: 'scrollable',
//           }}
//           // Set the document to `null` on Android.
//           onNavigationButtonClicked={event => {
//             this.setState({document: null});
//           }}
//           // Set the document to `null` on iOS.
//           onCloseButtonPressed={event => {
//             this.setState({document: null});
//           }}
//           style={{flex: 1}}
//         />
//       </View>
//     );
//   }
// }

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  BackHandler,
  NativeModules,
  Alert,
} from 'react-native';

import {
  DocumentView,
  RNPdftron,
  PDFViewCtrl,
  Config,
} from 'react-native-pdftron';

export default class App extends Component {
  // If you are using TypeScript, use `constructor(props: Props) {`
  // Otherwise, use:
  constructor(props) {
    super(props);

    this.state = {
      permissionGranted: Platform.OS === 'ios' ? true : false,
    };

    RNPdftron.initialize('Insert commercial license key here after purchase');
    RNPdftron.enableJavaScript(true);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.requestStoragePermission();
    }
  }

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          permissionGranted: true,
        });
        console.log('Storage permission granted');
      } else {
        this.setState({
          permissionGranted: false,
        });
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  onLeadingNavButtonPressed = () => {
    console.log('leading nav button pressed');
    if (Platform.OS === 'ios') {
      Alert.alert(
        'App',
        'onLeadingNavButtonPressed',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: true},
      );
    } else {
      BackHandler.exitApp();
    }
  };

  render() {
    // if (!this.state.permissionGranted) {
    //   return (
    //     <View style={styles.container}>
    //       <Text>
    //         Storage permission required.
    //       </Text>
    //     </View>
    //   )
    // }

    const path = 'http://www.pdf995.com/samples/pdf.pdf';
    const myToolbar = {
      [Config.CustomToolbarKey.Id]: 'myToolbar',
      [Config.CustomToolbarKey.Name]: 'myToolbar',
      [Config.CustomToolbarKey.Icon]: Config.ToolbarIcons.FillAndSign,
      [Config.CustomToolbarKey.Items]: [
        Config.Tools.annotationCreateTextHighlight,
        Config.Tools.annotationCreateSticky,

        // Config.Actions.stickyNoteShowPopUp,

        Config.Buttons.undo,
      ],
    };
    const myToolbar2 = {
      [Config.CustomToolbarKey.Id]: 'myToolbar2',
      [Config.CustomToolbarKey.Name]: 'myToolbar2',
      [Config.CustomToolbarKey.Icon]: Config.ToolbarIcons.FillAndSign,
      [Config.CustomToolbarKey.Items]: [
        Config.Tools.annotationCreateTextHighlight,
        Config.Tools.annotationCreateSticky,

        // Config.Actions.stickyNoteShowPopUp,

        Config.Buttons.undo,
      ],
    };

    return (
      <DocumentView
        document={path}
        showLeadingNavButton={false}
        showNavigationListAsSidePanelOnLargeDevices={false}
        showQuickNavigationButton={false}
        // leadingNavButtonIcon={
        //   Platform.OS === 'ios'
        //     ? 'ic_close_black_24px.png'
        //     : 'ic_arrow_back_white_24dp'
        // }
        // onLeadingNavButtonPressed={this.onLeadingNavButtonPressed}
        hideViewModeItems={[
          Config.ViewModePickerItem.Crop,
          Config.ViewModePickerItem.Rotation,
          Config.ViewModePickerItem.ColorMode,
        ]}

      
        fitMode={Config.FitMode.FitPage}
        topAppNavBarRightBar={[
          Config.Buttons.reflowButton,
          Config.Buttons.outlineListButton,
        ]}
        annotationToolbars={[Config.DefaultToolbars.Annotate, myToolbar]}
        // bottomToolbar={[
        //   // Config.Buttons.reflowButton,
        //   Config.Buttons.outlineListButton,
        //   // Config.Buttons.moreItemsButton,
        //   // Config.Buttons.addPageButton,
        //   Config.Buttons.searchButton,
        //   Config.Buttons.toolsButton,

        // ]}
        // // bottomToolbarEnabled={false}
        hideAnnotationToolbarSwitcher={false}
        // hideTopAppNavBar={true}
        annotationMenuItems={[
          Config.AnnotationMenu.search,
          Config.AnnotationMenu.share,
          Config.AnnotationMenu.delete,
          Config.AnnotationMenu.copy,
        ]}
        signSignatureFieldsWithStamps={false}
        useStylusAsPen={false}
        hideDefaultAnnotationToolbars={[
          Config.DefaultToolbars.Annotate,
          Config.DefaultToolbars.Favorite,
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
