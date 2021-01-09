
import * as Yup from 'yup';

const validate = Yup.object().shape({

    ano: Yup.string().required("O campo Ano é obrigatório"),
    nivel: Yup.string().required("O campo Nível é obrigatório"),
    serie: Yup.string().required("O campo Série é obrigatório"),
    turno: Yup.string().required("O campo Turno é obrigatório")
 
});

export default validate;