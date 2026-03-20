import { defineConfig } from 'eslint/config';
import n8nNodesBase from 'eslint-plugin-n8n-nodes-base';

export default defineConfig([
  {
    plugins: { 'n8n-nodes-base': n8nNodesBase },
    rules: {
      ...n8nNodesBase.configs.nodes.rules,
      ...n8nNodesBase.configs.credentials.rules,
    },
  },
]);
