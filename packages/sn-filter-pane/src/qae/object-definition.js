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
     * Show visualization details toggle
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
    qChildListDef: {
      qDef: {
        qListObjectDef: {},
      },
    },
  };

  return definition;
};

export default objectDefinition;

/**
 * @name ChildListDef
 * @type object
 * @property {IGenericListProperties} qDef
 */

/**
 * Extends `IGenericListProperties`, see Engine API: `IGenericListProperties`.
 * @name IGenericListProperties
 * @extends EngineAPI.IGenericListProperties
 * @type object
 * @property {IListObjectDef} qListObjectDef
 */

/**
 * Extends `IListObjectDef`, see Engine API: `IListObjectDef`.
 * @name IListObjectDef
 * @type object
 * @description See {@link https://qlik.dev/apis/json-rpc/qix/schemas#%23%2Fdefinitions%2Fschemas%2Fentries%2FListObjectDef}
 */
