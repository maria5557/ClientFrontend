import clientUseCases from './lib/client'
import merchantUseCases from './lib/merchant'



const queries = {
  ...clientUseCases,
  ...merchantUseCases,
};

export default queries;
