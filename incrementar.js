let contador = 0;

exports.handler = async function(event, context) {
    contador++;
    return {
        statusCode: 200,
        body: JSON.stringify({ contador })
    };
};
