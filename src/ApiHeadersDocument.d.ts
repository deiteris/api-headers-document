/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   src/ApiHeadersDocument.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {LitElement, html, css} from 'lit-element';

export {ApiHeadersDocument};

declare namespace ApiElements {

  /**
   * `api-headers-document`
   *
   * A documentation for API headers.
   *
   * It uses [AMF](https://github.com/mulesoft/amf) json/ld model to render
   * the view.
   *
   * ## Example
   *
   * ```html
   * <api-headers-document headers="[...]" opened></api-headers-document>
   * ```
   */
  class ApiHeadersDocument extends LitElement {
    legacy: boolean|null|undefined;

    /**
     * `raml-aware` scope property to use.
     */
    aware: string|null|undefined;

    /**
     * Generated AMF json/ld model form the API spec.
     * The element assumes the object of the first array item to be a
     * type of `"http://raml.org/vocabularies/document#Document`
     * on AMF vocabulary.
     *
     * It is only usefult for the element to resolve references.
     */
    amf: object|any[]|null;

    /**
     * The headers AMF model Array.
     */
    headers: any[]|null|undefined;

    /**
     * Set to true to open the view.
     * Autormatically set when the view is toggle from the UI.
     */
    opened: boolean|null|undefined;

    /**
     * A property passed to the type document element to render
     * a mogile friendly view.
     */
    narrow: boolean|null|undefined;

    /**
     * Enables compatibility with Anypoint components.
     */
    compatibility: boolean|null|undefined;

    /**
     * Type of the header in the documentation section.
     * Should be in range of 1 to 6.
     */
    headerLevel: number|null|undefined;

    /**
     * Passed to `api-type-document`. Enables internal links rendering for types.
     */
    graph: boolean|null|undefined;
    constructor();
    render(): any;

    /**
     * Handler for amf model change from `raml-aware`
     */
    _apiChangedHandler(e: CustomEvent|null): void;

    /**
     * Computes a label for the section toggle buttons.
     */
    _computeToggleActionLabel(opened: any): any;

    /**
     * Computes class for the toggle's button icon.
     */
    _computeToggleIconClass(opened: any): any;

    /**
     * Toggles the view.
     * Use `opened` property instead.
     */
    toggle(): void;
  }
}