/**
 * @fileoverview no forbidden hooks in project
 * @author chjdamon
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "no forbidden hooks in project",
      category: "Fill me in",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [{
      type: 'object'
    }], // Add a schema if the rule has options
    messages: {
      forbidden: "`{{name}}` is forbidden. try to use `{{replace}}` alternatively"
    }
  },

  create(context) {
    // variables should be defined here
    if (!context.options || !Array.isArray(context.options) || context.options.length === 0) return {};
    const pattern = context.options[0];

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    if (!pattern) return {};
    return {
      // visitor functions for different types of nodes
      'ImportDeclaration ImportSpecifier': node => {
        Object.entries(pattern).forEach(([key, value]) => {
          if (node.imported.name === key) {
            context.report({
              node,
              messageId: 'forbidden',
              data: {
                name: key,
                replace: value,
              }
            });
          }
        })
      }
    };
  },
};
