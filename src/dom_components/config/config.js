module.exports = {
  stylePrefix: 'comp-',

  wrapperId: 'wrapper',

  // Define this if you prefer to use classes instead of IDs to identify the wrapper
  // this is useful if you want to reuse the document with `fromDocument: true`
  // and want to avoid the original body / wrapper ID to be overwritten.
  wrapperClass: null,

  wrapperName: 'Body',

  // Default wrapper configuration
  wrapper: {
    removable: false,
    copyable: false,
    draggable: false,
    components: [],
    traits: [],
    stylable: [
      'background',
      'background-color',
      'background-image',
      'background-repeat',
      'background-attachment',
      'background-position',
      'background-size'
    ]
  },

  // Could be used for default components
  components: [],

  // Class for new image component
  imageCompClass: 'fa fa-picture-o',

  // Open assets manager on create of image component
  oAssetsOnCreate: true,

  // TODO to remove
  // Editor should also store the wrapper informations, but as this change might
  // break stuff I set ii as an opt-in option, for now.
  storeWrapper: 0,

  // List of void elements
  voidElements: [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ]
};
