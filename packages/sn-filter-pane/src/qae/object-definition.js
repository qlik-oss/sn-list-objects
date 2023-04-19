/**
 * @namespace properties
 * @entry
 */
const objectDefinition = () => {
  /**
   * @lends properties
   */
  const definition = {
    /**
     * Current version of this generic object definition
     * @type {string}
     * @default
     */
    version: process.env.PACKAGE_VERSION,
    /**
     * Show visualization details toggle. (Only for sense-client)
     * @type {boolean=}
     * @default
     * @private
     */
    showDetails: true,
    /**
     * Show title for the visualization.
     * @type {boolean=}
     * @default
     */
    showTitles: false,
    /**
     * Visualization title.
     * @type {(string|StringExpression)=}
     * @default
     */
    title: '',
    /**
     * Visualization subtitle.
     * @type {(string|StringExpression)=}
     * @default
     */
    subtitle: '',
    /**
     * Visualization footnote.
     * @type {(string|StringExpression)=}
     * @default
     */
    footnote: '',
    /**
     * Child object definition
     * @type {ChildListDef}
     * @default {}
     */
    qChildListDef: {},
  };

  return definition;
};

export default objectDefinition;

/**
 * @name ChildListDef
 * @type object
 */
