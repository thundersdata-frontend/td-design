/**
 * @fileoverview no forbidden hooks in project
 * @author chjdamon
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'no forbidden hooks in project',
      recommended: true,
      url: 'https://github.com/thundersdata-frontend/td-design/tree/main/packages/eslint-plugin-replace-hooks#readme', // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
      },
    ], // Add a schema if the rule has options
    messages: {
      empty: '',
      forbidden: '`{{name}}` is forbidden. try to use `{{tip}}` from `{{dependency}}` alternatively',
    },
  },

  create(context) {
    // variables should be defined here
    if (!context.options || !Array.isArray(context.options) || context.options.length === 0) return {};
    const pattern = context.options[0]; // {useState: {tip: 'useSafeState', dependency: '@td-design/rn-hooks'}}
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    if (!pattern) return {};
    return {
      // 删除要替换的hooks，插入代替的hooks的import
      ImportSpecifier: node => {
        Object.entries(pattern).forEach(([key, value]) => {
          if (node.imported.name === key) {
            context.report({
              node,
              messageId: 'forbidden',
              data: {
                name: key,
                tip: value.tip,
                dependency: value.dependency,
              },
              fix: fixer => [
                fixer.remove(node),
                fixer.insertTextAfterRange(
                  [node.parent.range[0], node.parent.range[1] + 1],
                  `import { ${value.tip} } from '${value.dependency}';\n`
                ),
              ],
            });
          }
        });
      },

      // 删除空的import
      ImportDeclaration: node => {
        if (node.specifiers.length === 0) {
          context.report({
            node,
            messageId: 'empty',
            fix: fixer => fixer.remove(node),
          });
        }
      },

      // 替换文本
      'VariableDeclaration VariableDeclarator CallExpression Identifier': node => {
        Object.entries(pattern).forEach(([key, value]) => {
          if (node.name === key) {
            context.report({
              node,
              messageId: 'forbidden',
              data: {
                name: key,
                tip: value.tip,
                dependency: value.dependency,
              },
              fix: fixer => fixer.replaceText(node, value.tip),
            });
          }
        });
      },
    };
  },
};
