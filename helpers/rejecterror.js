const rejectError = ({ response = null }) => {
    let message = 'Ooops, something went wrong'

    if (response.data.error) {
        message = response.data.error
        console.log(message);
    }

    return Promise.reject(message)
}

export default rejectError