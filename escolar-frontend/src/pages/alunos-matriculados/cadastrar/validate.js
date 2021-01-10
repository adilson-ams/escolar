
import * as Yup from 'yup';

const validate = Yup.object().shape({

    nome: Yup.string().required("O campo Nome é obrigatório"),
    email: Yup.string().required("O campo E-mail é obrigatório")
    
});

export default validate;