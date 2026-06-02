import { Counter } from 'counterapi';

// Inicialización para la API v2 (por defecto)
const counterClient = new Counter({
  workspace: 'novamarks-team-4320', // nombre de workspace en CounterAPI
  accessToken: 'ut_pgouzU54LWkn8ZDbDxh5zayA7yPmoTgwc4fyn3sf', // token actual
  timeout: 5000,
});


const getProductKey = (productId) => `product-${productId}-likes`;

export const counterService = {

  getLikes: async (productId) => {
    try {
      const response = await counterClient.get(getProductKey(productId));
      // En la v2, verifica si la estructura devuelve directamente en .value
      return response?.value ?? 0;
    } catch (error) {
      console.warn(`[CounterService] Error al obtener likes para producto ${productId}:`, error);
      return 0; 
    }
  },

  incrementLikes: async (productId) => {
    try {
      const response = await counterClient.up(getProductKey(productId));
      return response?.value ?? 0;
    } catch (error) {
      console.error(`[CounterService] Error al incrementar likes para producto ${productId}:`, error);
      throw error; 
    }
  },


  decrementLikes: async (productId) => {
    try {
      // Nota: Asegúrate de que tu plan/configuración en v2 permita decrementos públicos si aplica
      const response = await counterClient.down(getProductKey(productId));
      return response?.value ?? 0;
    } catch (error) {
      console.error(`[CounterService] Error al decrementar likes para producto ${productId}:`, error);
      throw error;
    }
  }
};