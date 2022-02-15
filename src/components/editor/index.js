import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';

export default function ContactForm (src) {
  console.log(src.src);
  return (
    <ImageEditor
    includeUI={{
      loadImage: {
        path: src.src,
        name: 'SampleImage',
      }, 
        theme: {
        'menu.normalIcon.color': '#8a8a8a',
        'menu.activeIcon.color': '#555555',
        'menu.disabledIcon.color': '#434343',
        'menu.hoverIcon.color': '#e9e9e9',
        'submenu.normalIcon.color': '#8a8a8a',
        'submenu.activeIcon.color': '#e9e9e9',
     },
      menu: ['shape', 'filter', 'draw'],
      initMenu: 'draw',
      uiSize: {
        width: '900px',
        height: '500px',
      },
      menuBarPosition: 'bottom',
      colorPalette: ["#ffffff", "#3c3c3c", "#234252"],
      helpMenu: ["Delete"]
    }}
    cssMaxHeight={500}
    cssMaxWidth={700}
    selectionStyle={{
      cornerSize: 20,
      rotatingPointOffset: 70,
    }}
    usageStatistics={true}
  />
  );
};
