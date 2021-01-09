



export const getArrayErros = (erros) => {
    const errorMessages = {};

    erros.inner.forEach(error => {
        errorMessages[error.path] = error.message;
    });

    return errorMessages;
}